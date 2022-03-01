import itemService from "@/services/item.service";

const useItems = () => {
  const getItemList = () => {
    return itemService.getItems();
  }

  return {
    getItemList
  }
};

export default useItems;