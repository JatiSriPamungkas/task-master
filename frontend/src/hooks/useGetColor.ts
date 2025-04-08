type useGetColorSchema = {
  selectedPriority: Record<string, string>;
};

export const useGetColor = ({ selectedPriority }: useGetColorSchema) => {
  const getPriorityColor = (idList: string, prevPriority: string) => {
    switch (selectedPriority[idList] || prevPriority) {
      case "High":
        return "border-red-800 bg-red-300 text-red-800";
      case "Medium":
        return "border-orange-800 bg-orange-300 text-orange-800";
      case "Low":
        return "border-blue-800 bg-blue-300 text-blue-800";
      default:
        return "";
    }
  };

  const getParentColor = (idList: string, prevPriority: string) => {
    switch (selectedPriority[idList] || prevPriority) {
      case "High":
        return "bg-red-100";
      case "Medium":
        return "bg-orange-100";
      case "Low":
        return "bg-blue-100";
      default:
        return "";
    }
  };

  return {
    getPriorityColor,
    getParentColor,
  };
};
