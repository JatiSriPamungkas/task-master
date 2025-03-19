import { Request, Response } from "express";

export const getAllUser = (req: Request, res: Response) => {
  res.json({
    name: "Jati",
    age: 18,
    job: "Junior Programmer",
    message: "GET: U are so cool man, proud of u ❤️",
  });
};

export const createUser = (req: Request, res: Response) => {
  res.json({
    name: "Pamungkas",
    age: 25,
    job: "Senior Programmer",
    message: "POST: Have nothing to lose ✨",
  });
};
