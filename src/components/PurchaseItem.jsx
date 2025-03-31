const dateOptions = {
  day: "numeric",
  year: "numeric",
  month: "long",
};

function PurchaseItem({ item }) {
  return (
    <li className="border-b-1 border-gray-300 py-2">
      <div className="grid grid-cols-2">
        <p className="text-center">{item.title}</p>
        <p className="text-right">
          {new Date(item.purchasedAt).toLocaleDateString("en-US", dateOptions)}
        </p>
      </div>
    </li>
  );
}

export default PurchaseItem;
