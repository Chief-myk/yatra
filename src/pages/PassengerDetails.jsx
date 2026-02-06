import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Camera,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

const emptyPassenger = {
  title: "Mr",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  passportNumber: "",
  photo: null,
};

const PassengerDetails = ({ flight }) => {
  const [passengers, setPassengers] = useState([structuredClone(emptyPassenger)]);
  const [activeCameraIndex, setActiveCameraIndex] = useState(null);

  const webcamRef = useRef(null);

  /* ---------------- CAMERA ---------------- */

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setPassengers((prev) =>
      prev.map((p, i) =>
        i === activeCameraIndex ? { ...p, photo: imageSrc } : p
      )
    );

    setActiveCameraIndex(null);
    toast.success("Photo captured successfully");
  };

  /* ---------------- FORM ---------------- */

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      )
    );
  };

  const addPassenger = () => {
    setPassengers((prev) => [...prev, structuredClone(emptyPassenger)]);
  };

  const handleSubmit = () => {
    const invalid = passengers.some(
      (p) =>
        !p.firstName ||
        !p.lastName ||
        !p.email ||
        !p.passportNumber ||
        !p.photo
    );

    if (invalid) {
      toast.error("Please complete all passenger details including photo");
      return;
    }

    const payload = passengers.map((p, i) => ({
      ...p,
      id: `PAX-${Date.now()}-${i}`,
      flightId: flight?.id,
    }));

    localStorage.setItem("passengers", JSON.stringify(payload));
    toast.success("Passenger details saved");

    window.location.href = "/seats";
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-3">
        Passenger Details
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Capture passenger information and face verification
      </p>

      <div className="space-y-10">
        {passengers.map((passenger, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border bg-white shadow-sm p-6"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <User size={20} />
                Passenger {index + 1}
              </h2>

              <button
                onClick={() => setActiveCameraIndex(index)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                <Camera size={16} />
                {passenger.photo ? "Retake Photo" : "Capture Photo"}
              </button>
            </div>

            {/* PHOTO PREVIEW */}
            {passenger.photo && (
              <div className="mb-6 flex justify-center">
                <img
                  src={passenger.photo}
                  alt="Passenger"
                  className="w-32 h-32 rounded-full object-cover border"
                />
              </div>
            )}

            {/* FORM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                className="input"
                placeholder="First Name"
                value={passenger.firstName}
                onChange={(e) =>
                  updatePassenger(index, "firstName", e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Last Name"
                value={passenger.lastName}
                onChange={(e) =>
                  updatePassenger(index, "lastName", e.target.value)
                }
              />

              <input
                type="date"
                className="input"
                value={passenger.dateOfBirth}
                onChange={(e) =>
                  updatePassenger(index, "dateOfBirth", e.target.value)
                }
              />

              <input
                type="email"
                className="input"
                placeholder="Email"
                value={passenger.email}
                onChange={(e) =>
                  updatePassenger(index, "email", e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Phone"
                value={passenger.phone}
                onChange={(e) =>
                  updatePassenger(index, "phone", e.target.value)
                }
              />

              <input
                className="input"
                placeholder="Passport Number"
                value={passenger.passportNumber}
                onChange={(e) =>
                  updatePassenger(index, "passportNumber", e.target.value.toUpperCase())
                }
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
        <button
          onClick={addPassenger}
          className="px-6 py-3 rounded-xl border hover:bg-gray-50"
        >
          + Add Another Passenger
        </button>

        <button
          onClick={handleSubmit}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold flex items-center gap-2"
        >
          <Save size={18} />
          Save & Continue
        </button>
      </div>

      {/* CAMERA MODAL */}
      <AnimatePresence>
        {activeCameraIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full relative"
            >
              <button
                onClick={() => setActiveCameraIndex(null)}
                className="absolute top-4 right-4"
              >
                <X />
              </button>

              <h3 className="text-lg font-semibold mb-4 text-center">
                Capture Passenger Photo
              </h3>

              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="rounded-xl w-full"
                videoConstraints={{ facingMode: "user" }}
              />

              <button
                onClick={capturePhoto}
                className="mt-4 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold"
              >
                Capture Photo
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-3 justify-center">
                <Shield size={14} />
                Secure facial verification
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INPUT STYLE */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #d1d5db;
        }
        .input:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
      `}</style>
    </div>
  );
};

export default PassengerDetails;
