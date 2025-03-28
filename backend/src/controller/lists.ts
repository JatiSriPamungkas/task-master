import { Request, Response } from "express";
import {
  getAllLists,
  createNewLists,
  deleteLists,
  getTotalTask,
  getInProgressTask,
  updatePriorities,
} from "../models/lists";

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

export const getTotalTaskUser = async (req: Request, res: Response) => {
  const { idUser } = req.params;

  try {
    const [data] = await getTotalTask(idUser);

    res.status(200).json({
      message: "GET total task user success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET total task user failed!",
      serveMessage: error,
    });
  }
};

export const getInProgressTaskUser = async (req: Request, res: Response) => {
  const { idUser } = req.params;
  const isInProgress = req.query.is_in_progress as string;

  try {
    const [data] = await getInProgressTask(idUser, isInProgress);

    res.status(200).json({
      message: "GET in progress task user success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET in progress task user failed!",
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
  const { idList } = req.params;

  try {
    await deleteLists(idList);
    res.status(200).json({
      message: "DELETE list success!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE lists failed!",
      serveMessage: error,
    });
  }
};

export const updatePriorityUser = async (req: Request, res: Response) => {
  const { idList } = req.params;
  const { priority } = req.body;

  try {
    await updatePriorities(idList, priority);

    res.status(200).json({
      message: "PATCH priority user success!",
      data: {
        id_list: idList,
        priority: priority,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "PATCH priority user failed!",
      serveMessage: error,
    });
  }
};
