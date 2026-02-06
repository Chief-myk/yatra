import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const AvatarPreview = ({ seed, name }) => {
  // Generate deterministic colors based on seed
  const generateColors = (seedStr) => {
    if (!seedStr) return { bg: '#3b82f6', text: '#ffffff' };
    
    const hash = seedStr.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    const hue = Math.abs(hash) % 360;
    return {
      bg: `hsl(${hue}, 70%, 60%)`,
      text: '#ffffff'
    };
  };

  const colors = generateColors(seed);
  const initials = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-6 text-center"
    >
      <h3 className="font-semibold mb-4">Digital Avatar</h3>
      
      <div className="relative inline-block">
        <div 
          className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold mb-4 mx-auto"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {initials}
        </div>
        
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
      
      <p className="text-sm text-gray-600 mb-2">
        This avatar is generated from your name and will be used for biometric verification.
      </p>
      
      <div className="text-xs text-gray-500">
        <div className="flex items-center justify-center gap-2">
          <User size={12} />
          <span>Unique identifier: {seed ? `${seed.substring(0, 8)}...` : 'Not set'}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AvatarPreview;