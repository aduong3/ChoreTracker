const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getAllShopItems() {
  try {
    const res = await fetch(`${BASE_URL}/v1/shops`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error("Could not retrieve shop items data.");

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function createNewShopItem(newShopItem) {
  try {
    const res = await fetch(`${BASE_URL}/v1/shops`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShopItem),
      credentials: "include",
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Could not create shop item!");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
