import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  User, 
  Armchair, 
  Ticket, 
  Camera, 
  CheckCircle 
} from 'lucide-react';

const steps = [
  { id: 1, name: 'Search Flight', icon: Search },
  { id: 2, name: 'Passenger Details', icon: User },
  { id: 3, name: 'Seat Selection', icon: Armchair },
  { id: 4, name: 'Boarding Pass', icon: Ticket },
  { id: 5, name: 'Self Check-in', icon: Camera },
  { id: 6, name: 'Complete', icon: CheckCircle },
];

const ProgressStepper = ({ currentStep }) => {
  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 -z-10" />
      <div 
        className="absolute left-0 top-4 h-0.5 bg-blue-600 -z-10 transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
      
      <div className="flex justify-between">
        {steps.map((step) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center
                  ${isCompleted ? 'bg-blue-600 text-white' : 
                    isCurrent ? 'bg-blue-100 border-2 border-blue-600 text-blue-600' : 
                    'bg-white border-2 border-gray-300 text-gray-400'}`}
              >
                <Icon size={20} />
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
              </motion.div>
              <span className={`mt-2 text-sm font-medium
                ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                {step.name}
              </span>
              <span className="text-xs text-gray-500">Step {step.id}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;