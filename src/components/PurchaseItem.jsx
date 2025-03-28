function PurchaseItem({ item }) {
  return (
    <li>
      <p>{item.title}</p>
      <p>{new Date(item.purchasedAt).toLocaleDateString()}</p>
    </li>
  );
}

export default PurchaseItem;
