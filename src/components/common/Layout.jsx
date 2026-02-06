import React from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { 
  GraduationCap, 
  Home,
  Menu,
  X
} from 'lucide-react';
import ProgressStepper from './ProgressStepper';
import EducationalTooltip from './EducationalTooltip';

const Layout = ({ children, currentStep }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
      
      {/* Fixed Navbar with proper z-index and spacing */}
      <header className={`glass-card fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Digi Yatra</h1>
                <p className="text-sm text-gray-600">Digital Airport Experience</p>
              </div>
            </motion.div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              {/* <EducationalTooltip
                title="Project Architecture"
                content="This is a full-stack React application with Node.js backend. Learn how components communicate with APIs and database."
                side="left"
              >
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                  <GraduationCap size={16} />
                  Learn Architecture
                </button>
              </EducationalTooltip> */}
            </div>
          </div>
        </div>
      </header>

      {/* Main content with padding to prevent overlap */}
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        <ProgressStepper currentStep={currentStep} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {children}
        </motion.div>
      </main>

      <footer className="mt-12 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p className="flex items-center justify-center gap-2">
            <GraduationCap size={16} />
            Built for educational purposes • Demonstrates modern web development with AI concepts
          </p>
        </div>
      </footer>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
            className="absolute right-0 top-0 h-full w-64 bg-white shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                    <GraduationCap className="text-white" size={18} />
                  </div>
                  <span className="font-bold text-gray-900">Digi Yatra</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <nav className="space-y-4">
                <a 
                  href="#" 
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Home size={20} />
                  <span>Dashboard</span>
                </a>
                <EducationalTooltip
                  title="Project Architecture"
                  content="This is a full-stack React application with Node.js backend."
                  side="left"
                >
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                    <GraduationCap size={20} />
                    <span>Learn Architecture</span>
                  </button>
                </EducationalTooltip>
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Layout;