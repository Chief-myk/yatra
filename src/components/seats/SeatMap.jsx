import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Unlock, 
  AlertCircle,
  Crown,
  DoorOpen,
  Shield,
  ZoomIn,
  ZoomOut,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import Seat from './Seat';
import SeatLegend from './SeatLegend';
import EducationalTooltip from '../common/EducationalTooltip';

const SeatMap = ({ flightId, onSeatSelect, selectedSeat }) => {
  const [seats, setSeats] = useState([]);
  const [lockedSeats, setLockedSeats] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);

  const handleSeatClick = (seat) => {
    if (seat.isOccupied) {
      toast.error('This seat is already occupied');
      return;
    }

    if (seat.isLocked && !lockedSeats.has(seat.number)) {
      toast.error('This seat is being selected by another passenger', {
        icon: <Lock size={20} />,
      });
      return;
    }

    // Simulate seat locking mechanism
    if (!seat.isLocked) {
      setLockedSeats(prev => new Set([...prev, seat.number]));
      
      // Simulate seat lock timeout (in real app, this would be WebSocket)
      setTimeout(() => {
        setLockedSeats(prev => {
          const newSet = new Set(prev);
          newSet.delete(seat.number);
          return newSet;
        });
      }, 30000); // 30 second lock
      
      onSeatSelect(seat);
      toast.success(`Seat ${seat.number} selected`, {
        icon: <CheckCircle size={20} />,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <DoorOpen size={24} />
          Aircraft Seat Map
        </h3>
        
        <div className="flex items-center gap-3">
          <EducationalTooltip
            title="Real-time Seat Locking"
            content="When you select a seat, it gets temporarily locked using a mock WebSocket connection to prevent double booking."
          >
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Shield size={20} />
            </button>
          </EducationalTooltip>
          
          <button 
            onClick={() => setZoom(zoom => Math.min(zoom + 0.1, 1.5))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ZoomIn size={20} />
          </button>
          <button 
            onClick={() => setZoom(zoom => Math.max(zoom - 0.1, 0.8))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ZoomOut size={20} />
          </button>
        </div>
      </div>

      {/* Aircraft Layout */}
      <div className="relative" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
        {/* Cockpit */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-16 bg-gray-800 rounded-t-full flex items-end justify-center pb-2">
            <div className="w-24 h-4 bg-gray-700 rounded-t-full"></div>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="grid grid-cols-12 gap-2">
          {/* Left Side */}
          <div className="col-span-5 space-y-2">
            {Array.from({ length: 10 }, (_, row) => (
              <div key={row} className="flex gap-2">
                <div className="w-12 text-center text-sm font-medium text-gray-600 flex items-center justify-center">
                  {row + 1}
                </div>
                {['A', 'B', 'C'].map(letter => {
                  const seatNumber = `${row + 1}${letter}`;
                  const seat = seats.find(s => s.number === seatNumber);
                  return (
                    <Seat
                      key={seatNumber}
                      seat={seat}
                      isSelected={selectedSeat?.number === seatNumber}
                      onClick={() => handleSeatClick(seat)}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Aisle */}
          <div className="col-span-2 flex items-center">
            <div className="w-full h-0.5 bg-blue-200"></div>
          </div>

          {/* Right Side */}
          <div className="col-span-5 space-y-2">
            {Array.from({ length: 10 }, (_, row) => (
              <div key={row} className="flex gap-2">
                {['D', 'E', 'F'].map(letter => {
                  const seatNumber = `${row + 1}${letter}`;
                  const seat = seats.find(s => s.number === seatNumber);
                  return (
                    <Seat
                      key={seatNumber}
                      seat={seat}
                      isSelected={selectedSeat?.number === seatNumber}
                      onClick={() => handleSeatClick(seat)}
                    />
                  );
                })}
                <div className="w-12 text-center text-sm font-medium text-gray-600 flex items-center justify-center">
                  {row + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exit Row Indicators */}
        <div className="mt-8 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <DoorOpen size={20} className="text-red-500" />
            <span className="text-sm font-medium">Emergency Exit</span>
          </div>
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-amber-500" />
            <span className="text-sm font-medium">Premium Class</span>
          </div>
        </div>
      </div>

      <SeatLegend />
    </div>
  );
};

export default SeatMap;