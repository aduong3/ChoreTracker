const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://choresite-n71r.onrender.com/api"
    : import.meta.env.VITE_API_BASE_URL;
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

export async function logIn(userInfo) {
  try {
    const res = await fetch(`${BASE_URL}/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Email or password is incorrect");
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}

export async function checkAuth() {
  try {
    const res = await fetch(`${BASE_URL}/v1/users/auth-status`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("No authorization! Log in!");
    const data = await res.json();
    return data;
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}

export async function logout() {
  try {
    const res = await fetch(`${BASE_URL}/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Could not log out.");
    return;
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}

export async function addPoints(addPoints) {
  try {
    const res = await fetch(`${BASE_URL}/v1/users/points`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ points: addPoints }),
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Could not add points to the user.");
    }
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}

export async function getPoints() {
  try {
    const res = await fetch(`${BASE_URL}/v1/users/points`, {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Could not retrieve the user's points.");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return new ErrorHandler(err.message, 400);
  }
}
