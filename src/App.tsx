import { useEffect, useState } from "react";
import { Table } from "./components/Table";
import { fetchUsers } from "./api/users";
import type { User } from "./types/user";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUsers();
        const usersWithId = data.results.map((user) => ({
          ...user,
          id: user.login.uuid,
        }));
        setUsers(usersWithId);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table data={users} />
    </>
  );
}

export default App;
