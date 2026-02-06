// Mock data for flights
export const mockFlights = [
  {
    id: 'FL001',
    flightNumber: 'AI101',
    airline: 'Air India',
    from: 'Delhi (DEL)',
    to: 'Mumbai (BOM)',
    departureTime: '06:00',
    arrivalTime: '08:00',
    duration: '2h 00m',
    price: 4500,
    availableSeats: 45,
    aircraft: 'Airbus A320',
    status: 'scheduled'
  },
  {
    id: 'FL002',
    flightNumber: '6E205',
    airline: 'IndiGo',
    from: 'Delhi (DEL)',
    to: 'Bangalore (BLR)',
    departureTime: '09:30',
    arrivalTime: '12:15',
    duration: '2h 45m',
    price: 5200,
    availableSeats: 32,
    aircraft: 'Airbus A321',
    status: 'scheduled'
  },
  {
    id: 'FL003',
    flightNumber: 'SG301',
    airline: 'SpiceJet',
    from: 'Delhi (DEL)',
    to: 'Chennai (MAA)',
    departureTime: '14:45',
    arrivalTime: '17:30',
    duration: '2h 45m',
    price: 4800,
    availableSeats: 28,
    aircraft: 'Boeing 737',
    status: 'scheduled'
  },
  {
    id: 'FL004',
    flightNumber: 'UK405',
    airline: 'Vistara',
    from: 'Delhi (DEL)',
    to: 'Kolkata (CCU)',
    departureTime: '11:00',
    arrivalTime: '13:15',
    duration: '2h 15m',
    price: 5500,
    availableSeats: 18,
    aircraft: 'Airbus A320neo',
    status: 'scheduled'
  },
  {
    id: 'FL005',
    flightNumber: 'G805',
    airline: 'Go First',
    from: 'Delhi (DEL)',
    to: 'Goa (GOI)',
    departureTime: '16:30',
    arrivalTime: '19:00',
    duration: '2h 30m',
    price: 5100,
    availableSeats: 52,
    aircraft: 'Airbus A320',
    status: 'scheduled'
  },
  {
    id: 'FL006',
    flightNumber: 'AI202',
    airline: 'Air India',
    from: 'Delhi (DEL)',
    to: 'Hyderabad (HYD)',
    departureTime: '20:45',
    arrivalTime: '23:00',
    duration: '2h 15m',
    price: 4200,
    availableSeats: 25,
    aircraft: 'Airbus A319',
    status: 'scheduled'
  }
];

// Seat types and prices
export const seatTypes = {
  window: { name: 'Window', price: 1500, description: 'Extra legroom with view' },
  middle: { name: 'Middle', price: 1200, description: 'Standard seat' },
  aisle: { name: 'Aisle', price: 1300, description: 'Easy access to aisle' },
  exit: { name: 'Exit Row', price: 2500, description: 'Extra legroom' },
  premium: { name: 'Premium', price: 3000, description: 'Priority boarding + meals' }
};

// Form validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9+\-\s()]{10,}$/,
  passport: /^[A-Z0-9]{6,12}$/,
  name: /^[A-Za-z\s]{2,50}$/
};

// Airport codes and cities
export const airports = [
  { code: 'DEL', city: 'Delhi', name: 'Indira Gandhi International' },
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj' },
  { code: 'BLR', city: 'Bangalore', name: 'Kempegowda International' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International' },
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhas Chandra Bose' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International' },
  { code: 'GOI', city: 'Goa', name: 'Goa International' },
  { code: 'COK', city: 'Kochi', name: 'Cochin International' }
];

// AI face recognition thresholds
export const aiThresholds = {
  low: 0.85,
  medium: 0.90,
  high: 0.95,
  excellent: 0.98
};

// Animation variants for Framer Motion
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};