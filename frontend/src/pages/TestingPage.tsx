import { useState } from "react";

type ListSchema = {
  id_list: number;
  name_list: string;
  id_user: number;
};

type UserSchema = {
  id_user: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const TestingPage = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);
  const [lists, setList] = useState<ListSchema[]>([]);

  // DELETE METHOD
  const deleteUser = async (idUser: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/users/${idUser}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleFetchUser = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "GET",
      });
      const data = await response.json();
      const dataJSON = data.data as UserSchema[];

      setUsers(dataJSON);
      console.log(dataJSON);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleFetchLists = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/lists", {
        method: "GET",
      });
      const data = await response.json();
      const dataJSON = data.data;

      setList(dataJSON);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const handleDeleteUser = async (idUser: string) => {
    await deleteUser(idUser);
    await handleFetchUser();
  };

  return (
    <>
      <div className="font-poppins m-2">
        <div className="flex justify-center text-4xl py-4 font-black text-primary">
          <h1>Testing Page!</h1>
        </div>
        <br />
        <div className="my-4">
          <h1 className="text-2xl font-bold my-2">Table Users</h1>

          <table>
            <thead className="">
              <tr className="border-2">
                <th className="border-2 px-20">Name User</th>
                <th className="px-7">Act</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr
                    key={user.id_user}
                    className="border-2 border-solid border-black"
                  >
                    <td className="px-2">
                      {user.first_name + " " + user.last_name}
                    </td>

                    <td className="text-red-500 border-2 border-solid border-black text-center ">
                      <button
                        onClick={() => handleDeleteUser(user.id_user)}
                        className="hover:bg-gray-300 p-2 w-full"
                        disabled
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={handleFetchUser}
            className="border-2 border-solid border-black hover:bg-gray-300 my-4 py-2 px-6 rounded-lg"
          >
            Fetch users
          </button>
        </div>

        <div>
          <h1 className="text-2xl font-bold my-2">Table Lists</h1>

          <table>
            <thead>
              <tr className="border-2">
                <th className="border-2 px-20">Name List</th>
                <th className="border-2 px-4">ID User</th>
                <th className="border-2 px-7">Act</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((list) => {
                return (
                  <tr key={list.id_list} className="border-2">
                    <td className="border-2 px-2">{list.name_list}</td>
                    <td className="border-2 text-center">{list.id_user}</td>
                    <td className="border-2 border-black text-red-500">
                      <button className="hover:bg-gray-300 p-2 w-full">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={handleFetchLists}
            className="border-2 border-solid border-black hover:bg-gray-300 my-4 py-2 px-6 rounded-lg"
          >
            Fetch lists
          </button>
        </div>
      </div>
    </>
  );
};

export default TestingPage;
