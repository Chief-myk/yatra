import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane,
  Calendar,
  Users,
  Search,
  MapPin,
  ChevronDown,
  Clock,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import EducationalTooltip from '../common/EducationalTooltip';

const FlightSearch = ({ searchParams, onParamsChange, onSearch }) => {
  const cities = [
    'Delhi (DEL)', 'Mumbai (BOM)', 'Bangalore (BLR)', 
    'Chennai (MAA)', 'Kolkata (CCU)', 'Hyderabad (HYD)',
    'Goa (GOI)', 'Kochi (COK)', 'Ahmedabad (AMD)'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Plane size={24} />
          Flight Search
        </h3>
        <EducationalTooltip
          title="Real-time API Integration"
          content="This search connects to a mock API. In production, this would connect to airline APIs like Amadeus or Sabre."
          side="left"
        >
          <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
            <AlertCircle size={16} />
            How it works
          </button>
        </EducationalTooltip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin size={16} />
            From
          </label>
          <div className="relative">
            <input
              type="text"
              list="from-cities"
              value={searchParams.from}
              onChange={(e) => onParamsChange({...searchParams, from: e.target.value})}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Departure city"
            />
            <ChevronDown className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
          <datalist id="from-cities">
            {cities.map(city => <option key={city} value={city} />)}
          </datalist>
        </div>

        {/* To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <MapPin size={16} />
            To
          </label>
          <div className="relative">
            <input
              type="text"
              list="to-cities"
              value={searchParams.to}
              onChange={(e) => onParamsChange({...searchParams, to: e.target.value})}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Destination city"
            />
            <ChevronDown className="absolute left-3 top-3.5 text-gray-400" size={18} />
          </div>
          <datalist id="to-cities">
            {cities.map(city => <option key={city} value={city} />)}
          </datalist>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar size={16} />
            Date
          </label>
          <input
            type="date"
            value={searchParams.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => onParamsChange({...searchParams, date: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Users size={16} />
            Passengers
          </label>
          <div className="relative">
            <select
              value={searchParams.passengers}
              onChange={(e) => onParamsChange({...searchParams, passengers: parseInt(e.target.value)})}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSearch}
        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-shadow"
      >
        <Search size={20} />
        Search Flights
        <Clock size={20} className="opacity-80" />
      </motion.button>

      {/* Quick Filters */}
      <div className="pt-4 border-t">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <DollarSign size={16} />
          Quick Filters
        </h4>
        <div className="flex flex-wrap gap-2">
          {['Non-stop', 'Morning', 'Afternoon', 'Evening', 'Economy', 'Business'].map(filter => (
            <button
              key={filter}
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;