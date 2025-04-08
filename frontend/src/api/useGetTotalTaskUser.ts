import { useCallback, useState } from "react";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const useGetTotalTaskUser = () => {
  const [totalTask, setTotalTask] = useState<string>("");
  const [getTotalTaskUserIsLoading, setGetTotalTaskUserIsLoading] =
    useState<boolean>(false);
  const [getTotalTaskUserError, setGetTotalTaskUserError] =
    useState<string>("");

  const getTotalTaskUser = useCallback(async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      setGetTotalTaskUserIsLoading(true);

      const response = await fetch(
        `${VITE_BASE_URL}/api/lists/totalTask/${idUser}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = await data.data;

      if (dataJSON.length === 0) {
        console.warn("DATA NIHIL CO!");
        return;
      }

      const count = Object.keys(dataJSON).length;

      setTotalTask(count.toString());
    } catch (err) {
      setGetTotalTaskUserError((err as TypeError).message);
      alert(`Error: ${err}`);
    } finally {
      setGetTotalTaskUserIsLoading(false);
    }
  }, []);

  return {
    totalTask,
    getTotalTaskUserIsLoading,
    getTotalTaskUserError,
    getTotalTaskUser,
  };
};
