import { NextFunction, Request, Response } from "express";
import { pool } from "../../app";
const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, hashPassword, passion, country } = req.body;

  await pool.query(
    `insert into siteuser (username,email,hashPassword,passion,country) values ($1,$2,$3,$4,$5)`,
    [username, email, hashPassword, passion, country]
  );

  res.status(200).json({ message: "User created successfully" });
};

export { registerUser };
