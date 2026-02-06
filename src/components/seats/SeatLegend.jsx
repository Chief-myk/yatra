import React from 'react';
import { 
  User, 
  Lock, 
  Unlock, 
  Crown,
  DoorOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import EducationalTooltip from '../common/EducationalTooltip';

const SeatLegend = () => {
  const legendItems = [
    {
      icon: <User size={16} className="text-gray-400" />,
      label: 'Occupied',
      description: 'Already booked by another passenger',
      color: 'bg-gray-300',
      status: 'unavailable'
    },
    {
      icon: <Lock size={16} className="text-red-500" />,
      label: 'Locked',
      description: 'Being selected by another user',
      color: 'bg-red-100 border-red-300',
      status: 'locked'
    },
    {
      icon: <CheckCircle size={16} className="text-blue-600" />,
      label: 'Selected',
      description: 'Your current selection',
      color: 'bg-blue-600',
      status: 'selected'
    },
    {
      icon: <Unlock size={16} className="text-green-500" />,
      label: 'Available',
      description: 'Ready for booking',
      color: 'bg-white border-gray-300',
      status: 'available'
    },
    {
      icon: <Crown size={16} className="text-amber-500" />,
      label: 'Premium',
      description: 'Extra legroom & amenities',
      color: 'bg-amber-100 border-amber-300',
      status: 'premium'
    },
    {
      icon: <DoorOpen size={16} className="text-red-500" />,
      label: 'Exit Row',
      description: 'Emergency exit seating',
      color: 'bg-red-50 border-red-200',
      status: 'exit'
    }
  ];

  const seatTypes = [
    { type: 'Window', price: '+₹200', description: 'Better view, more privacy' },
    { type: 'Aisle', price: '+₹100', description: 'Easy access to aisle' },
    { type: 'Middle', price: 'Standard', description: 'Standard seating' },
    { type: 'Exit Row', price: '+₹500', description: 'Extra legroom' },
    { type: 'Premium', price: '+₹1000', description: 'Priority & amenities' }
  ];

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Info size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Seat Legend & Pricing</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Legend Items */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Seat Status</h4>
          <div className="space-y-3">
            {legendItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.label}</span>
                    <EducationalTooltip
                      title={item.label}
                      content={item.description}
                      side="top"
                    >
                      <AlertCircle size={14} className="text-gray-400 cursor-help" />
                    </EducationalTooltip>
                  </div>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seat Types & Pricing */}
        <div>
          <h4 className="font-medium text-gray-700 mb-4">Seat Types & Pricing</h4>
          <div className="space-y-4">
            {seatTypes.map((seat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium">{seat.type}</span>
                  <p className="text-sm text-gray-500">{seat.description}</p>
                </div>
                <span className={`font-bold ${
                  seat.price.includes('+') ? 'text-green-600' : 'text-gray-700'
                }`}>
                  {seat.price}
                </span>
              </div>
            ))}

            <EducationalTooltip
              title="Dynamic Pricing"
              content="Seat prices vary based on demand, flight timing, and availability. Premium seats include additional amenities."
            >
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center gap-2 mb-1">
                  <Info size={16} className="text-blue-600" />
                  <span className="font-medium text-blue-700">Dynamic Pricing</span>
                </div>
                <p className="text-sm text-blue-600">
                  Prices update in real-time based on demand and availability
                </p>
              </div>
            </EducationalTooltip>
          </div>
        </div>
      </div>

      {/* Tips & Information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h5 className="font-medium text-green-700 mb-2 flex items-center gap-2">
              <CheckCircle size={16} />
              Best Value
            </h5>
            <p className="text-sm text-green-600">
              Middle seats offer the best value for budget travelers
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
              <DoorOpen size={16} />
              Exit Row Rules
            </h5>
            <p className="text-sm text-blue-600">
              Must be able to assist in emergency. No children under 15.
            </p>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg">
            <h5 className="font-medium text-amber-700 mb-2 flex items-center gap-2">
              <Crown size={16} />
              Premium Benefits
            </h5>
            <p className="text-sm text-amber-600">
              Priority boarding, extra baggage, and premium meals included
            </p>
          </div>
        </div>
      </div>

      {/* Technical Info */}
      <EducationalTooltip
        title="Real-time Seat Management"
        content="Seat status updates in real-time using WebSocket connections. When you select a seat, it gets temporarily locked to prevent double booking."
      >
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lock size={16} className="text-blue-600" />
            </div>
            <div>
              <h5 className="font-medium text-gray-900">Real-time Seat Locking</h5>
              <p className="text-sm text-gray-600">
                Selected seats are temporarily locked for 2 minutes to prevent conflicts
              </p>
            </div>
          </div>
        </div>
      </EducationalTooltip>
    </div>
  );
};

export default SeatLegend;