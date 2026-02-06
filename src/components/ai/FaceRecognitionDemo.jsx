import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Brain,
  Cpu,
  Scan,
  Upload,
  Zap,
  BarChart3,
  Target,
  Shield
} from 'lucide-react';
import Lottie from 'react-lottie';
import toast from 'react-hot-toast';
import EducationalTooltip from '../common/EducationalTooltip';

const FaceRecognitionDemo = ({ onVerificationComplete }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [confidenceScore, setConfidenceScore] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const steps = [
    { id: 1, title: 'Face Detection', description: 'Detecting facial features and landmarks', icon: Target },
    { id: 2, title: 'Feature Extraction', description: 'Extracting 128 facial embeddings', icon: Brain },
    { id: 3, title: 'Database Matching', description: 'Comparing with stored biometrics', icon: Cpu },
    { id: 4, title: 'Verification', description: 'Calculating confidence score', icon: Shield },
    { id: 5, title: 'Result', description: 'Authentication complete', icon: CheckCircle },
  ];

  const simulateFaceRecognition = () => {
    setIsScanning(true);
    setVerificationStep(0);
    setConfidenceScore(0);

    // Simulate face recognition process
    const interval = setInterval(() => {
      setVerificationStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          
          // Generate random confidence score between 85-99%
          const finalScore = 85 + Math.floor(Math.random() * 15);
          setConfidenceScore(finalScore);
          
          const isVerified = finalScore > 90;
          setScanResult(isVerified ? 'verified' : 'failed');
          
          setTimeout(() => {
            setIsScanning(false);
            onVerificationComplete(isVerified);
            
            if (isVerified) {
              toast.success('Face verified successfully!', {
                icon: <CheckCircle size={20} />,
              });
            } else {
              toast.error('Face verification failed. Please try again.', {
                icon: <XCircle size={20} />,
              });
            }
          }, 1000);
          
          return prev;
        }
        return prev + 1;
      });

      // Increment confidence score gradually
      setConfidenceScore(prev => Math.min(prev + 20, 95));
    }, 800);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
          <Camera size={32} />
          AI Face Recognition Check-in
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience how facial recognition technology works in modern airports.
          This demo simulates the AI pipeline used for biometric verification.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Camera Simulation */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Scan size={20} />
              Camera Feed Simulation
            </h3>
            
            <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl relative overflow-hidden">
              {/* Simulated camera feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Face outline */}
                  <div className="w-48 h-64 border-2 border-blue-400 rounded-full relative">
                    <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full border-2 border-blue-400"></div>
                    <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full border-2 border-blue-400"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-4 bg-blue-400 rounded-full"></div>
                  </div>
                  
                  {/* Scanning animation */}
                  {isScanning && (
                    <motion.div
                      className="absolute inset-0 border-2 border-green-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                </div>
              </div>

              {/* Status overlay */}
              {isScanning && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black/70 rounded-full text-white"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Zap size={16} />
                    Scanning in progress...
                  </motion.div>
                </div>
              )}
            </div>

            <button
              onClick={simulateFaceRecognition}
              disabled={isScanning}
              className={`w-full mt-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-3
                ${isScanning 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'}`}
            >
              {isScanning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    <Scan size={20} />
                  </motion.div>
                  Scanning Face...
                </>
              ) : (
                <>
                  <Camera size={20} />
                  Start Face Recognition
                  <Zap size={20} />
                </>
              )}
            </button>
          </div>

          {/* Educational Info */}
          <EducationalTooltip
            title="How Face Recognition Works"
            content="Modern systems use deep neural networks to extract facial features and compare them against stored biometric templates."
          >
            <div className="glass-card rounded-2xl p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Brain size={20} />
                AI Pipeline Overview
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Face Detection</p>
                    <p className="text-sm text-gray-600">Locates faces in the camera feed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Cpu size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Feature Extraction</p>
                    <p className="text-sm text-gray-600">Extracts 128-dimensional facial embeddings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <BarChart3 size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Matching</p>
                    <p className="text-sm text-gray-600">Compares with database using cosine similarity</p>
                  </div>
                </div>
              </div>
            </div>
          </EducationalTooltip>
        </div>

        {/* Right Column - Verification Process */}
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Shield size={20} />
              Verification Process
            </h3>

            {/* Progress Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = verificationStep >= index;
                const isCurrent = verificationStep === index;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all
                      ${isActive ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50'}`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      <Icon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{step.title}</h4>
                        {isCurrent && isScanning && (
                          <motion.div
                            className="w-2 h-2 bg-blue-600 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Confidence Score */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <BarChart3 size={18} />
                  Confidence Score
                </h4>
                <span className="text-2xl font-bold text-blue-600">{confidenceScore}%</span>
              </div>
              
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${confidenceScore}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>

            {/* Result Display */}
            <AnimatePresence>
              {scanResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl flex items-center gap-3
                    ${scanResult === 'verified' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'}`}
                >
                  {scanResult === 'verified' ? (
                    <>
                      <CheckCircle size={24} className="text-green-600" />
                      <div>
                        <h4 className="font-semibold text-green-700">Verification Successful</h4>
                        <p className="text-sm text-green-600">Face matched with 98.7% confidence</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={24} className="text-red-600" />
                      <div>
                        <h4 className="font-semibold text-red-700">Verification Failed</h4>
                        <p className="text-sm text-red-600">Confidence score below threshold (86%)</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Security Information */}
          <div className="glass-card rounded-2xl p-6">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Shield size={20} />
              Security & Privacy
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span>Biometric data is encrypted and never stored permanently</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span>Facial templates are one-way hashed for privacy</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span>Complies with GDPR and local data protection laws</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-500 mt-0.5" />
                <span>Real-time anti-spoofing detection prevents fraud</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceRecognitionDemo;