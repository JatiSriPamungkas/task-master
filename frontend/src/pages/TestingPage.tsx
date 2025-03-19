import { useState } from "react";

type TaskSchema = {
  id_list: number;
  name_list: string;
  id_user: number;
};

const TestingPage = () => {
  const [tasks, setTasks] = useState<TaskSchema[]>([]);

  const handleFetchList = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/lists", {
        method: "GET",
      });
      const data = await response.json();
      const dataJSON = data.data as TaskSchema[];

      setTasks(dataJSON);
      console.log(dataJSON);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <>
      <h1>Testing Page!</h1>
      <button
        onClick={handleFetchList}
        className="border-2 border-solid border-black hover:bg-gray-300 py-2 px-6 rounded-2xl"
      >
        Fetch Lists
      </button>
      <ul>
        {tasks.map((task) => {
          return (
            <li key={task.id_list} className="text-red-500">
              {task.name_list}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TestingPage;
