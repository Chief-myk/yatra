import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Filter, MapPin, Search, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FlightCard from "../components/flights/FlightCard";
import LoadingSkeleton from "../components/common/LoadingSkeleton";
import useFlightSearch from "../hooks/useFlightSearch";

const AIRLINES = ["Air India", "IndiGo", "Vistara", "SpiceJet"];
const CITIES = [
  { code: "DEL", name: "Delhi" },
  { code: "BOM", name: "Mumbai" },
  { code: "BLR", name: "Bengaluru" },
  { code: "MAA", name: "Chennai" },
  { code: "HYD", name: "Hyderabad" },
  { code: "CCU", name: "Kolkata" },
  { code: "GOI", name: "Goa" },
  { code: "PNQ", name: "Pune" },
  { code: "JAI", name: "Jaipur" },
  { code: "COK", name: "Kochi" },
];

const SearchFlight = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    from: "DEL",
    to: "BOM",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
  });

  const [sortBy, setSortBy] = useState("price");
  const [filters, setFilters] = useState({
    maxPrice: 10000,
    airlines: [],
    stops: "all",
  });

  const [showSearchForm, setShowSearchForm] = useState(true);

  const { flights, loading, error, searchFlights } = useFlightSearch();

  useEffect(() => {
    if (searchParams.from && searchParams.to) {
      searchFlights({ 
        from: searchParams.from, 
        to: searchParams.to,
        date: searchParams.date
      });
    }
  }, []);

  const handleSelect = (flight) => {
    toast.success(`Flight ${flight.flightNumber} selected`);
    navigate("/passenger", { state: { flight, searchParams } });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchParams.from === searchParams.to) {
      toast.error("Departure and destination cannot be the same");
      return;
    }
    
    searchFlights({ 
      from: searchParams.from, 
      to: searchParams.to,
      date: searchParams.date
    });
    setShowSearchForm(false);
    toast.success("Searching flights...");
  };

  const swapLocations = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  const getCityName = (code) => {
    const city = CITIES.find(c => c.code === code);
    return city ? `${city.name} (${code})` : code;
  };

  /*  FILTER + SORT  */

  const filteredFlights = useMemo(() => {
    let result = flights.filter((flight) => {
      if (flight.price > filters.maxPrice) return false;
      if (
        filters.airlines.length &&
        !filters.airlines.includes(flight.airline)
      )
        return false;
      if (filters.stops === "nonstop" && flight.stops > 0) return false;
      return true;
    });

    result.sort((a, b) =>
      sortBy === "price"
        ? a.price - b.price
        : a.durationMinutes - b.durationMinutes
    );

    return result;
  }, [flights, filters, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* HERO */}
      <section className="relative mb-14 rounded-3xl bg-gradient-to-br from-pink-300 to-indigo-600 p-10 text-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-2 rounded-full mb-6">
            <Plane size={16} />
            <span className="text-sm font-medium">
              Step 1 of 6 • Flight Selection
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Find Your Perfect Flight
          </h1>

          <p className="text-white/90 max-w-xl">
            Compare fares, airlines, and durations — all in one place.
          </p>
        </motion.div>

        <div className="absolute -right-24 -top-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </section>

      {/* SEARCH FORM */}
      {showSearchForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Search size={20} />
              Search Flights
            </h2>
            
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {/* FROM */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <select
                    value={searchParams.from}
                    onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select departure</option>
                    {CITIES.filter(city => city.code !== searchParams.to).map(city => (
                      <option key={city.code} value={city.code}>
                        {city.name} ({city.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* SWAP BUTTON */}
                <div className="flex items-end justify-center">
                  <button
                    type="button"
                    onClick={swapLocations}
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition"
                    title="Swap locations"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* TO */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <select
                    value={searchParams.to}
                    onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select destination</option>
                    {CITIES.filter(city => city.code !== searchParams.from).map(city => (
                      <option key={city.code} value={city.code}>
                        {city.name} ({city.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* DATE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    Date
                  </label>
                  <input
                    type="date"
                    value={searchParams.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* PASSENGERS */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-sm font-medium text-gray-700">
                  Passengers
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchParams({...searchParams, passengers: Math.max(1, searchParams.passengers - 1)})}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="font-medium w-8 text-center">{searchParams.passengers}</span>
                  <button
                    type="button"
                    onClick={() => setSearchParams({...searchParams, passengers: searchParams.passengers + 1})}
                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* SEARCH BUTTON */}
              <button
                type="submit"
                disabled={!searchParams.from || !searchParams.to}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Search Flights
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* EDIT SEARCH BAR */}
      {!showSearchForm && (
        <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-600" />
                <div>
                  <span className="font-bold text-lg">
                    {getCityName(searchParams.from)} → {getCityName(searchParams.to)}
                  </span>
                  <p className="text-sm text-gray-600">
                    {new Date(searchParams.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })} • {searchParams.passengers} passenger{searchParams.passengers > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowSearchForm(true)}
              className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm font-medium"
            >
              Edit Search
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* FILTERS - Only show when we have results */}
        {!showSearchForm && filteredFlights.length > 0 && (
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 font-semibold mb-6">
                <Filter size={18} />
                Filters
              </h3>

              {/* PRICE */}
              <div className="mb-6">
                <label className="font-medium text-sm block mb-2">
                  Max Price
                </label>
                <input
                  type="range"
                  min={0}
                  max={10000}
                  step={500}
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({ ...filters, maxPrice: +e.target.value })
                  }
                  className="w-full accent-blue-600"
                />
                <div className="text-sm text-gray-500 mt-1">
                  Up to ₹{filters.maxPrice}
                </div>
              </div>

              {/* AIRLINES */}
              <div className="mb-6">
                <label className="font-medium text-sm block mb-3">
                  Airlines
                </label>
                <div className="space-y-2">
                  {AIRLINES.map((airline) => (
                    <label
                      key={airline}
                      className="flex items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={filters.airlines.includes(airline)}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            airlines: e.target.checked
                              ? [...filters.airlines, airline]
                              : filters.airlines.filter((a) => a !== airline),
                          })
                        }
                      />
                      {airline}
                    </label>
                  ))}
                </div>
              </div>

              {/* STOPS */}
              <div>
                <label className="font-medium text-sm block mb-3">Stops</label>
                <div className="flex gap-2">
                  {["all", "nonstop"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilters({ ...filters, stops: s })}
                      className={`flex-1 rounded-xl px-3 py-2 text-sm transition ${
                        filters.stops === s
                          ? "bg-blue-600 text-white"
                          : "border hover:bg-gray-50"
                      }`}
                    >
                      {s === "all" ? "All" : "Non-stop"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* RESULTS */}
        <main className={!showSearchForm && filteredFlights.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
          {/* TOOLBAR - Only show when we have results */}
          {!showSearchForm && filteredFlights.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-white p-4 mb-6 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-600" />
                <span className="font-medium">
                  {getCityName(searchParams.from)} → {getCityName(searchParams.to)}
                </span>
                <span className="text-sm text-gray-500">
                  {filteredFlights.length} flight{filteredFlights.length !== 1 ? 's' : ''} found
                </span>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                <option value="price">Lowest Price</option>
                <option value="duration">Shortest Duration</option>
              </select>
            </div>
          )}

          {/* CONTENT */}
          {showSearchForm ? (
            <div className="text-center py-16 bg-gray-50 rounded-2xl border">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Search size={28} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search for Flights</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Enter your departure and destination cities, select a date, and find the best flights for your journey.
              </p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <h3 className="text-lg font-semibold mb-2">
                Something went wrong
              </h3>
              <p className="text-gray-500">{error}</p>
              <button
                onClick={() => setShowSearchForm(true)}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            </div>
          ) : filteredFlights.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <Search size={28} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No flights found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                We couldn't find any flights matching your criteria for {getCityName(searchParams.from)} to {getCityName(searchParams.to)} on {new Date(searchParams.date).toLocaleDateString()}.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowSearchForm(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Modify Search
                </button>
                <button
                  onClick={() => setFilters({ maxPrice: 10000, airlines: [], stops: "all" })}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredFlights.map((flight) => (
                  <motion.div
                    key={flight.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ y: -6 }}
                  >
                    <FlightCard
                      flight={flight}
                      onSelect={() => handleSelect(flight)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchFlight;