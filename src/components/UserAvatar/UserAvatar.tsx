import { useState } from "react";
import { Loader } from "../Loader";
import userDefault from "../../assets/user.jpg";
import styles from "./UserAvatar.module.css";

type UserAvatarProps = {
  src: string;
  alt: string;
};

export const UserAvatar = ({ src, alt }: UserAvatarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(src);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(userDefault);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.avatarContainer}>
      {isLoading && <Loader size={40} />}
      <img
        src={imgSrc}
        alt={alt}
        className={styles.avatar}
        style={{ display: isLoading ? "none" : "block" }}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};
