const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import ErrorHandler from "../services/ErrorHandler.js";

export async function signUp(newUser) {
  try {
    const res = await fetch(`${BASE_URL}/v1/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      throw new Error(
        "Cannot sign user up. Please check your information again!",
      );
    }
    const data = await res.json();

    return data;
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}
