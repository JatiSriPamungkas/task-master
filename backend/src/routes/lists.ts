import { Router } from "express";
import { createList, deleteList, getLists } from "../controller/lists";

export const router = Router();

router.get("/", getLists);

router.post("/", createList);

router.delete("/:IDList", deleteList);
