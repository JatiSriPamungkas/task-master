import taskMaster from "../assets/Logo Task Master.png";
import profile from "../assets/Ishida_Mitsunari_Square.png";
import {
  ListTodo,
  House,
  CalendarDays,
  ChartNoAxesColumn,
  Settings,
  Loader,
  Check,
  Plus,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllTaskList } from "../api/useGetAllTaskList";
import IsLoading from "../components/IsLoadingModal";
import { useGetActiveUser } from "../api/useGetActiveUser";
import { useGetTotalTaskUser } from "../api/useGetTotalTaskUser";
import { useGetInProgressUser } from "../api/useGetInProgressUser";
import { useGetCompletedTaskUser } from "../api/useGetCompletedTaskuser";
import { useCreateNewList } from "../api/useCreateNewList";
import TaskModal from "../components/TaskModal";
import { useUpdatePriorityUser } from "../api/useUpdatePriorityUser";
import { useUpdateIsInProgressUser } from "../api/useUpdateIsInProgressUser";

const HomePage = () => {
  // GET METHOD (refactoring...)
  const { lists, getAllListIsLoading, getAllTaskList } = useGetAllTaskList();
  const { name, getActiveUserIsLoading, getActiveUser } = useGetActiveUser();
  const { totalTask, getTotalTaskUserIsLoading, getTotalTaskUser } =
    useGetTotalTaskUser();
  const {
    totalInProgress,
    getInProgressTaskUserIsLoading,
    getInProgressTaskUser,
  } = useGetInProgressUser();
  const { totalCompleted, getCompletedTaskUserIsLoading, getCompleteTaskUser } =
    useGetCompletedTaskUser();

  // POST METHOD (refactoring...)
  const { trigger, formState, register, handleSubmit, reset, createNewList } =
    useCreateNewList();

  // PATCH METHOD (refactoring...)
  const { updatePriorityUser } = useUpdatePriorityUser();
  const { updateIsInProgressUserIsLoading, updateIsInProgressUser } =
    useUpdateIsInProgressUser();

  // MANDATORY STATE
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isCheck, setIsCheck] = useState<Record<string, boolean>>({});
  const [selectedPriority, setSelectedPriority] = useState<
    Record<string, string>
  >({});
  const [idListPriority, setIdListPriority] = useState<string>("");
  const [idListCheck, setIdListCheck] = useState<string>("");
  const [menuActive, setMenuActive] = useState<string>("Dashboard");

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

  const handleCloseModals = () => {
    setIsModalOpen(false);

    reset();
  };

  // GET EFFECT METHOD
  useEffect(() => {
    getAllTaskList();
    getActiveUser();
    getTotalTaskUser();
    getInProgressTaskUser();
    getCompleteTaskUser();
  }, [
    trigger,
    getAllTaskList,
    getActiveUser,
    getTotalTaskUser,
    getInProgressTaskUser,
    getCompleteTaskUser,
  ]);

  // PATCH EFFECT METHOD
  useEffect(() => {
    updatePriorityUser(idListPriority, selectedPriority[idListPriority]);
  }, [idListPriority, selectedPriority, updatePriorityUser]);

  useEffect(() => {
    const updateStateInProgress = async () => {
      await updateIsInProgressUser(idListCheck, isCheck[idListCheck]);

      getInProgressTaskUser();
      getCompleteTaskUser();
    };

    updateStateInProgress();
  }, [
    isCheck,
    idListCheck,
    updateIsInProgressUser,
    getInProgressTaskUser,
    getCompleteTaskUser,
  ]);

  return (
    <>
      <div className=" bg-stone-100 font-lexend text-primary w-screen min-h-screen">
        {/* HEADER SECTION */}
        <div className="flex justify-between py-4 px-8 items-center bg-white border-b-2 border-slate-200">
          <div className="flex justify-between items-center gap-4">
            <a href="">
              <img src={taskMaster} alt="Task Master Logo" width={50} />
            </a>
            <a href="" className="text-4xl font-medium text-primary">
              Task Master
            </a>
          </div>
          <div>
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
          <div
            className={`w-0 bg-white md:w-75 md:px-2 py-2 border-r-2 border-slate-200 overflow-hidden transition-all ease duration-500`}
          >
            <ul className="flex flex-col gap-2 text-sm text-slate-600">
              <li>
                <button
                  onClick={() => setMenuActive("Dashboard")}
                  className={`flex w-full items-center gap-2 px-4 py-3 rounded-2xl hover:bg-slate-100 hover:text-primary cursor-pointer focus:outline-none ${
                    menuActive == "Dashboard"
                      ? "bg-slate-800 text-white hover:text-white hover:bg-slate-800"
                      : ""
                  }`}
                >
                  <House width={15} />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setMenuActive("Calendar")}
                  className={`flex w-full items-center gap-2 px-4 py-3 rounded-2xl hover:bg-slate-100 hover:text-primary cursor-pointer focus:outline-none ${
                    menuActive == "Calendar"
                      ? "bg-slate-800 text-white hover:text-white hover:bg-slate-800"
                      : ""
                  }`}
                >
                  <CalendarDays width={15} />
                  Calendar
                </button>
              </li>
              <li>
                <button
                  onClick={() => setMenuActive("Task")}
                  className={`flex w-full items-center gap-2 px-4 py-3 rounded-2xl hover:bg-slate-100 hover:text-primary cursor-pointer focus:outline-none ${
                    menuActive == "Task"
                      ? "bg-slate-800 text-white hover:text-white hover:bg-slate-800"
                      : ""
                  }`}
                >
                  <ListTodo width={15} />
                  Task
                </button>
              </li>
              <li>
                <button
                  onClick={() => setMenuActive("Analytics")}
                  className={`flex w-full items-center gap-2 px-4 py-3 rounded-2xl hover:bg-slate-100 hover:text-primary cursor-pointer focus:outline-none ${
                    menuActive == "Analytics"
                      ? "bg-slate-800 text-white hover:text-white hover:bg-slate-800"
                      : ""
                  }`}
                >
                  <ChartNoAxesColumn width={20} />
                  Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setMenuActive("Settings")}
                  className={`flex w-full items-center gap-2 px-4 py-3 rounded-2xl hover:bg-slate-100 hover:text-primary cursor-pointer focus:outline-none ${
                    menuActive == "Settings"
                      ? "bg-slate-800 text-white hover:text-white hover:bg-slate-800"
                      : ""
                  }`}
                >
                  <Settings width={20} />
                  Settings
                </button>
              </li>
            </ul>
          </div>

          {/* DASHBOARD SECTION  */}
          <div className="my-10 mx-10 w-full relative">
            <div
              className={`w-full h-16 items-start absolute overflow-hidden bg-white shadow-sm border-2 border-slate-300 rounded-2xl px-4 py-4 text-2xl z-2 transition-all ease-out duration-500 md:-translate-y-300 ${
                isSidebarOpen ? "items-start h-123" : ""
              }`}
            >
              <div className="flex justify-between px-4">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="focus:outline-none cursor-pointer"
                >
                  <Menu width={25} />
                </button>
                <h1>{menuActive}</h1>
              </div>

              <div className="my-6">
                <ul className="flex flex-col gap-4">
                  <li>
                    <button
                      onClick={() => setMenuActive("Dashboard")}
                      className={`w-full text-start py-4 px-4 rounded-2xl hover:bg-slate-300 active:bg-slate-800 active:text-white ${
                        menuActive == "Dashboard" &&
                        " bg-slate-800 text-white hover:bg-slate-800"
                      }`}
                    >
                      <h1>Dashboard</h1>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuActive("Calendar")}
                      className={`w-full text-start py-4 px-4 rounded-2xl hover:bg-slate-300 active:bg-slate-800 active:text-white ${
                        menuActive == "Calendar" &&
                        " bg-slate-800 text-white hover:bg-slate-800"
                      }`}
                    >
                      <h1>Calendar</h1>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuActive("Task")}
                      className={`w-full text-start py-4 px-4 rounded-2xl hover:bg-slate-300 active:bg-slate-800 active:text-white ${
                        menuActive == "Task" &&
                        " bg-slate-800 text-white hover:bg-slate-800"
                      }`}
                    >
                      <h1>Task</h1>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuActive("Analytics")}
                      className={`w-full text-start py-4 px-4 rounded-2xl hover:bg-slate-300 active:bg-slate-800 active:text-white ${
                        menuActive == "Analytics" &&
                        " bg-slate-800 text-white hover:bg-slate-800"
                      }`}
                    >
                      <h1>Analytics</h1>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setMenuActive("Settings")}
                      className={`w-full text-start py-4 px-4 rounded-2xl hover:bg-slate-300 active:bg-slate-800 active:text-white ${
                        menuActive == "Settings" &&
                        " bg-slate-800 text-white hover:bg-slate-800"
                      }`}
                    >
                      <h1>Settings</h1>
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-24 md:mt-0">
              <h1 className="text-4xl text-primary">
                Welcome back,{" "}
                <span className="whitespace-nowrap xl:whitespace-normal">
                  Master {name}
                </span>
              </h1>
              <p className="text-xl text-secondary">
                Here's your overview task for today!
              </p>
            </div>
            <div className="flex w-full justify-around gap-6 pt-10 h-65">
              <div className="flex flex-col border-2 border-slate-300 border-solid grow-1 justify-center min-h-32 gap-5 bg-white p-6 rounded-2xl">
                <div className="flex sm:flex-col-reverse sm:gap-4 lg:flex-row lg:justify-between">
                  <h3>Total Task</h3>
                  <ListTodo width={25} />
                </div>
                <h1 className="text-6xl">{totalTask}</h1>
              </div>
              <div className="flex flex-col border-2 border-slate-300 border-solid grow-1 justify-center min-h-32 gap-5 bg-white  p-6 rounded-2xl">
                <div className="flex sm:flex-col-reverse sm:gap-4 lg:flex-row lg:justify-between">
                  <h3>In Progress</h3>
                  <Loader width={25} />
                </div>
                <h1 className="text-6xl">{totalInProgress}</h1>
              </div>
              <div className="flex flex-col border-2 border-slate-300 border-solid grow-1 justify-center min-h-32 gap-5 bg-white p-6 rounded-2xl">
                <div className="flex sm:flex-col-reverse sm:gap-4 lg:flex-row lg:justify-between">
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
                  onClick={() => setIsModalOpen(true)}
                  className=" flex gap-4 border-2 border-primary bg-primary text-white rounded-2xl py-4 px-6 cursor-pointer hover:bg-slate-700 hover:border-slate-700 active:bg-slate-600 active:border-slate-600 focus:outline-none"
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
                        className="w-7 h-7 text-blue-500 focus:ring-blue-500 cursor-pointer focus:outline-none"
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

        {/* ADD TASK MODAL */}
        {isModalOpen && (
          <TaskModal
            onSubmit={onSubmit}
            register={register}
            formState={formState}
            handleCloseModals={handleCloseModals}
          />
        )}

        {/* LOADING MODAL */}
        {(getAllListIsLoading ||
          getActiveUserIsLoading ||
          getTotalTaskUserIsLoading ||
          getInProgressTaskUserIsLoading ||
          getCompletedTaskUserIsLoading) && <IsLoading />}

        {/* BACKGROUND MODAL */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-gray-900/70 z-1 md:bg-transparent md:z-0"></div>
        )}
      </div>
    </>
  );
};

export default HomePage;
