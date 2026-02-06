import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ticket, 
  Download, 
  Printer, 
  Smartphone,
  Share2,
  QrCode,
  Plane,
  Clock,
  MapPin,
  User,
  Shield,
  CheckCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import QRCode from 'qrcode';
import EducationalTooltip from '../components/common/EducationalTooltip';

//const BoardingPass = ({ bookingData, onComplete }) => {
  const BoardingPass = ({ onComplete }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state || {
    passenger: {
      id: 'TEMP123',
      firstName: 'John',
      lastName: 'Doe'
    },
    flight: {
      flightNumber: 'AI101',
      from: 'Delhi',
      to: 'Mumbai',
      departureTime: '14:30',
      arrivalTime: '16:45'
    },
    seat: {
      number: '12A'
    }
  };
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate QR Code
  React.useEffect(() => {
    const generateQR = async () => {
      setIsGenerating(true);
      try {
        const data = JSON.stringify({
          passengerId: bookingData.passenger?.id || 'TEST123',
          flightNumber: bookingData.flight?.flightNumber || 'AI101',
          seat: bookingData.seat?.number || '12A',
          timestamp: new Date().toISOString()
        });

        const url = await QRCode.toDataURL(data, {
          width: 200,
          margin: 2,
          color: {
            dark: '#1e40af',
            light: '#ffffff'
          }
        });
        setQrCodeUrl(url);
      } catch (err) {
        console.error('QR generation failed:', err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateQR();
  }, [bookingData]);

  const handleDownload = () => {
    toast.loading('Generating boarding pass...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Boarding pass downloaded!');
      
      // Simulate download
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = 'boarding-pass.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  const handleAddToWallet = () => {
    toast('Added to Apple Wallet / Google Pay', {
      icon: <Smartphone size={20} />,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Boarding Pass',
        text: `Flight ${bookingData.flight?.flightNumber} - ${bookingData.seat?.number}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
          <Ticket size={32} />
          Digital Boarding Pass
        </h1>
        <p className="text-gray-600">
          Your boarding pass is ready! Scan the QR code at security and boarding gates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Boarding Pass Card */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl overflow-hidden border-2 border-blue-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">BOARDING PASS</h2>
                  <p className="opacity-90">Digi Yatra - Digital Check-in</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{bookingData.flight?.flightNumber || 'AI101'}</div>
                  <div className="text-sm">Flight Number</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Passenger & Flight Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <User size={16} />
                      PASSENGER
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {bookingData.passenger?.firstName || 'John'} {bookingData.passenger?.lastName || 'Doe'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <Plane size={16} />
                      FLIGHT
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">From:</span>
                        <span className="text-lg font-bold">{bookingData.flight?.from || 'DEL'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">To:</span>
                        <span className="text-lg font-bold">{bookingData.flight?.to || 'BOM'}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <Clock size={16} />
                      TIME
                    </h3>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Departure:</span>
                        <span className="font-bold">{bookingData.flight?.departureTime || '14:30'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Arrival:</span>
                        <span className="font-bold">{bookingData.flight?.arrivalTime || '16:45'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative">
                    {isGenerating ? (
                      <div className="w-48 h-48 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      </div>
                    ) : (
                      <>
                        <img 
                          src={qrCodeUrl} 
                          alt="Boarding Pass QR Code" 
                          className="w-48 h-48 border-4 border-white shadow-lg"
                        />
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          SCAN HERE
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {bookingData.seat?.number || '12A'}
                    </div>
                    <div className="text-sm text-gray-600">Seat Number</div>
                  </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <MapPin size={16} />
                      TERMINAL & GATE
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">T3</div>
                        <div className="text-xs text-gray-600">Terminal</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">B12</div>
                        <div className="text-xs text-gray-600">Gate</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">BOARDING TIME</h3>
                    <div className="text-center p-3 bg-amber-50 rounded-xl">
                      <div className="text-2xl font-bold text-amber-600">13:45</div>
                      <div className="text-xs text-gray-600">45 mins before departure</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2">
                      <Shield size={16} />
                      STATUS
                    </h3>
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle size={20} />
                      CHECKED IN
                    </div>
                  </div>
                </div>
              </div>

              {/* Barcode */}
              <div className="mt-8 pt-8 border-t">
                <div className="h-20 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 relative overflow-hidden">
                  {/* Simulated barcode lines */}
                  <div className="absolute inset-0 flex items-center">
                    {Array.from({ length: 80 }, (_, i) => (
                      <div
                        key={i}
                        className="h-full bg-white"
                        style={{
                          width: `${Math.random() * 6 + 2}px`,
                          marginRight: '4px',
                          opacity: Math.random() > 0.2 ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-mono text-sm">
                    {`${bookingData.flight?.flightNumber || 'AI101'} ${bookingData.passenger?.id || 'TEST123'} ${Date.now().toString().slice(-8)}`}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="p-4 bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center hover:bg-gray-50"
            >
              <Download size={24} className="text-blue-600 mb-2" />
              <span className="font-medium">Download</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast('Print simulation - In production, this would open print dialog')}
              className="p-4 bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center hover:bg-gray-50"
            >
              <Printer size={24} className="text-blue-600 mb-2" />
              <span className="font-medium">Print</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToWallet}
              className="p-4 bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center hover:bg-gray-50"
            >
              <Smartphone size={24} className="text-blue-600 mb-2" />
              <span className="font-medium">Add to Wallet</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="p-4 bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center hover:bg-gray-50"
            >
              <Share2 size={24} className="text-blue-600 mb-2" />
              <span className="font-medium">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Educational Section */}
        <div className="space-y-6">
          {/* <EducationalTooltip
            title="QR Code Technology"
            content="QR codes store data in 2D format. This boarding pass QR contains encrypted passenger and flight data that can be scanned by airport systems."
          >
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <QrCode size={20} />
                How QR Codes Work
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <span>Encodes passenger ID, flight details, and seat number</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <span>Scanned at security checkpoints using infrared scanners</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <span>Validates against airline database in real-time</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <span>Updates boarding status automatically</span>
                </li>
              </ul>
            </div>
          </EducationalTooltip> */}

          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Boarding Instructions</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Arrive Early</p>
                  <p className="text-gray-600">Be at the gate 45 minutes before departure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Security Check</p>
                  <p className="text-gray-600">Have your ID and this boarding pass ready</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Digital Only</p>
                  <p className="text-gray-600">No need to print - digital copy is sufficient</p>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // onClick={onComplete}
            onClick={() => navigate('/checkin')}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
          >
            Proceed to Self Check-in →
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BoardingPass;