import { dbPool } from "../config/database";
import { RowDataPacket } from "mysql2";

type CreateUserSchema = {
  id_user?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
};

// GET METHOD
export const getAllUser = () => {
  const SQLQuery = "SELECT * FROM users";

  return dbPool.execute(SQLQuery);
};

export const getIdUsers = (idUser: string) => {
  const SQLQuery = `SELECT * FROM users WHERE id_user=${idUser}`;

  return dbPool.execute(SQLQuery);
};

// POST METHOD
export const createNewUser = (body: CreateUserSchema) => {
  const SQLQuery = `INSERT INTO users (first_name, last_name, email, password) 
                    VALUES ('${body.first_name}', '${body.last_name}', '${body.email}', '${body.password}')`;

  return dbPool.execute(SQLQuery);
};

export const findUserByEmail = async (email: string) => {
  const SQLQuery = `SELECT * FROM users WHERE email = ?`;

  const [rows] = await dbPool.execute<(CreateUserSchema & RowDataPacket)[]>(
    SQLQuery,
    [email]
  );

  return rows[0];
};

// DELETE METHOD
export const deleteUser = (idUser: string) => {
  const SQLQuery = `DELETE FROM users WHERE id_user=${idUser}`;

  return dbPool.execute(SQLQuery);
};
