import { useCallback, useState } from "react";

type ListSchema = {
  id_list: string;
  name_list: string;
  id_user: string;
  is_in_progress: boolean;
  priority: string;
};

export const useGetAllTaskList = () => {
  const [lists, setLists] = useState<ListSchema[]>([]);
  const [getAllListIsLoading, setGetAllListIsLoading] = useState<boolean>();
  const [getAllListError, setGetAllListError] = useState<string>("");

  const getAllTaskList = useCallback(async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      setGetAllListIsLoading(true);
      const response = await fetch(
        `http://localhost:3001/api/lists/totalTask/${idUser}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = data.data;

      setLists(dataJSON);
    } catch (err) {
      setGetAllListError((err as TypeError).message);
      alert(`Error: ${err}`);
    } finally {
      setGetAllListIsLoading(false);
    }
  }, []);

  return {
    lists,
    getAllListIsLoading,
    getAllListError,
    getAllTaskList,
  };
};
