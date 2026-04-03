import { useEffect, useRef, useState } from "react";
import { Filter, Loader, Table } from "./components";
import { fetchUsers } from "./api/users";
import { debounce } from "./utils/debounce";
import type { User } from "./types/user";
import styles from "./App.module.css";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Load users on component mount
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
        setFilteredUsers(usersWithId);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Filter users when search query changes
  useEffect(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(normalizedQuery);
    });

    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  // Debounced search to avoid unnecessary re-renders
  const debouncedSearch = useRef(
    debounce((value: string) => setSearchQuery(value), 500),
  ).current;

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader size={100} />
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <h1>Users Table</h1>
      <Filter
        onSearchChange={handleSearchChange}
        onReset={() => setSearchQuery("")}
      />
      {filteredUsers.length === 0 ? (
        <p className={styles.noResults}>No users found</p>
      ) : (
        <Table data={filteredUsers} />
      )}
    </div>
  );
}

export default App;
