import { dbPool } from "../config/database";

type CreateListSchema = {
  name_list: string;
  id_user: number;
};

export const getAllLists = () => {
  const SQLQuery = "SELECT * FROM lists";

  return dbPool.execute(SQLQuery);
};

export const createNewLists = (body: CreateListSchema) => {
  const SQLQuery = `INSERT INTO lists (name_list, id_user) 
                    VALUES ('${body.name_list}', ${body.id_user})`;

  return dbPool.execute(SQLQuery);
};

export const deleteLists = (IDList: string) => {
  const SQLQuery = `DELETE FROM lists WHERE id_list=${IDList}`;

  return dbPool.execute(SQLQuery);
};
