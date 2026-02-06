import React from 'react';
import { motion } from 'framer-motion';
import { 
  User,
  Lock,
  Crown,
  X
} from 'lucide-react';

const Seat = ({ seat, isSelected, onClick }) => {
  if (!seat) return null;

  const getSeatColor = () => {
    if (seat.isOccupied) return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    if (seat.isLocked) return 'bg-red-100 text-red-700 border-red-300';
    if (seat.isPremium) return 'bg-amber-100 text-amber-700 border-amber-300';
    if (isSelected) return 'bg-blue-600 text-white border-blue-700';
    return 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300';
  };

  const getSeatIcon = () => {
    if (seat.isOccupied) return <User size={14} />;
    if (seat.isLocked) return <Lock size={14} />;
    if (seat.isPremium) return <Crown size={14} />;
    if (isSelected) return <X size={14} />;
    return null;
  };

  return (
    <motion.button
      whileHover={{ scale: seat.isOccupied ? 1 : 1.05 }}
      whileTap={{ scale: seat.isOccupied ? 1 : 0.95 }}
      onClick={seat.isOccupied ? undefined : onClick}
      disabled={seat.isOccupied}
      className={`w-12 h-12 rounded-lg border-2 flex flex-col items-center justify-center relative transition-all ${getSeatColor()}`}
    >
      <div className="font-medium text-sm">{seat.letter}</div>
      <div className="text-xs">{seat.price}</div>
      
      {getSeatIcon() && (
        <div className="absolute -top-1 -right-1">
          {getSeatIcon()}
        </div>
      )}
    </motion.button>
  );
};

export default Seat;