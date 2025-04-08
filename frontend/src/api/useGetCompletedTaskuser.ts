import { useCallback, useState } from "react";

export const useGetCompletedTaskUser = () => {
  const [totalCompleted, setTotalCompleted] = useState<string>("");
  const [getCompletedTaskUserIsLoading, setGetCompletedTaskUserIsLoading] =
    useState<boolean>(false);
  const [getCompletedTaskUserError, setGetCompletedTaskUserError] =
    useState<string>("");

  const getCompleteTaskUser = useCallback(async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      setGetCompletedTaskUserIsLoading(true);

      const response = await fetch(
        `http://localhost:3001/api/lists/in-progress/${idUser}?is_in_progress=false`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      const dataJSON = data.data;

      const count = Object.keys(dataJSON).length;

      setTotalCompleted(count.toString());
    } catch (err) {
      setGetCompletedTaskUserError((err as TypeError).message);
      alert(`Error: ${err}`);
    } finally {
      setGetCompletedTaskUserIsLoading(false);
    }
  }, []);

  return {
    totalCompleted,
    getCompletedTaskUserIsLoading,
    getCompletedTaskUserError,
    getCompleteTaskUser,
  };
};
