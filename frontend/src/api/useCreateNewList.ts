import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const addTaskSchema = z.object({
  name_list: z
    .string()
    .min(1, { message: "Name List must contain at least 1 character(s)" })
    .max(50, { message: "Name List must contain at most 50 character(s)" }),
});

type AddTaskSchema = z.infer<typeof addTaskSchema>;

export const useCreateNewList = () => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [createNewListIsLoading, setCreateNewListIsLoading] =
    useState<boolean>(false);
  const [createNewListError, setCreateNewListError] = useState<string>("");

  const { register, handleSubmit, formState, reset } = useForm({
    resolver: zodResolver(addTaskSchema),
  });

  const createNewList = async (id_user: string, values: AddTaskSchema) => {
    const { name_list } = values;

    try {
      setCreateNewListIsLoading(true);
      await fetch("http://localhost:3001/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_user, name_list }),
      });

      setTrigger((state) => !state);

      alert("Task has been added!");
    } catch (err) {
      setCreateNewListError((err as TypeError).message);
      alert(`Error: ${err}`);
    } finally {
      setCreateNewListIsLoading(false);
    }
  };

  return {
    trigger,
    formState,
    createNewListIsLoading,
    createNewListError,
    register,
    handleSubmit,
    reset,
    createNewList,
  };
};
