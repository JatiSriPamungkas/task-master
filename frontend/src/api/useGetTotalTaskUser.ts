import { useCallback, useState } from "react";

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
        `http://localhost:3001/api/lists/totalTask/${idUser}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = data.data;

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
