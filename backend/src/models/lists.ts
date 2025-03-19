import { dbPool } from "../config/database";

export const getAllList = () => {
  const SQLQuery = "SELECT * FROM lists";

  return dbPool.execute(SQLQuery);
};
