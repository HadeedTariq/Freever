import { NextFunction, Request, Response } from "express";
import { pool } from "../../app";
import { generate as otpGenerator } from "otp-generator";
import { refreshAccessTokenGenerator } from "./utils/tokenHandler";
import { mailSender } from "./utils/mailSender";
import bcrypt from "bcrypt";
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, hashPassword, passion, country } = req.body;

  await pool.query(
    `insert into siteuser (username,email,password,passion,country) values ($1,$2,$3,$4,$5)`,
    [username, email, hashPassword, passion, country]
  );

  res.status(200).json({ message: "User created successfully" });
};

const loginUser = async (req: Request, res: Response) => {
  const { user } = req.body;
  const { accessToken, refreshToken } = refreshAccessTokenGenerator(user);
  res
    .cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    })
    .cookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    })
    .json({ message: "User logged in successfully" });
};

const forgetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  if (!email) {
    return next({ status: 404, message: "Email required" });
  }

  const { rows: user } = await pool.query(
    "select email from siteuser where email=$1",
    [email]
  );
  if (!user[0]) {
    return next({ status: 404, message: "User not found" });
  }

  const key = otpGenerator(6, {
    digits: true,
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });

  await mailSender(
    email,
    "Freever Forget Password",
    `<p>Your password key is ${key}</p>`
  );

  await pool.query(
    `update siteuser set forget_password_key=$1 where email=$2`,
    [key, email]
  );

  res
    .status(200)
    .json({ message: "You recieved an email for password resetting" });
};

const passwordReset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { key, newPassword } = req.body;
  if (!key || !newPassword) {
    return next({ status: 404, message: "Please fill all the fields" });
  }
  const { rows: user } = await pool.query(
    `select email from siteuser where forget_password_key=$1`,
    [key]
  );
  if (!user[0]) {
    return next({ status: 404, message: "Incorrect key" });
  }
  const password = await bcrypt.hash(newPassword, 12);

  await pool.query(
    `update siteuser set password=$1,forget_password_key='' where email=$2`,
    [password, user[0].email]
  );

  res.status(200).json({ message: "Password Reset Successfully" });
};

export { registerUser, loginUser, forgetPassword, passwordReset };
