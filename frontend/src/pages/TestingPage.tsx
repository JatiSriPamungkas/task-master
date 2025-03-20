import { useState } from "react";

// type TaskSchema = {
//   id_list: number;
//   name_list: string;
//   id_user: number;
// };
type UserSchema = {
  id_user: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

const TestingPage = () => {
  const [users, setUsers] = useState<UserSchema[]>([]);

  // DELETE METHOD
  const deleteUser = async (idUser: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${idUser}`,
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
      const response = await fetch("http://localhost:3000/api/users", {
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

  const handleDeleteUser = async (idUser: string) => {
    await deleteUser(idUser);
    await handleFetchUser();
  };

  return (
    <>
      <h1>Testing Page!</h1>
      <button
        onClick={handleFetchUser}
        className="border-2 border-solid border-black hover:bg-gray-300 py-2 px-6 rounded-2xl"
      >
        Fetch Lists
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Act</th>
          </tr>
        </thead>
        <tbody className="border-2 border-solid border-black">
          {users.map((user) => {
            return (
              <tr className="border-2 border-solid border-black">
                <td key={user.id_user} className="text-red-500">
                  {user.first_name + " " + user.last_name}
                </td>

                <td
                  key={user.id_user}
                  className="text-red-500 border-2 border-solid border-black"
                >
                  <button
                    onClick={() => handleDeleteUser(user.id_user)}
                    className="hover:bg-gray-300 p-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default TestingPage;
