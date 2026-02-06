import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Armchair,
  Lock,
  Unlock,
  Crown,
  DoorOpen,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Info,
  Users,
  Clock,
  DollarSign,
  Plane,
  MapPin,
  Calendar,
  Shield,
  XCircle,
  UserPlus,
  Trash2,
  Ticket,
  Hash,
  Users as UsersIcon,
  Clock as ClockIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get flight data and search params from navigation state
  const { flight, searchParams } = location.state || {};
  
  // Default flight data in case navigation is direct
  const defaultFlight = {
    id: 'TEMP123',
    airline: 'Air India',
    flightNumber: 'AI201',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    departureTime: '10:30 AM',
    arrivalTime: '12:45 PM',
    duration: '2h 15m',
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }),
    gate: 'B12',
    price: 4500,
    stops: 0
  };

  const flightData = flight || defaultFlight;
  const searchData = searchParams || {
    from: 'DEL',
    to: 'BOM',
    date: new Date().toISOString().split('T')[0],
    passengers: 1
  };

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [seatLocked, setSeatLocked] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [groupSelection, setGroupSelection] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      generateSeatMap();
      setLoading(false);
    }, 1000);
  }, []);

  const generateSeatMap = () => {
    const seatMap = [];
    const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatTypes = ['window', 'middle', 'aisle', 'aisle', 'middle', 'window'];
    
    // Calculate total seats based on number of passengers
    const totalRows = Math.max(20, Math.ceil(searchData.passengers / 6) * 4);
    
    for (let row = 1; row <= totalRows; row++) {
      for (let col = 0; col < 6; col++) {
        const seatNumber = `${row}${seatLetters[col]}`;
        const isExitRow = row === Math.floor(totalRows/2) || row === Math.floor(totalRows/2) + 1;
        const isPremium = row <= 4 || (flightData.price > 8000 && row <= 8);
        const basePrice = flightData.price || 4500;
        const seatPrice = isPremium ? Math.round(basePrice * 1.5) : 
                         isExitRow ? Math.round(basePrice * 1.2) : 
                         Math.round(basePrice * 0.9);
        
        const isOccupied = Math.random() > 0.7;
        const isLocked = !isOccupied && Math.random() > 0.85 && selectedSeats.length === 0;
        
        seatMap.push({
          id: `${flightData.id}-${seatNumber}`,
          number: seatNumber,
          type: seatTypes[col],
          row,
          letter: seatLetters[col],
          price: seatPrice,
          isExitRow,
          isPremium,
          isOccupied,
          isLocked,
          section: col < 3 ? 'left' : 'right',
        });
      }
    }
    
    setSeats(seatMap);
  };

  const handleSeatSelect = (seat) => {
    if (seat.isOccupied) {
      toast.error('Seat already taken!');
      return;
    }

    if (seatLocked && !selectedSeats.some(s => s.id === seat.id)) {
      toast.error('Complete current selection first');
      return;
    }

    // Check if we've reached passenger limit
    if (selectedSeats.length >= searchData.passengers && !selectedSeats.some(s => s.id === seat.id)) {
      toast.error(`You can only select ${searchData.passengers} seat(s) for ${searchData.passengers} passenger(s)`);
      return;
    }

    const isAlreadySelected = selectedSeats.some(s => s.id === seat.id);
    
    if (isAlreadySelected) {
      // Deselect the seat
      setSelectedSeats(prev => prev.filter(s => s.id !== seat.id));
      toast(`Seat ${seat.number} removed`, {
        icon: '🗑️',
      });
    } else {
      // Select the seat
      setSelectedSeats(prev => [...prev, seat]);
      setSeatLocked(true);
      
      toast.success(`Seat ${seat.number} added!`, {
        icon: <CheckCircle className="text-green-500" />,
      });
    }
  };

  const handleGroupSelection = (seatsToSelect) => {
    const availableSeats = seatsToSelect.filter(seat => 
      !seat.isOccupied && 
      !selectedSeats.some(s => s.id === seat.id)
    );
    
    // Limit to remaining passenger count
    const remainingSeats = Math.max(0, searchData.passengers - selectedSeats.length);
    const seatsToAdd = availableSeats.slice(0, remainingSeats);
    
    if (seatsToAdd.length === 0) {
      toast.error('No available seats in this group or passenger limit reached');
      return;
    }
    
    setSelectedSeats(prev => [...prev, ...seatsToAdd]);
    setSeatLocked(true);
    
    toast.success(`Added ${seatsToAdd.length} seat(s) to selection`);
  };

  const confirmSelection = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    if (selectedSeats.length !== searchData.passengers) {
      toast.error(`Please select exactly ${searchData.passengers} seat(s) for ${searchData.passengers} passenger(s)`);
      return;
    }

    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    
    toast.success(`${selectedSeats.length} seat(s) confirmed! Total: ₹${totalPrice}`);
    setSeatLocked(false);
    
    setTimeout(() => {
      navigate('/boarding', { 
        state: { 
          flight: flightData, 
          seats: selectedSeats,
          searchParams: searchData,
          totalPrice: totalPrice
        } 
      });
    }, 1200);
  };

  const cancelSelection = () => {
    setSelectedSeats([]);
    setSeatLocked(false);
    toast('All seats deselected', {
      icon: '🔄',
    });
  };

  const clearSelection = () => {
    setSelectedSeats([]);
    toast('Selection cleared');
  };

  const SeatIcon = ({ type, isSelected, isOccupied, isLocked }) => {
    const baseClasses = "w-full h-full transition-all duration-300";
    
    if (isOccupied) {
      return (
        <div className={`${baseClasses} bg-gradient-to-br from-red-500 to-red-600 text-white`}>
          <XCircle className="w-6 h-6 m-auto mt-2" />
        </div>
      );
    }

    if (isSelected) {
      return (
        <div className={`${baseClasses} bg-gradient-to-br from-blue-500 to-blue-600 text-white`}>
          <CheckCircle className="w-6 h-6 m-auto mt-2" />
        </div>
      );
    }

    if (isLocked) {
      return (
        <div className={`${baseClasses} bg-gradient-to-br from-yellow-400 to-yellow-500 text-white`}>
          <Lock className="w-5 h-5 m-auto mt-3" />
        </div>
      );
    }

    return (
      <div className={`${baseClasses} bg-gradient-to-br from-green-400 to-emerald-500 text-white`}>
        <Armchair className="w-6 h-6 m-auto mt-2" />
      </div>
    );
  };

  const SeatRow = ({ rowNumber }) => {
    const rowSeats = seats.filter(seat => seat.row === rowNumber);
    
    return (
      <div className="flex items-center gap-8">
        <div className="w-10 text-center font-bold text-gray-700">{rowNumber}</div>
        
        <div className="flex gap-4">
          {/* Left section (A, B, C) */}
          <div className="flex gap-2">
            {rowSeats.filter(s => ['A', 'B', 'C'].includes(s.letter)).map(seat => (
              <SeatButton key={seat.id} seat={seat} />
            ))}
          </div>
          
          {/* Aisle space */}
          <div className="w-12 bg-gradient-to-b from-blue-50 to-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500">AISLE</span>
          </div>
          
          {/* Right section (D, E, F) */}
          <div className="flex gap-2">
            {rowSeats.filter(s => ['D', 'E', 'F'].includes(s.letter)).map(seat => (
              <SeatButton key={seat.id} seat={seat} />
            ))}
          </div>
        </div>
        
        <div className="w-10 text-center font-bold text-gray-700">{rowNumber}</div>
      </div>
    );
  };

  const SeatButton = ({ seat }) => {
    const isSelected = selectedSeats.some(s => s.id === seat.id);
    
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleSeatSelect(seat)}
        disabled={seat.isOccupied}
        className={`relative w-16 h-16 rounded-xl overflow-hidden shadow-lg ${
          seat.isOccupied ? 'cursor-not-allowed' : 'cursor-pointer'
        } ${isSelected ? 'ring-4 ring-blue-400 ring-offset-2' : ''}`}
      >
        <SeatIcon 
          type={seat.type}
          isSelected={isSelected}
          isOccupied={seat.isOccupied}
          isLocked={seat.isLocked && !isSelected}
        />
        
        <div className="absolute bottom-1 left-0 right-0 text-center">
          <span className="text-sm font-bold tracking-wide">
            {seat.number}
          </span>
        </div>
        
        {seat.isPremium && (
          <div className="absolute top-1 left-1">
            <Crown className="w-3 h-3 text-yellow-400" />
          </div>
        )}
        
        {seat.isExitRow && (
          <div className="absolute top-1 right-1">
            <DoorOpen className="w-3 h-3 text-red-400" />
          </div>
        )}
      </motion.button>
    );
  };

  const GroupSelectionButtons = () => {
    const getRowSeats = (row) => seats.filter(s => s.row === row);
    const getAdjacentSeats = (startSeat, count) => {
      const rowSeats = getRowSeats(startSeat.row);
      const seatIndex = rowSeats.findIndex(s => s.id === startSeat.id);
      return rowSeats.slice(seatIndex, seatIndex + count);
    };

    return (
      <div className="grid grid-cols-2 gap-3 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const windowSeats = seats.filter(s => 
              !s.isOccupied && s.type === 'window' && !selectedSeats.some(sel => sel.id === s.id)
            ).slice(0, 2);
            if (windowSeats.length > 0) {
              const seatsToAdd = windowSeats.slice(0, searchData.passengers - selectedSeats.length);
              if (seatsToAdd.length > 0) {
                setSelectedSeats(prev => [...prev, ...seatsToAdd]);
                toast.success(`Added ${seatsToAdd.length} window seat(s)`);
              }
            }
          }}
          className="p-3 bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-200 rounded-xl text-blue-700 flex items-center gap-2"
        >
          <Armchair className="w-4 h-4" />
          <span className="text-sm font-medium">Add Window Seats</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const availableRow = seats.find(s => 
              !s.isOccupied && !selectedSeats.some(sel => sel.id === s.id)
            )?.row;
            if (availableRow) {
              const rowSeats = getRowSeats(availableRow).filter(s => !s.isOccupied);
              const seatsToAdd = rowSeats.slice(0, searchData.passengers - selectedSeats.length);
              if (seatsToAdd.length > 0) {
                setSelectedSeats(prev => [...prev, ...seatsToAdd]);
                toast.success(`Added ${seatsToAdd.length} seat(s) from row ${availableRow}`);
              }
            }
          }}
          className="p-3 bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2"
        >
          <Hash className="w-4 h-4" />
          <span className="text-sm font-medium">Select Row</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const familySeats = seats.filter(s => 
              !s.isOccupied && 
              (s.type === 'window' || s.type === 'aisle') &&
              !selectedSeats.some(sel => sel.id === s.id)
            ).slice(0, 4);
            const seatsToAdd = familySeats.slice(0, searchData.passengers - selectedSeats.length);
            if (seatsToAdd.length >= 2) {
              setSelectedSeats(prev => [...prev, ...seatsToAdd]);
              toast.success(`Added ${seatsToAdd.length} family seat(s)`);
            }
          }}
          className="p-3 bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 rounded-xl text-purple-700 flex items-center gap-2"
        >
          <UsersIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Family Seats</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            const exitSeats = seats.filter(s => 
              !s.isOccupied && s.isExitRow && !selectedSeats.some(sel => sel.id === s.id)
            ).slice(0, 2);
            const seatsToAdd = exitSeats.slice(0, searchData.passengers - selectedSeats.length);
            if (seatsToAdd.length > 0) {
              setSelectedSeats(prev => [...prev, ...seatsToAdd]);
              toast.success(`Added ${seatsToAdd.length} exit row seat(s)`);
            }
          }}
          className="p-3 bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 rounded-xl text-orange-700 flex items-center gap-2"
        >
          <DoorOpen className="w-4 h-4" />
          <span className="text-sm font-medium">Exit Row Seats</span>
        </motion.button>
      </div>
    );
  };

  // Format the date from search params
  const formatDate = (dateString) => {
    if (!dateString) return flightData.date;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get city name from code
  const getCityName = (code) => {
    const cityCodes = {
      'DEL': 'Delhi',
      'BOM': 'Mumbai',
      'BLR': 'Bengaluru',
      'MAA': 'Chennai',
      'HYD': 'Hyderabad',
      'CCU': 'Kolkata',
      'GOI': 'Goa',
      'PNQ': 'Pune',
      'JAI': 'Jaipur',
      'COK': 'Kochi'
    };
    return cityCodes[code] || code;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl mb-6 shadow-lg">
            <Armchair className="w-5 h-5" />
            <span className="font-bold text-lg">Step 3: Seat Selection</span>
            {selectedSeats.length > 0 && (
              <span className="ml-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                {selectedSeats.length} of {searchData.passengers} seat(s) selected
              </span>
            )}
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4">
            Choose Your Seats
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Select {searchData.passengers} seat(s) for your journey. Green seats are available, red are occupied.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Seat Map Area */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-6 shadow-2xl"
            >
              {/* Flight Header - Shows actual flight data */}
              <div className="flex items-center justify-between mb-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {flightData.airline} • {flightData.flightNumber}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-600 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {getCityName(searchData.from)} ({searchData.from})
                    </span>
                    <ArrowRightIcon className="w-4 h-4" />
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {getCityName(searchData.to)} ({searchData.to})
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(searchData.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <UsersIcon className="w-4 h-4" />
                      {searchData.passengers} Passenger{searchData.passengers > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => generateSeatMap()}
                    className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg"
                  >
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                  </motion.button>
                  
                  <div className="flex items-center gap-2 bg-white rounded-xl p-2 shadow-md">
                    <button
                      onClick={() => setZoom(z => Math.max(z - 0.1, 0.7))}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-medium px-2">{Math.round(zoom * 100)}%</span>
                    <button
                      onClick={() => setZoom(z => Math.min(z + 0.1, 1.5))}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Group Selection Controls */}
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">
                      Group Selection Tools • {searchData.passengers} Passenger{searchData.passengers > 1 ? 's' : ''}
                    </h3>
                  </div>
                  <button
                    onClick={() => setGroupSelection(!groupSelection)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {groupSelection ? 'Hide Tools' : 'Show Tools'}
                  </button>
                </div>
                
                <AnimatePresence>
                  {groupSelection && <GroupSelectionButtons />}
                </AnimatePresence>
              </div>

              {/* Aircraft Visualization */}
              <div className="mb-8">
                <div className="relative">
                  {/* Cockpit */}
                  <div className="w-32 h-16 bg-gradient-to-r from-gray-700 to-gray-800 rounded-t-2xl mx-auto mb-4 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Plane className="w-8 h-8 text-blue-300" />
                    </div>
                  </div>
                  
                  {/* Seat Map Container */}
                  <div 
                    className="relative bg-gradient-to-b from-gray-100 to-white rounded-3xl p-8 shadow-inner"
                    style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
                  >
                    {/* Cabin Section Labels */}
                    <div className="flex justify-between mb-6">
                      <div className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
                        {flightData.price > 8000 ? 'Business Class' : 'Premium Economy'}
                      </div>
                      <div className="px-6 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                        Economy Class
                      </div>
                    </div>

                    {/* Seats Grid */}
                    {loading ? (
                      <div className="h-96 flex items-center justify-center">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                          <p className="text-gray-600">Loading interactive seat map for {flightData.flightNumber}...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {[...Array(Math.max(20, Math.ceil(searchData.passengers / 6) * 4))].map((_, i) => (
                          <SeatRow key={i + 1} rowNumber={i + 1} />
                        ))}
                      </div>
                    )}

                    {/* Exit Row Indicators */}
                    <div className="mt-10 flex justify-center gap-12">
                      <div className="text-center">
                        <div className="w-32 h-2 bg-red-400 mx-auto mb-2 rounded-full"></div>
                        <span className="text-sm font-semibold text-red-600 flex items-center gap-1">
                          <DoorOpen className="w-4 h-4" />
                          Emergency Exit Row
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Panel */}
              <AnimatePresence>
                {selectedSeats.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-6 p-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">
                          {selectedSeats.length} of {searchData.passengers} Seat{selectedSeats.length > 1 ? 's' : ''} Selected
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                            <DollarSign className="w-4 h-4" />
                            <span className="font-bold">
                              ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
                            </span>
                          </span>
                          <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                            <Ticket className="w-4 h-4" />
                            <span>{selectedSeats.length} Ticket{selectedSeats.length > 1 ? 's' : ''}</span>
                          </span>
                          {selectedSeats.length < searchData.passengers && (
                            <span className="flex items-center gap-2 bg-yellow-500/50 px-3 py-1 rounded-full">
                              <Info className="w-4 h-4" />
                              <span>Select {searchData.passengers - selectedSeats.length} more</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={clearSelection}
                        className="p-2 hover:bg-white/20 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </div>

                    {/* Selected Seats List */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                      {selectedSeats.map((seat, index) => (
                        <div key={seat.id} className="bg-white/20 rounded-xl p-3 flex items-center justify-between">
                          <div>
                            <div className="font-bold text-lg">Seat {seat.number}</div>
                            <div className="text-sm text-blue-100 flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ₹{seat.price} • {seat.type}
                            </div>
                          </div>
                          <button
                            onClick={() => handleSeatSelect(seat)}
                            className="p-1 hover:bg-white/30 rounded"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={cancelSelection}
                        className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 flex-1"
                      >
                        Clear All Seats
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={confirmSelection}
                        disabled={selectedSeats.length !== searchData.passengers}
                        className={`px-8 py-3 font-bold rounded-xl shadow-lg flex-1 ${
                          selectedSeats.length === searchData.passengers
                            ? 'bg-white text-blue-600 hover:bg-gray-100'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {selectedSeats.length === searchData.passengers
                          ? `Confirm ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''}`
                          : `Select ${searchData.passengers - selectedSeats.length} More`}
                      </motion.button>
                    </div>

                    {seatLocked && (
                      <div className="mt-4 flex items-center gap-2 text-blue-100">
                        <Lock className="w-4 h-4" />
                        <span>Seats locked for you. Complete booking within 2 minutes.</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Legend Toggle */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowLegend(!showLegend)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:shadow-lg transition-shadow"
              >
                <Info className="w-5 h-5" />
                {showLegend ? 'Hide Legend' : 'Show Seat Legend'}
              </button>
            </div>

            {/* Legend Panel */}
            <AnimatePresence>
              {showLegend && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Available', color: 'from-green-400 to-emerald-500', icon: <Armchair /> },
                      { label: 'Occupied', color: 'from-red-500 to-red-600', icon: <XCircle /> },
                      { label: 'Selected', color: 'from-blue-500 to-blue-600', icon: <CheckCircle /> },
                      { label: 'Locked', color: 'from-yellow-400 to-yellow-500', icon: <Lock /> },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-xl shadow-md flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color}`}>
                          <div className="w-full h-full flex items-center justify-center text-white">
                            {item.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.label}</h4>
                          <p className="text-sm text-gray-600">Seat status</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Flight Card with actual data */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white shadow-xl"
            >
              <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                <Plane className="w-6 h-6 text-blue-600" />
                Flight Summary
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600">Flight</span>
                  <span className="font-bold text-blue-700">{flightData.flightNumber}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600">Airline</span>
                  <span className="font-bold">{flightData.airline}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600">Departure</span>
                  <span className="font-bold">{flightData.departureTime}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-bold flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {flightData.duration}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-bold flex items-center gap-1">
                    <UsersIcon className="w-4 h-4" />
                    {searchData.passengers}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600">Date</span>
                  <span className="font-bold">{formatDate(searchData.date)}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white rounded-xl">
                  <span className="text-gray-600">Available Seats</span>
                  <span className="font-bold text-green-600">
                    {seats.filter(s => !s.isOccupied && !s.isLocked).length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Selection Summary */}
            {selectedSeats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-2xl p-6 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl"
              >
                <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <Ticket className="w-6 h-6 text-green-600" />
                  Your Selection
                </h3>
                
                <div className="space-y-3">
                  {selectedSeats.map((seat, index) => (
                    <div key={seat.id} className="flex items-center justify-between p-3 bg-white rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">Seat {seat.number}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            {seat.type} • Row {seat.row}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-green-700">₹{seat.price}</div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-2xl text-green-700">
                        ₹{selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {selectedSeats.length} of {searchData.passengers} seat{searchData.passengers > 1 ? 's' : ''} selected
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 bg-gradient-to-br from-cyan-50 to-white shadow-xl"
            >
              <h3 className="font-bold text-xl text-gray-900 mb-6">Quick Actions</h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const windowSeats = seats.filter(s => 
                      !s.isOccupied && !s.isLocked && s.type === 'window'
                    ).slice(0, 2);
                    const seatsToAdd = windowSeats.slice(0, Math.max(0, searchData.passengers - selectedSeats.length));
                    if (seatsToAdd.length > 0) {
                      setSelectedSeats(prev => [...prev, ...seatsToAdd]);
                      setSeatLocked(true);
                      toast.success(`Added ${seatsToAdd.length} window seat(s)`);
                    } else {
                      toast.error('No window seats available or limit reached');
                    }
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl flex items-center justify-center gap-3 hover:shadow-lg"
                >
                  <Armchair className="w-5 h-5" />
                  Add Window Seats
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const aisleSeats = seats.filter(s => 
                      !s.isOccupied && !s.isLocked && s.type === 'aisle'
                    ).slice(0, 2);
                    const seatsToAdd = aisleSeats.slice(0, Math.max(0, searchData.passengers - selectedSeats.length));
                    if (seatsToAdd.length > 0) {
                      setSelectedSeats(prev => [...prev, ...seatsToAdd]);
                      setSeatLocked(true);
                      toast.success(`Added ${seatsToAdd.length} aisle seat(s)`);
                    } else {
                      toast.error('No aisle seats available or limit reached');
                    }
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl flex items-center justify-center gap-3 hover:shadow-lg"
                >
                  <DoorOpen className="w-5 h-5" />
                  Add Aisle Seats
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/passenger', { state: { flight: flightData, searchParams: searchData } })}
                  className="w-full px-6 py-4 bg-white border-2 border-blue-200 text-blue-600 rounded-xl flex items-center justify-center gap-3 hover:bg-blue-50"
                >
                  <ArrowLeftIcon className="w-5 h-5" />
                  Back to Passenger Details
                </motion.button>
              </div>
            </motion.div>

            {/* Seat Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl"
            >
              <h3 className="font-bold text-xl text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-purple-600" />
                Smart Tips
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <UsersIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{searchData.passengers} Passenger{searchData.passengers > 1 ? 's' : ''}</h4>
                    <p className="text-sm text-gray-600">Select exactly {searchData.passengers} seat{searchData.passengers > 1 ? 's' : ''}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold">G</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Group Booking</h4>
                    <p className="text-sm text-gray-600">Use group tools for faster selection</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-white/50 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-bold">2m</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Time Lock</h4>
                    <p className="text-sm text-gray-600">Seats are locked for 2 minutes</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;