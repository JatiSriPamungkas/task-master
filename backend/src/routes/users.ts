import { Router } from "express";
import { getAllUser, createNewUser, deleteUser } from "../controller/users";

export const router = Router();

router.get("/", getAllUser);

router.post("/", createNewUser);

router.delete("/:idUser", deleteUser);
