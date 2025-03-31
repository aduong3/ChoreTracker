import { useQuery } from "@tanstack/react-query";
import { getAllHistory } from "../services/apiHistory";
import PurchaseItem from "./PurchaseItem";

function PurchaseList() {
  const { isPending, data, error } = useQuery({
    queryKey: ["purchase-history"],
    queryFn: getAllHistory,
  });
  if (isPending) {
    return (
      <div className="flex h-svh w-svw items-center justify-center">
        <h2>Loading...</h2>
      </div>
    );
  }
  const historyItems = data?.data?.history;
  return (
    <div className="flex justify-center py-5">
      <ul className="flex flex-col">
        {historyItems.map((item) => (
          <PurchaseItem item={item} key={item._id} />
        ))}
      </ul>
    </div>
  );
}

export default PurchaseList;
