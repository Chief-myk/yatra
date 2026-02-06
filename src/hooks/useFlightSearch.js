import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchFlights = async (params) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock data - In production, this would be a real API call
      const mockFlights = generateMockFlights(params);
      
      if (mockFlights.length === 0) {
        toast.error('No flights found for your search criteria');
      } else {
        toast.success(`Found ${mockFlights.length} flights`);
      }

      setFlights(mockFlights);
    } catch (err) {
      setError('Failed to fetch flights');
      toast.error('Failed to search flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateMockFlights = (params) => {
    // Generate mock flights based on search parameters
    const airlines = ['Air India', 'IndiGo', 'SpiceJet', 'Vistara', 'Go First'];
    const times = ['06:00', '09:30', '12:00', '15:45', '18:30', '21:15'];
    
    return Array.from({ length: 6 }, (_, i) => ({
      id: `FL${Date.now()}${i}`,
      flightNumber: `AI${Math.floor(Math.random() * 900) + 100}`,
      airline: airlines[Math.floor(Math.random() * airlines.length)],
      from: params.from || 'Delhi (DEL)',
      to: params.to || 'Mumbai (BOM)',
      departureTime: times[Math.floor(Math.random() * times.length)],
      arrivalTime: times[Math.floor(Math.random() * times.length)],
      duration: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
      price: Math.floor(Math.random() * 5000) + 2000,
      availableSeats: Math.floor(Math.random() * 50) + 10,
      aircraft: 'Airbus A320',
      status: 'scheduled'
    }));
  };

  return {
    flights,
    loading,
    error,
    searchFlights
  };
};

export default useFlightSearch;