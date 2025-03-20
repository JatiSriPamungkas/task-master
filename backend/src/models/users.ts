import { dbPool } from "../config/database";

type CreateUserSchema = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export const getAllUser = () => {
  const SQLQuery = "SELECT * FROM users";

  return dbPool.execute(SQLQuery);
};

export const createNewUser = (body: CreateUserSchema) => {
  const SQLQuery = `INSERT INTO users (first_name, last_name, email, password) 
                    VALUES ('${body.first_name}', '${body.last_name}', '${body.email}', '${body.password}')`;

  return dbPool.execute(SQLQuery);
};

export const deleteUser = (idUser: string) => {
  const SQLQuery = `DELETE FROM users WHERE id_user=${idUser}`;

  return dbPool.execute(SQLQuery);
};
