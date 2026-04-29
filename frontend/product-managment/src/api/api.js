
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const getProducts = (params) => API.get("/products", { params });
export const getCategories = () => API.get("/categories");
export const getSubcategories = (categoryId) =>
  API.get(`/subcategories?category=${categoryId}`);