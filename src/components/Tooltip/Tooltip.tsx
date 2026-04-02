import { useState } from "react";
import { Loader } from "../Loader";
import styles from "./Tooltip.module.css";

type TooltipProps = {
  image: string;
  alt: string;
};

export const Tooltip = ({ image, alt }: TooltipProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={styles.tooltip}>
      {isLoading && <Loader size={50} />}
      {hasError ? (
        <p className={styles.error}>Failed to load image</p>
      ) : (
        <img
          src={image}
          alt={alt}
          className={styles.image}
          style={{ display: isLoading ? "none" : "block" }}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      )}
    </div>
  );
};
