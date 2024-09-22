import { Router } from "express";
import {
  authChecker,
  isUserAlreadyExist,
  loginChecker,
} from "./auth.middleware";
import {
  forgetPassword,
  loginUser,
  passwordReset,
  registerUser,
  sellerCreation,
} from "./auth.controller";

const router = Router();

router.post("/register", isUserAlreadyExist, registerUser);
router.post("/login", loginChecker, loginUser);
router.put("/forgetPassword", forgetPassword);
router.put("/resetPassword", passwordReset);
router.post("/seller/create", authChecker, sellerCreation);

export { router as authRouter };
