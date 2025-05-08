import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getHabits = () => api.get("/habits");
export const addHabit = (habit) => api.post("/habits", habit);
export const updateHabit = (id, habit) => api.put(`/habits/${id}`, habit);
export const deleteHabit = (id) => api.delete(`/habits/${id}`);
