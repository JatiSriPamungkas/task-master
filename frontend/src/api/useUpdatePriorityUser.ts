import { useCallback, useState } from "react";

export const useUpdatePriorityUser = () => {
  const [updatePriorityUserIsLoading, setUpdatePriorityUserIsLoading] =
    useState<boolean>(false);
  const [updatePriorityUserError, setUpdatePriorityUserError] =
    useState<string>("");

  const updatePriorityUser = useCallback(
    async (idList: string, newPriority: string) => {
      try {
        setUpdatePriorityUserIsLoading(true);
        await fetch(
          `http://localhost:3001/api/lists/update-priority/${idList}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ priority: newPriority }),
          }
        );
      } catch (err) {
        setUpdatePriorityUserError((err as TypeError).message);
        alert(`Error: ${err}`);
      } finally {
        setUpdatePriorityUserIsLoading(false);
      }
    },
    []
  );

  return {
    updatePriorityUserIsLoading,
    updatePriorityUserError,
    updatePriorityUser,
  };
};
