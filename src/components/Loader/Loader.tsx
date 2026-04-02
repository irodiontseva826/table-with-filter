import styles from "./Loader.module.css";

type LoaderProps = {
  size?: number;
};

export const Loader = ({ size = 40 }: LoaderProps) => (
  <div
    className={styles.loader}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${Math.max(2, size / 20)}px`,
    }}
  />
);
