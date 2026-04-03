import { useState } from "react";
import { Loader } from "../Loader";
import { Tooltip } from "../Tooltip";
import userDefault from "../../assets/user.jpg";
import styles from "./UserAvatar.module.css";

type UserAvatarProps = {
  src: string;
  largeSrc: string;
  alt: string;
};

export const UserAvatar = ({ src, largeSrc, alt }: UserAvatarProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>(src);
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
      {!hasError && showTooltip && (
        <div className={styles.tooltipWrapper}>
          <Tooltip image={largeSrc} alt={alt} />
        </div>
      )}
    </div>
  );
};
