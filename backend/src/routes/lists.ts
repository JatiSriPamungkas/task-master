import { Router } from "express";
import {
  createList,
  deleteList,
  getLists,
  getTotalTaskUser,
} from "../controller/lists";

export const router = Router();

router.get("/", getLists);

router.get("/:idUser", getTotalTaskUser);

router.post("/", createList);

router.delete("/:idList", deleteList);
