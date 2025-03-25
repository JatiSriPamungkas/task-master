import { Request, Response } from "express";
import { getAllList, createNewList } from "../models/lists";

export const getLists = async (req: Request, res: Response) => {
  try {
    const [data] = await getAllList();
    res.status(200).json({
      message: "GET: get lists success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET: get lists failed!",
      serveMessage: error,
    });
  }
};

export const createList = async (req: Request, res: Response) => {
  const body = req.body;

  try {
    await createNewList(body);
    res.status(200).json({
      message: "POST lists success!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET lists failed!",
      serveMessage: error,
    });
  }
};
