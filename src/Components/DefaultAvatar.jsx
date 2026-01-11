import { FaUser } from 'react-icons/fa';

const DefaultAvatar = ({ size = 'w-12 h-12', className = '', name = '' }) => {
  // Get initials from name
  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className={`${size} ${className} bg-linear-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-md`}>
      {name ? (
        <span className="text-sm">{getInitials(name)}</span>
      ) : (
        <FaUser className="text-white opacity-80" />
      )}
    </div>
  );
};

export default DefaultAvatar;