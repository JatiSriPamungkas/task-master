import { Router } from "express";
import {
  getAllUser,
  createNewUser,
  deleteUser,
  checkLoginUser,
} from "../controller/users";

export const router = Router();

router.get("/", getAllUser);

router.post("/", createNewUser);

router.post("/login", checkLoginUser);

router.delete("/:idUser", deleteUser);
