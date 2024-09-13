import { NextFunction, Request, Response } from "express";
import { pool } from "../../app";
import { refreshAccessTokenGenerator } from "./utils/tokenHandler";
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

export { registerUser, loginUser };
