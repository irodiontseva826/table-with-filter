import type { User } from "../types/user";

type ApiResponse = {
  results: User[];
};

export const fetchUsers = async (): Promise<ApiResponse> => {
  const response = await fetch("/api/?results=15");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};
