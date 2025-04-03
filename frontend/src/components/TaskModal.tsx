import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormStateReturn,
} from "react-hook-form";

type PropsDataSchema = {
  name_list: string;
};

type PropsSchema = {
  onSubmit: ReturnType<UseFormHandleSubmit<PropsDataSchema>>;
  register: UseFormRegister<PropsDataSchema>;
  formState: UseFormStateReturn<PropsDataSchema>;
  handleCloseModals: () => void;
};

const TaskModal: React.FC<PropsSchema> = ({
  onSubmit,
  register,
  formState,
  handleCloseModals,
}) => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center bg-black/50">
        <div className="w-100 bg-white px-8 py-6 rounded-2xl">
          <h2 className="text-xl font-bold">Add New Task</h2>

          <form onSubmit={onSubmit}>
            <div className="flex flex-col items-end mt-8 ">
              <input
                type="text"
                className="border-2 border-primary rounded-lg py-2 px-4 w-full focus:outline-none"
                {...register("name_list")}
              />
              <span className="text-red-500 py-2 px-4">
                {formState.errors.name_list?.message}
              </span>
              <div className="mt-4 flex gap-6">
                <button
                  type="button"
                  onClick={handleCloseModals}
                  className="border-2 border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white active:bg-red-700 active:text-white active:border-red-700 focus:outline-none"
                >
                  Cancel
                </button>
                <button className="border-2 border-primary px-4 py-2 rounded-lg bg-primary text-white hover:bg-slate-700 hover:border-slate-700 active:border-slate-600 active:bg-slate-600 focus:outline-none">
                  Add Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
