import { useCallback, useState } from "react";

export const useUpdateIsInProgressUser = () => {
  const [updateIsInProgressUserIsLoading, setUpdateIsInProgressUserIsLoading] =
    useState<boolean>(false);
  const [updateIsInProgressUserError, setUpdateIsInProgressUserError] =
    useState<string>("");

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
      } catch (err) {
        setUpdateIsInProgressUserError((err as TypeError).message);
        alert(`Error: ${err}`);
      } finally {
        setUpdateIsInProgressUserIsLoading(false);
      }
    },
    []
  );

  return {
    updateIsInProgressUserIsLoading,
    updateIsInProgressUserError,
    updateIsInProgressUser,
  };
};
