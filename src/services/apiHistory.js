const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function addToHistory(item) {
  try {
    const dataItem = {
      title: item.title,
      price: item.price,
      reward: item._id,
    };
    const res = await fetch(`${BASE_URL}/v1/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataItem),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(
        data.message || "Cannot create item into purchase history.",
      );
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
