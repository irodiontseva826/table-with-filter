import type { User } from "../types/user";

type ApiResponse = {
  results: User[];
};

const API_URL = import.meta.env.DEV
  ? "/api/?results=15"
  : "https://randomuser.me/api/?results=15";

export const fetchUsers = async (): Promise<ApiResponse> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};
