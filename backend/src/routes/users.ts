import { Router } from "express";
import { getAllUser, createUser } from "../controller/users";

export const router = Router();

router.get("/", getAllUser);

router.post("/", createUser);
