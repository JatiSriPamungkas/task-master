import { Router } from "express";
import { getLists } from "../controller/lists";

export const router = Router();

router.get("/", getLists);
