import { useCallback, useState } from "react";

export const useGetActiveUser = () => {
  const [name, setName] = useState<string>("");
  const [getActiveUserIsLoading, setGetActiveUserIsLoading] =
    useState<boolean>(false);
  const [getActiveUserError, setGetActiveUserError] = useState<string>("");

  const getActiveUser = useCallback(async () => {
    const idUser = localStorage.getItem("id_user");

    try {
      setGetActiveUserIsLoading(true);
      const response = await fetch(`http://localhost:3001/api/users/${idUser}`);

      const data = await response.json();

      const first_name = data.data?.[0]?.first_name ?? "";
      const last_name = data.data?.[0]?.last_name ?? "";

      const nameUser = `${first_name} ${last_name}`;

      setName(nameUser);
    } catch (err) {
      setGetActiveUserError((err as TypeError).message);
      alert(`Error: ${err}`);
    } finally {
      setGetActiveUserIsLoading(false);
    }
  }, []);

  return {
    name,
    getActiveUserIsLoading,
    getActiveUserError,
    getActiveUser,
  };
};
