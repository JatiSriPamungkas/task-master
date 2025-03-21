import { Request, Response } from "express";
import { getAllUser as getAllUsers } from "../models/users";
import { createNewUser as createNewUsers } from "../models/users";
import { deleteUser as deleteUsers } from "../models/users";
import bcrypt from "bcrypt";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const [data] = await getAllUsers();
    res.status(200).json({
      mesage: "GET: read user succeeded!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET: read user failed!",
      serveMessage: error,
    });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { first_name, last_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await createNewUsers({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "POST: create user succeeded!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET: create user failed!",
      serveMessage: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { idUser } = req.params;

  try {
    await deleteUsers(idUser);

    res.status(200).json({
      message: "DELETE: delete user succeeded!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "DELETE: delete user failed!",
      serveMessage: error,
    });
  }
};
