import { Router } from "express";
import { isUserAlreadyExist, loginChecker } from "./auth.middleware";
import {
  forgetPassword,
  loginUser,
  passwordReset,
  registerUser,
} from "./auth.controller";

const router = Router();

router.post("/register", isUserAlreadyExist, registerUser);
router.post("/login", loginChecker, loginUser);
router.put("/forgetPassword", forgetPassword);
router.put("/resetPassword", passwordReset);

export { router as authRouter };
