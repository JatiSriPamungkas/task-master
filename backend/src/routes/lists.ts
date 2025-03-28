import { Router } from "express";
import {
  createList,
  deleteList,
  getInProgressTaskUser,
  getLists,
  getTotalTaskUser,
  updatePriorityUser,
} from "../controller/lists";

export const router = Router();

router.get("/", getLists);

router.get("/totalTask/:idUser", getTotalTaskUser);

router.get("/inProgresstask/:idUser", getInProgressTaskUser);

router.post("/", createList);

router.delete("/:idList", deleteList);

router.patch("/update-priority/:idList", updatePriorityUser);
