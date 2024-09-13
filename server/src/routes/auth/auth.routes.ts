import { Router } from "express";
import { isUserAlreadyExist, loginChecker } from "./auth.middleware";
import { loginUser, registerUser } from "./auth.controller";

const router = Router();

router.post("/register", isUserAlreadyExist, registerUser);
router.post("/login", loginChecker, loginUser);

export { router as authRouter };
