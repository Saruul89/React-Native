import axios from "axios";

const api = axios.create({
  baseURL: "https://yourapi.example.com/api", // Таны API-ийн үндсэн URL
});

export const getIncome = () => api.get("/income");
export const getExpenses = () => api.get("/expenses");
export const getReports = () => api.get("/reports");

export const addIncome = (data) => api.post("/income", data);
export const addExpense = (data) => api.post("/expenses", data);
