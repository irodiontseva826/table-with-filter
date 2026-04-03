import { useState } from "react";
import styles from "./Filter.module.css";

type FilterProps = {
  onSearchChange: (value: string) => void;
  onReset: () => void;
};

export const Filter = ({ onSearchChange, onReset }: FilterProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange(value);
  };

  const handleReset = () => {
    setInputValue("");
    onReset();
  };

  return (
    <div className={styles.filter}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search by name..."
        className={styles.input}
      />
      <button onClick={handleReset} className={styles.button}>
        Reset
      </button>
    </div>
  );
};
