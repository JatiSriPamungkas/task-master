import { useCallback, useState } from "react";

export const useGetInProgressUser = () => {
  const [totalInProgress, setTotalInProgress] = useState<string>("");
  const [getInProgressTaskUserIsLoading, setGetInProgressTaskUserIsLoading] =
    useState<boolean>(false);
  const [getInProgressTaskUserError, setGetInProgressTaskUserError] =
    useState<string>("");

  const getInProgressTaskUser = useCallback(async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      setGetInProgressTaskUserIsLoading(true);

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
    } catch (err) {
      setGetInProgressTaskUserError((err as TypeError).message);
      alert(`Error: ${err}`);
    } finally {
      setGetInProgressTaskUserIsLoading(false);
    }
  }, []);

  return {
    totalInProgress,
    getInProgressTaskUserIsLoading,
    getInProgressTaskUserError,
    getInProgressTaskUser,
  };
};
