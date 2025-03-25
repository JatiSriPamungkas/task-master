import { Router } from "express";
import { createList, getLists } from "../controller/lists";

export const router = Router();

router.get("/", getLists);

router.post("/", createList)
