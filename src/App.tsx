import { useEffect, useState } from "react";
import { Table } from "./components/Table";
import { Loader } from "./components/Loader";
import { fetchUsers } from "./api/users";
import type { User } from "./types/user";
import styles from "./App.module.css";

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
    return (
      <div className={styles.loaderContainer}>
        <Loader size={100} />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Table data={users} />
    </div>
  );
}

export default App;
