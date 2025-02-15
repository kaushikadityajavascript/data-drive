import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token; 
  }
  return config;
});

export const signup = (name: string, email: string, password: string) =>
  API.post("/users", { name, email, password });

export const login = (email: string, password: string) =>
  API.post("/login", { email, password });

export const createFolder = (name: string, parentId: string | null) =>
  API.post("/createFolder", { name, parentId });

export const getFolderContents = (folderId: string | null) =>
  API.get(`/files/${folderId || "null"}/contents`);

export const uploadFile = (formData: FormData, token: string) => 
  API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteFile = (fileId: string, token: string) =>
  API.delete(`/files/${fileId}`, {
    headers: { Authorization: token },
  });

export default API;
