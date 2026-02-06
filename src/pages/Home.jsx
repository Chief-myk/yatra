import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, 
  Shield, 
  Zap, 
  Users,
  Clock,
  Globe,
  ArrowRight,
  Play,
  BookOpen,
  Code,
  Server,
  Cpu,
  Smartphone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import EducationalTooltip from '../components/common/EducationalTooltip';

const Home = () => {
  const features = [
    {
      icon: <Plane size={24} />,
      title: 'Digital Flight Booking',
      description: 'Experience real-time flight search with API integration',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure Passenger Management',
      description: 'Form validation, auto-save, and data encryption',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap size={24} />,
      title: 'Interactive Seat Selection',
      description: 'Real-time seat map with live updates',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: <Users size={24} />,
      title: 'AI Face Recognition',
      description: 'Biometric check-in simulation with confidence scoring',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const learningOutcomes = [
    'React Hooks & State Management',
    'RESTful API Integration',
    'Real-time WebSocket Communication',
    'Form Validation & Error Handling',
    'Responsive UI with Tailwind CSS',
    'Animation with Framer Motion',
    'Database Design with MongoDB',
    'AI/ML Integration Concepts'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-200/20 to-cyan-200/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Plane size={20} className="text-white" />
              </div>
              <span className="font-semibold text-gray-900">Digital Airport Experience</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
              Learn Modern Web Development
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                Through Digi Yatra
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              A production-grade educational platform demonstrating real-world airport digital check-in 
              using React, Node.js, MongoDB, and AI concepts. Built to teach full-stack development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/search">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold flex items-center gap-3 hover:shadow-xl transition-shadow"
                >
                  <Play size={20} />
                  Start Learning Journey
                  <ArrowRight size={20} />
                </motion.button>
              </Link>

              <EducationalTooltip
                title="Project Architecture"
                content="Explore the complete system architecture including frontend, backend, database, and AI services."
              >
                <a
                  href="#features"
                  className="px-8 py-4 bg-white border border-gray-300 rounded-xl font-semibold flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <Code size={20} />
                  View Technology Stack
                </a>
              </EducationalTooltip>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Learning Platform
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From flight booking to biometric check-in, experience every aspect of modern web development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">6</div>
              <div className="text-blue-100">Interactive Modules</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Hours of Learning</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Hands-on Coding</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">4</div>
              <div className="text-blue-100">Real Technologies</div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Outcomes */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              What You'll Learn
            </h2>
            
            <div className="space-y-6">
              {learningOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={20} className="text-blue-600" />
                  </div>
                  <span className="text-lg text-gray-700">{outcome}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold flex items-center gap-3 hover:shadow-xl transition-shadow"
              >
                <BookOpen size={20} />
                Start Learning Now
              </motion.button>
            </Link>
          </div>

          <div>
            <div className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Tech Stack Deep Dive
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Code size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Frontend</h4>
                    <p className="text-gray-600">React, Tailwind CSS, Framer Motion</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Server size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Backend</h4>
                    <p className="text-gray-600">Node.js, Express, MongoDB</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Cpu size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AI/ML</h4>
                    <p className="text-gray-600">Face Recognition, Computer Vision</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Smartphone size={24} className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Deployment</h4>
                    <p className="text-gray-600">Vercel, MongoDB Atlas, CI/CD</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <EducationalTooltip
                  title="Real-World Application"
                  content="This project mimics actual airport systems used by major airlines worldwide."
                >
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Based on real airport systems</span>
                    <Globe size={16} />
                  </div>
                </EducationalTooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="glass-card rounded-3xl p-12 bg-gradient-to-br from-blue-50 to-cyan-50">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Learning?
          </h2>
          
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of students who have accelerated their web development journey 
            through this hands-on, project-based learning experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold flex items-center gap-3 hover:shadow-xl transition-shadow"
              >
                <Play size={20} />
                Start Free Journey
              </motion.button>
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white border border-gray-300 rounded-xl font-semibold flex items-center gap-3 hover:bg-gray-50 transition-colors"
            >
              <Code size={20} />
              View Source Code
            </a>
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>No credit card required • Complete at your own pace • Lifetime access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import missing icon
import { CheckCircle } from 'lucide-react';

export default Home;