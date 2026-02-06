import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="animate-pulse space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
        
        <div className="h-10 bg-gray-300 rounded"></div>
        
        <div className="flex gap-2">
          <div className="h-6 bg-gray-300 rounded flex-1"></div>
          <div className="h-6 bg-gray-300 rounded flex-1"></div>
          <div className="h-6 bg-gray-300 rounded flex-1"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSkeleton;