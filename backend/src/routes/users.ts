import { Router } from "express";
import {
  getAllUser,
  createNewUser,
  deleteUser,
  checkLoginUser,
  getActiveUser,
} from "../controller/users";

export const router = Router();

router.get("/", getAllUser);

router.get("/:idUser", getActiveUser);

router.post("/", createNewUser);

router.post("/login", checkLoginUser);

router.delete("/:idUser", deleteUser);
