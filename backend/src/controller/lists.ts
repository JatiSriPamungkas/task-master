import { Request, Response } from "express";
import { getAllList } from "../models/lists";

export const getLists = async (req: Request, res: Response) => {
  try {
    const [data] = await getAllList();
    res.status(200).json({
      message: "GET lists Succeeded!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET lists Failed!",
      serveMessage: error,
    });
  }
};
