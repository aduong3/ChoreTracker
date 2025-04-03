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

  if (!data.results) {
    return (
      <div className="relative flex">
        <p className="absolute top-50 left-50 translate-x-[5%] text-xl font-bold">
          You can view what you purchased in the past month here!
        </p>
      </div>
    );
  }

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
