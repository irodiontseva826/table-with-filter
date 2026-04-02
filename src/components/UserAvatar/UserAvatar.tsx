import { useState } from "react";
import { Loader } from "../Loader";
import { Tooltip } from "../Tooltip";
import userDefault from "../../assets/user.jpg";
import styles from "./UserAvatar.module.css";

type UserAvatarProps = {
  image: string;
  largeImage: string;
  alt: string;
};

export const UserAvatar = ({ image, largeImage, alt }: UserAvatarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(image);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(userDefault);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.avatarContainer}>
      {isLoading && <Loader size={40} />}
      <img
        src={imageSrc}
        alt={alt}
        className={styles.avatar}
        style={{ display: isLoading ? "none" : "block" }}
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <div className={styles.tooltipWrapper}>
          <Tooltip image={largeImage} alt={alt} />
        </div>
      )}
    </div>
  );
};
