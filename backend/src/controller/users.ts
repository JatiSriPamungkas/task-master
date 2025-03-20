import { Request, Response } from "express";
import { getAllUser as getAllUsers } from "../models/users";
import { createNewUser as createNewUsers } from "../models/users";
import { deleteUser as deleteUsers } from "../models/users";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const [data] = await getAllUsers();
    res.status(200).json({
      mesage: "GET: user succeeded!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET: user failed!",
      serveMessage: error,
    });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  const { body } = req;
  console.log(body);

  try {
    await createNewUsers(body);

    res.status(200).json({
      message: "POST: user succeeded!",
      data: req.body,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET: user failed!",
      serveMessage: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { idUser } = req.params;

  try {
    await deleteUsers(idUser);

    res.status(200).json({
      message: "DELETE: user succeeded!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE: user failed!",
      serveMessage: error,
    });
  }
};
