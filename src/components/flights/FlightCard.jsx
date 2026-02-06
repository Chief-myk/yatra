import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Shield,
  Wifi,
  Coffee
} from 'lucide-react';

const FlightCard = ({ flight, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className="glass-card rounded-2xl p-6 cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plane className="text-blue-600" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{flight.airline}</h3>
              <p className="text-sm text-gray-600">{flight.flightNumber}</p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">₹{flight.price}</span>
          <p className="text-sm text-gray-600">per passenger</p>
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-center">
          <p className="text-2xl font-bold">{flight.departureTime}</p>
          <p className="text-sm text-gray-600">{flight.from}</p>
        </div>
        
        <div className="flex-1 px-4">
          <div className="relative">
            <div className="h-0.5 bg-gray-300"></div>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <ArrowRight className="text-gray-400" size={20} />
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            <Clock size={14} className="inline mr-1" />
            {flight.duration}
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-bold">{flight.arrivalTime}</p>
          <p className="text-sm text-gray-600">{flight.to}</p>
        </div>
      </div>

      {/* Features */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Wifi size={16} className="text-gray-500" />
            <span className="text-gray-700">Wi-Fi</span>
          </span>
          <span className="flex items-center gap-1">
            <Coffee size={16} className="text-gray-500" />
            <span className="text-gray-700">Meal</span>
          </span>
          <span className="flex items-center gap-1">
            <Shield size={16} className="text-gray-500" />
            <span className="text-gray-700">Secure</span>
          </span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
        >
          <CheckCircle size={16} />
          Select Flight
        </motion.button>
      </div>

      {/* Available Seats */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <Users size={14} />
            Available seats: {flight.availableSeats}
          </span>
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <DollarSign size={14} />
            From ₹{flight.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;