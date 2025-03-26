import { dbPool } from "../config/database";
import { RowDataPacket } from "mysql2";

type CreateListSchema = {
  name_list: string;
  id_user: number;
  is_in_progress: string;
};

// GET METHOD
export const getAllLists = () => {
  const SQLQuery = "SELECT * FROM lists";

  return dbPool.execute(SQLQuery);
};

export const getTotalTask = (idUser: string) => {
  const SQLQuery = `SELECT * FROM lists WHERE id_user=${idUser}`;

  return dbPool.execute(SQLQuery);
};

export const getInProgressTask = async (
  idUser: string,
  isInProgress: string
) => {
  const SQLQuery = `SELECT * FROM lists WHERE is_in_progress = ${isInProgress} AND id_user = ${idUser}`;

  return dbPool.execute(SQLQuery);
};

// POST METHOD
export const createNewLists = (body: CreateListSchema) => {
  const SQLQuery = `INSERT INTO lists (name_list, id_user) 
                    VALUES ('${body.name_list}', ${body.id_user})`;

  return dbPool.execute(SQLQuery);
};

// DELETE METHOD
export const deleteLists = (idList: string) => {
  const SQLQuery = `DELETE FROM lists WHERE id_list=${idList}`;

  return dbPool.execute(SQLQuery);
};
