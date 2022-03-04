import { PurchaseItem } from "@/http/requests/purchase-items.request";
import itemService from "@/services/item.service";
import useAppStateCore from "../store-hooks/useAppStateCore";

const useItems = () => {
  const { accountId } = useAppStateCore();

  const getItemList = () => {
    return itemService.getItems();
  }

  const buyItems = (items: PurchaseItem[]) => {
    return itemService.buyItems({ accountId: accountId.value, items });
  }

  return {
    getItemList,
    buyItems
  }
};

export default useItems;