import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera,
  CheckCircle,
  XCircle,
  RefreshCw,
  Upload,
  User,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

const SelfCheckin = ({ onVerificationComplete }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [isCameraActive]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user' 
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      toast.error('Camera access denied. Please allow camera permissions.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    setIsCameraActive(false);

    // Start processing
    processVerification();
  };

  const processVerification = () => {
    setIsProcessing(true);
    
    // Start countdown
    let counter = 3;
    const countdownInterval = setInterval(() => {
      setCountdown(counter);
      counter--;
      
      if (counter < 0) {
        clearInterval(countdownInterval);
        // Simulate verification result
        const isVerified = Math.random() > 0.3; // 70% success rate for demo
        setVerificationResult(isVerified);
        setIsProcessing(false);
        
        if (onVerificationComplete) {
          onVerificationComplete(isVerified);
        }
        
        if (isVerified) {
          toast.success('Verification successful! You can proceed.');
        } else {
          toast.error('Verification failed. Please try again.');
        }
      }
    }, 1000);
  };

  const retryVerification = () => {
    setCapturedImage(null);
    setVerificationResult(null);
    setCountdown(3);
    setIsCameraActive(true);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target.result);
      processVerification();
    };
    reader.readAsDataURL(file);
  };

  const VerificationStatus = () => {
    if (!verificationResult && verificationResult !== false) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`p-6 rounded-2xl ${
          verificationResult 
            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
            verificationResult ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {verificationResult ? (
              <CheckCircle size={32} className="text-green-600" />
            ) : (
              <XCircle size={32} className="text-red-600" />
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {verificationResult ? 'Verification Successful!' : 'Verification Failed'}
            </h3>
            <p className="text-gray-600">
              {verificationResult 
                ? 'Your identity has been verified. You can proceed to boarding.' 
                : 'Unable to match your photo. Please try again or use manual check-in.'
              }
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={retryVerification}
            className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={20} />
            Try Again
          </button>
          {verificationResult && (
            <button
              onClick={() => window.location.href = '/boarding'}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all"
            >
              Proceed to Boarding →
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl mb-6 shadow-lg"
          >
            <Camera className="w-5 h-5" />
            <span className="font-bold text-lg">Step 4: Biometric Check-in</span>
          </motion.div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4">
            Face Recognition Check-in
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Use your camera to verify your identity. No documents needed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div>
            <div className="glass-card rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Face Verification
                </h2>
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                  <ShieldCheck size={16} />
                  <span>Secure & Encrypted</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Camera View */}
                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
                  {!capturedImage ? (
                    <>
                      {isCameraActive ? (
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                          <Camera className="w-16 h-16 text-gray-400 mb-4" />
                          <p className="text-gray-400">Camera is inactive</p>
                        </div>
                      )}
                      
                      {/* Face detection overlay */}
                      {isCameraActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-64 h-64 border-2 border-blue-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </>
                  ) : (
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  )}

                  {/* Countdown Overlay */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-2xl">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-white mb-4">{countdown}</div>
                        <div className="text-white text-lg">Verifying your identity...</div>
                        <div className="mt-4">
                          <div className="w-48 h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <canvas ref={canvasRef} className="hidden" />

                {/* Action Buttons */}
                <div className="space-y-4">
                  {!capturedImage ? (
                    <>
                      <button
                        onClick={() => setIsCameraActive(!isCameraActive)}
                        className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-3 ${
                          isCameraActive 
                            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600' 
                            : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
                        }`}
                      >
                        <Camera size={20} />
                        {isCameraActive ? 'Stop Camera' : 'Start Camera'}
                      </button>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                      </div>

                      <label className="block w-full py-4 px-6 bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-xl font-semibold text-gray-700 text-center cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <div className="flex items-center justify-center gap-3">
                          <Upload size={20} />
                          Upload Photo
                        </div>
                      </label>

                      {isCameraActive && (
                        <button
                          onClick={capturePhoto}
                          className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-3"
                        >
                          <Camera size={20} />
                          Capture & Verify
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={retryVerification}
                      className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all flex items-center justify-center gap-3"
                    >
                      <RefreshCw size={20} />
                      Take Another Photo
                    </button>
                  )}
                </div>

                {/* Requirements */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-700">
                    <AlertCircle size={16} />
                    Requirements for best results:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Good lighting facing you</li>
                    <li>• Remove sunglasses or hats</li>
                    <li>• Face the camera directly</li>
                    <li>• Keep a neutral expression</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Status & Info Section */}
          <div className="space-y-8">
            {/* Verification Status */}
            <VerificationStatus />

            {/* Processing Info */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white"
              >
                <h3 className="font-bold text-gray-900 mb-4">Verification Process</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Face Detection</p>
                      <p className="text-sm text-gray-600">Identifying facial features...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <ShieldCheck size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Database Match</p>
                      <p className="text-sm text-gray-600">Comparing with passenger records...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Identity Verification</p>
                      <p className="text-sm text-gray-600">Validating security checks...</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Instructions */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-cyan-50 to-white">
              <h3 className="font-bold text-gray-900 mb-4">How It Works</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">1. Face Detection</div>
                  <p>Our AI detects and analyzes facial features in real-time</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">2. Biometric Match</div>
                  <p>Compares with your passport/ID photo in secure database</p>
                </div>
                <div className="p-3 bg-white rounded-lg">
                  <div className="font-medium text-gray-900 mb-1">3. Instant Verification</div>
                  <p>Get boarding pass in seconds without physical documents</p>
                </div>
              </div>
            </div>

            {/* Security Info */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Privacy & Security</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your facial data is encrypted and only used for verification. 
                    We comply with all data protection regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCheckin;