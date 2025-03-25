import { Request, Response } from "express";
import { getAllLists, createNewLists, deleteLists } from "../models/lists";

export const getLists = async (req: Request, res: Response) => {
  try {
    const [data] = await getAllLists();
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
    await createNewLists(body);
    res.status(200).json({
      message: "POST lists success!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "POST lists failed!",
      serveMessage: error,
    });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const { IDList } = req.params;

  try {
    await deleteLists(IDList);
    res.status(200).json({
      message: "DELETE list success!",
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE lists failed!",
      serveMessage: error,
    });
  }
};
