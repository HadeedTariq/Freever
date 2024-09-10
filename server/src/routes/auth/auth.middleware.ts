import { NextFunction, Request, Response } from "express";
import { pool } from "../../app";
import { z } from "zod";
import bcrypt from "bcrypt";

const userSchema = z.object({
  username: z.string().max(20, "Username must be at most 20 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(255, "Email must be at most 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  passion: z.array(z.string()).max(4),
  country: z.string().max(40, "Country must be at most 40 characters"),
});

export const isUserAlreadyExist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    next({ message: "Please fill all the fields correctly", status: 404 });
  }
  const { rows } = await pool.query(
    `select email from siteUser where email=$1`,
    [email]
  );

  if (rows[0]) {
    next({ status: 404, message: "You already Registerd To that site" });
  }
  const hashPassword = await bcrypt.hash(password, 12);
  req.body.hashPassword = hashPassword;
  next();
};
