import express, { Router } from "express";
import { RegisterUSer, loginUser } from "../controllers/Users.js";
const router = express.Router();

router.post("/register", RegisterUSer);
router.post("/login", loginUser);

export default router;
