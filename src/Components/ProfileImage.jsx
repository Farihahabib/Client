import { useState } from 'preact/hooks';
import DefaultAvatar from './DefaultAvatar';

const ProfileImage = ({ 
  src, 
  alt = 'Profile', 
  size = 'w-12 h-12', 
  className = '', 
  name = '',
  showBorder = false 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // If no src provided or image failed to load, show default avatar
  if (!src || imageError) {
    return (
      <DefaultAvatar 
        size={size} 
        className={`${className} ${showBorder ? 'ring-2 ring-white ring-offset-2' : ''}`}
        name={name}
      />
    );
  }

  return (
    <div className={`${size} ${className} relative`}>
      {imageLoading && (
        <DefaultAvatar 
          size={size} 
          className="absolute inset-0"
          name={name}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${size} rounded-full object-cover ${showBorder ? 'ring-2 ring-white ring-offset-2' : ''} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default ProfileImage;