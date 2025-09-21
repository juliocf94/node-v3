import HttpClient from "@shared/HttpClient";

const basePATH = import.meta.env.VITE_API_URL || "/api";
const baseURL = window.location.hostname !== "localhost" ? `https://${window.location.hostname}${basePATH}` : import.meta.env.VITE_API_URL;

export const api = new HttpClient(baseURL);