import { User } from "@/models/user";

export const getUsersData: () => Promise<User[]> = async () => {
  try {
    const response = await fetch(`/api/mock_users`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result: User[] = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get the users data: ${error.message}`);
    } else {
      throw new Error(
        "Unknown error occurred while it tried to get users data."
      );
    }
  }
};
