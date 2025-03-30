const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const fetchTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`);
  return res.json();
};

export const addTask = async (task) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
};

export const registerUser = async (email, password) => {
  return fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};
