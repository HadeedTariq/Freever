import { Router } from "express";
import { isUserAlreadyExist } from "./auth.middleware";
import { registerUser } from "./auth.controller";

const router = Router();

router.post("/register", isUserAlreadyExist, registerUser);

export { router as authRouter };
