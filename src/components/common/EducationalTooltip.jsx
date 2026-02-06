import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

const EducationalTooltip = ({ 
  title, 
  content, 
  children, 
  side = 'top',
  width = '300px'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${positionClasses[side]}`}
            style={{ width }}
          >
            <div className="glass-effect rounded-xl p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info size={16} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                  <p className="text-sm text-gray-600">{content}</p>
                  
                  {/* Code snippet example */}
                  {title.includes('API') && (
                    <pre className="mt-2 p-2 bg-gray-800 text-gray-100 rounded text-xs overflow-x-auto">
                      {`fetch('/api/flights')
  .then(res => res.json())
  .then(data => setFlights(data))`}
                    </pre>
                  )}
                  
                  {title.includes('State') && (
                    <pre className="mt-2 p-2 bg-gray-800 text-gray-100 rounded text-xs">
                      {`const [state, setState] = useState(initialValue);
// useState returns [value, setter]`}
                    </pre>
                  )}
                </div>
              </div>
              
              {/* Arrow */}
              <div className={`absolute w-2 h-2 bg-white border-l border-t transform rotate-45
                ${side === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-l border-t' :
                  side === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2 border-r border-b' :
                  side === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2 border-r border-t' :
                  'left-[-4px] top-1/2 -translate-y-1/2 border-l border-b'}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EducationalTooltip;