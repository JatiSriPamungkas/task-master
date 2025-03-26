import { Request, Response } from "express";
import {
  findUserByEmail,
  getIdUsers,
  getAllUser as getAllUsers,
} from "../models/users";
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

export const getActiveUser = async (req: Request, res: Response) => {
  const { idUser } = req.params;

  try {
    const [data] = await getIdUsers(idUser);

    res.status(200).json({
      message: "GET: active user success!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "GET: active user failed!",
      serveMessage: error,
    });
  }
};

export const checkLoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      res.status(404).json({
        message: "User can not be found!",
      });
      return;
    }

    if (!user.password) {
      res.status(400).json({
        message: "Password not found!",
      });
      return;
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(401).json({
        message: "Invalid Credentials!",
      });
      return;
    }

    res.status(200).json({
      message: "User found!",
      data: {
        id_user: user.id_user,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "POST: matching user failed!",
      serveMessage: error,
    });
    return;
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
    return;
  } catch (error) {
    res.status(500).json({
      message: "GET: create user failed!",
      serveMessage: error,
    });
    return;
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
