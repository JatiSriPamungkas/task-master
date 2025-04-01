import taskMaster from "../assets/Logo Task Master.png";
import profile from "../assets/Ishida_Mitsunari_Square.png";
import {
  House,
  CalendarDays,
  ListTodo,
  ChartNoAxesColumn,
  Settings,
  Loader,
  Check,
  Plus,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type AddTaskSchema = {
  name_list?: string;
};

type ListSchema = {
  id_list: string;
  name_list: string;
  id_user: string;
  is_in_progress: boolean;
  priority: string;
};

// Home page section
const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [totalTask, setTotalTask] = useState<string>("");
  const [totalInProgress, setTotalInProgress] = useState<string>("");
  const [totalCompleted, setTotalCompleted] = useState<number>(0);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<Record<string, boolean>>({});
  const [selectedPriority, setSelectedPriority] = useState<
    Record<string, string>
  >({});
  const [lists, setLists] = useState<ListSchema[]>([]);
  const [idListPriority, setIdListPriority] = useState<string>("");
  const [idListCheck, setIdListCheck] = useState<string>("");

  const { register, handleSubmit, reset } = useForm();

  // GET METHOD
  const getAllList = async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      const response = await fetch(
        `http://localhost:3001/api/lists/totalTask/${idUser}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = data.data;

      setLists(dataJSON);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const getActiveUser = async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      const response = await fetch(`http://localhost:3001/api/users/${idUser}`);

      const data = await response.json();

      const { first_name, last_name } = data.data[0];

      const nameUser = `${first_name} ${last_name}`;

      setName(nameUser);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const getTotalTaskUser = async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      const response = await fetch(
        `http://localhost:3001/api/lists/totalTask/${idUser}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = data.data;

      const count = Object.keys(dataJSON).length;

      setTotalTask(count.toString());
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const getInProgressTaskUser = async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      const response = await fetch(
        `http://localhost:3001/api/lists/in-progress/${idUser}?is_in_progress=true`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = data.data;

      const count = Object.keys(dataJSON).length;

      setTotalInProgress(count.toString());
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const getCompleteTaskUser = async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      const response = await fetch(
        `http://localhost:3001/api/lists/in-progress/${idUser}?is_in_progress=false`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = data.data;

      const count = Object.keys(dataJSON).length;

      setTotalCompleted(count);
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  // POST METHOD
  const createNewList = async (id_user: string, values: AddTaskSchema) => {
    const { name_list } = values;

    try {
      await fetch("http://localhost:3001/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user, name_list }),
      });

      setTrigger((state) => !state);

      alert("Task has been added!");
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  // PATCH METHOD
  const updatePriorityUser = useCallback(
    async (idList: string, newPriority: string) => {
      try {
        await fetch(
          `http://localhost:3001/api/lists/update-priority/${idList}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ priority: newPriority }),
          }
        );
      } catch (error) {
        alert(`Error: ${error}`);
      }
    },
    []
  );

  // ISLOADING HANDLER
  const [updateIsInProgressUserIsLoading, setUpdateIsInProgressUserIsLoading] =
    useState<boolean>(false);
  // -------------------
  const updateIsInProgressUser = useCallback(
    async (idList: string, newIsInProgress: boolean) => {
      setUpdateIsInProgressUserIsLoading(true);
      const reverseNewIsInProgress = !newIsInProgress;

      try {
        await fetch(
          `http://localhost:3001/api/lists/update-is-in-progress/${idList}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isInProgress: reverseNewIsInProgress }),
          }
        );
      } catch (error) {
        alert(`Error: ${error}`);
      } finally {
        setUpdateIsInProgressUserIsLoading(false);
      }
    },
    []
  );

  const onSubmit = handleSubmit((values) => {
    const idUser = localStorage.getItem("id_user");

    createNewList(idUser!, values);

    reset();
  });

  const getPriorityColor = (idList: string, prevPriority: string) => {
    switch (selectedPriority[idList] || prevPriority) {
      case "High":
        return "border-red-800 bg-red-300 text-red-800";
      case "Medium":
        return "border-orange-800 bg-orange-300 text-orange-800";
      case "Low":
        return "border-blue-800 bg-blue-300 text-blue-800";
    }
  };

  const getParentColor = (idList: string, prevPriority: string) => {
    switch (selectedPriority[idList] || prevPriority) {
      case "High":
        return "bg-red-100";
      case "Medium":
        return "bg-orange-100";
      case "Low":
        return "bg-blue-100";
    }
  };

  const handleGetAllList = useCallback(async () => {
    await getAllList();
  }, []);

  const handleGetActiveUser = useCallback(async () => {
    await getActiveUser();
  }, []);

  const handleGetTotalUser = useCallback(async () => {
    await getTotalTaskUser();
  }, []);

  const handleGetInProgressTaskUser = useCallback(async () => {
    await getInProgressTaskUser();
  }, []);

  const handleGetCompleteTaskUser = useCallback(async () => {
    await getCompleteTaskUser();
  }, []);

  // const handleListPriority = useCallback(async () => {}, [
  //   idListPriority,
  //   selectedPriority,
  //   updatePriorityUser,
  // ]);

  // const handleUpdateIsInProgress = useCallback(async () => {
  //   await updateIsInProgressUser(idListCheck, isCheck[idListCheck]);
  // }, [idListCheck, isCheck, updateIsInProgressUser]);

  const handlePriority = (idList: string, newPriority: string) => {
    setSelectedPriority((prev) => ({
      ...prev,
      [idList]: newPriority,
    }));

    setIdListPriority(idList);
  };

  const handlCheckBox = (idList: string, newIsInProgress: boolean) => {
    setIsCheck((prev) => ({
      ...prev,
      [idList]: newIsInProgress,
    }));

    setIdListCheck(idList);
  };

  // GET EFFECT METHOD
  useEffect(() => {
    handleGetAllList();
    handleGetActiveUser();
    handleGetInProgressTaskUser();
    handleGetCompleteTaskUser();
    handleGetTotalUser();
  }, [
    trigger,
    handleGetActiveUser,
    handleGetTotalUser,
    handleGetInProgressTaskUser,
    handleGetCompleteTaskUser,
    handleGetAllList,
  ]);

  // PATCH EFFECT METHOD
  useEffect(() => {
    updatePriorityUser(idListPriority, selectedPriority[idListPriority]);
  }, [idListPriority, selectedPriority, updatePriorityUser]);

  useEffect(() => {
    updateIsInProgressUser(idListCheck, isCheck[idListCheck]);

    handleGetInProgressTaskUser();
    handleGetCompleteTaskUser();
    handleGetTotalUser();
  }, [
    isCheck,
    idListCheck,
    updateIsInProgressUser,
    handleGetInProgressTaskUser,
    handleGetCompleteTaskUser,
    handleGetTotalUser,
  ]);

  return (
    <>
      {/* HEADER SECTION */}
      <div className=" bg-stone-100 font-lexend text-primary min-h-screen">
        <div className="flex justify-between py-4 px-8 items-center bg-white border-b-2 border-slate-200">
          <div className="flex justify-around items-center gap-4">
            <a href="">
              <img src={taskMaster} alt="Task Master Logo" width={50} />
            </a>
            <a href="" className="text-3xl text-primary">
              Task Master
            </a>
          </div>
          <div className="profile-container">
            <img
              src={profile}
              alt="Profile Photo"
              width={60}
              className="rounded-full border-3 border-solid border-secondary"
            />
          </div>
        </div>

        <div className="flex min-h-screen">
          {/* ASIDE SECTION */}
          <div className="w-90 bg-white px-8 py-2 border-r-2 border-slate-200 grow-1">
            <ul className="flex flex-col gap-2 text-xl text-slate-600">
              <li className="custom-box">
                <House width={50} />
                <button className="cursor-pointer">Dashboard</button>
              </li>
              <li className="custom-box">
                <CalendarDays width={50} />
                <button className="cursor-pointer">Calendar</button>
              </li>
              <li className="custom-box">
                <ListTodo width={50} />
                <button className="cursor-pointer">Task</button>
              </li>
              <li className="custom-box">
                <ChartNoAxesColumn width={50} />
                <button className="cursor-pointer">Analytics</button>
              </li>
              <li className="custom-box">
                <Settings width={50} />
                <button className="cursor-pointer">Settings</button>
              </li>
            </ul>
          </div>

          {/* DASHBOARD SECTION  */}
          <div className="m-12 grow-50">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl text-primary">
                Welcome back, Master {name}
              </h1>
              <p className="text-xl text-secondary">
                Here's your overview task for today!
              </p>
            </div>
            <div className="flex w-full justify-around gap-6 pt-10 h-65">
              <div className="flex flex-col border-2 border-slate-300 border-solid grow-1 justify-center min-h-32 gap-5 bg-white p-6 rounded-2xl">
                <div className="flex justify-between">
                  <h3>Total Task</h3>
                  <ListTodo width={25} />
                </div>
                <h1 className="text-6xl">{totalTask}</h1>
              </div>
              <div className="flex flex-col border-2 border-slate-300 border-solid grow-1 justify-center min-h-32 gap-5 bg-white  p-6 rounded-2xl">
                <div className="flex justify-between">
                  <h3>In Progress</h3>
                  <Loader width={25} />
                </div>
                <h1 className="text-6xl">{totalInProgress}</h1>
              </div>
              <div className="flex flex-col border-2 border-slate-300 border-solid grow-1 justify-center min-h-32 gap-5 bg-white p-6 rounded-2xl">
                <div className="flex justify-between">
                  <h3>Completed</h3>
                  <Check width={25} />
                </div>
                <h1 className="text-6xl">{totalCompleted}</h1>
              </div>
            </div>

            <div className=" box-border flex flex-col w-full mt-10 bg-white min-h-150 border-2 border-slate-300 rounded-2xl">
              <div className="flex justify-between items-center border-b-2 border-slate-300 rounded-2xl p-6 mb-4">
                <h1 className="text-xl">Today's Task</h1>
                <button
                  onClick={() => setIsOpen(true)}
                  className=" flex gap-4 border-2 border-primary bg-primary text-white rounded-2xl py-4 px-6 cursor-pointer hover:bg-slate-700 hover:border-slate-700 active:bg-slate-600 active:border-slate-600"
                >
                  <Plus />
                  Add Task
                </button>
              </div>

              {/* LISTS TO-DO */}
              {lists.map((list) => {
                return (
                  <div
                    className={`style-parent-option ${getParentColor(
                      list.id_list,
                      list.priority
                    )}`}
                    key={list.id_list}
                  >
                    <div className="flex justify-center items-center gap-4">
                      <input
                        type="checkbox"
                        id={list.id_list}
                        disabled={updateIsInProgressUserIsLoading}
                        checked={isCheck[list.id_list] ?? !list.is_in_progress}
                        onChange={(e) =>
                          handlCheckBox(list.id_list, e.target.checked)
                        }
                        className="w-7 h-7 text-blue-500 focus:ring-blue-500 cursor-pointer"
                      />
                      <div className="flex flex-col">
                        <label
                          htmlFor={list.id_list}
                          className={
                            isCheck[list.id_list] ?? !list.is_in_progress
                              ? "line-through decoration-2"
                              : ""
                          }
                        >
                          {list.name_list}
                        </label>
                      </div>
                    </div>

                    <div>
                      <select
                        className={`style-option ${getPriorityColor(
                          list.id_list,
                          list.priority
                        )}`}
                        onChange={(e) =>
                          handlePriority(list.id_list, e.target.value)
                        }
                        value={selectedPriority[list.id_list] || list.priority}
                      >
                        <option value="Low" className="text-primary bg-white">
                          Low Priority
                        </option>
                        <option
                          value="Medium"
                          className="text-primary bg-white"
                        >
                          Medium Priority
                        </option>
                        <option value="High" className="text-primary bg-white">
                          High Priority
                        </option>
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MODAL */}
        {isOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black/50">
            <div className="w-100 bg-white px-8 py-6 rounded-2xl">
              <h2 className="text-xl font-bold">Add New Task</h2>

              <form onSubmit={onSubmit}>
                <div className="flex flex-col items-end mt-8 ">
                  <input
                    type="text"
                    className="border-2 border-primary rounded-lg py-2 px-4 w-full"
                    {...register("name_list")}
                  />
                  <div className="mt-4 flex gap-6">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white active:bg-red-700 active:text-white active:border-red-700"
                    >
                      Cancel
                    </button>
                    <button className="border-2 border-primary px-4 py-2 rounded-lg bg-primary text-white hover:bg-slate-700 hover:border-slate-700 active:border-slate-600 active:bg-slate-600">
                      Add Task
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
