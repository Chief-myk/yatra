import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle,
  Clock,
  Users,
  Shield,
  Zap,
  BarChart3,
  TrendingUp,
  Award,
  Download,
  Share2,
  Home,
  Repeat,
  BookOpen,
  Code,
  Server,
  Database,
  Cpu
} from 'lucide-react';
import EducationalTooltip from '../components/common/EducationalTooltip';

const Dashboard = ({ bookingData }) => {
  const stats = [
    { label: 'Time Saved', value: '15 mins', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Paper Saved', value: '3 pages', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Security Score', value: '98%', icon: Shield, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Efficiency', value: '4.8/5', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
  ];

  const journeySteps = [
    { 
      step: 1, 
      title: 'Flight Search', 
      description: 'API integration with real-time filtering',
      time: '45s',
      icon: Search
    },
    { 
      step: 2, 
      title: 'Passenger Details', 
      description: 'Form validation & auto-save',
      time: '2m 30s',
      icon: User
    },
    { 
      step: 3, 
      title: 'Seat Selection', 
      description: 'Interactive seat map with real-time updates',
      time: '1m 15s',
      icon: Armchair
    },
    { 
      step: 4, 
      title: 'Boarding Pass', 
      description: 'QR code generation & digital wallet',
      time: '30s',
      icon: Ticket
    },
    { 
      step: 5, 
      title: 'Biometric Check-in', 
      description: 'AI facial recognition simulation',
      time: '1m',
      icon: Camera
    },
  ];

  const learningOutcomes = [
    {
      category: 'Frontend Development',
      topics: [
        'React Hooks & State Management',
        'Component Composition',
        'Form Validation',
        'API Integration',
        'Responsive Design'
      ]
    },
    {
      category: 'Backend & Database',
      topics: [
        'RESTful API Design',
        'MongoDB Schema Design',
        'Data Validation',
        'Authentication',
        'Real-time Updates'
      ]
    },
    {
      category: 'AI/ML Concepts',
      topics: [
        'Face Recognition Pipeline',
        'Feature Extraction',
        'Biometric Security',
        'Confidence Scoring',
        'Real-world Applications'
      ]
    },
    {
      category: 'DevOps & Deployment',
      topics: [
        'Vercel Deployment',
        'Environment Variables',
        'Performance Optimization',
        'Security Best Practices',
        'Monitoring & Logging'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={48} className="text-white" />
        </motion.div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Digital Check-in Complete! 🎉
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          You've successfully experienced the complete Digi Yatra journey
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon size={24} className={stat.color} />
              </div>
              <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Journey Timeline */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Clock size={28} />
            Your Digital Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-200"></div>

            {journeySteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6 mb-8 last:mb-0"
                >
                  {/* Step circle */}
                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${index === journeySteps.length - 1 
                        ? 'bg-green-100 border-2 border-green-300' 
                        : 'bg-blue-100 border-2 border-blue-300'}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
                        ${index === journeySteps.length - 1 ? 'bg-green-500' : 'bg-blue-500'}`}
                      >
                        <Icon size={16} className="text-white" />
                      </div>
                    </div>
                    {index !== journeySteps.length - 1 && (
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                        {step.time}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="glass-card rounded-xl p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          Step {step.step}: {step.title}
                        </h3>
                        <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      
                      <EducationalTooltip
                        title="Technical Implementation"
                        content={`This step demonstrates: 
                        ${step.title === 'Flight Search' ? 'API calls with axios/fetch' :
                          step.title === 'Passenger Details' ? 'Form state management with validation' :
                          step.title === 'Seat Selection' ? 'WebSocket simulation for real-time updates' :
                          step.title === 'Boarding Pass' ? 'QR code generation and mobile integration' :
                          'Face recognition AI pipeline simulation'}`}
                      >
                        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <Code size={14} />
                          View Code Concept
                        </button>
                      </EducationalTooltip>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Learning Outcomes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Award size={28} />
            What You've Learned
          </h2>

          <div className="space-y-6">
            {learningOutcomes.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                  {category.category === 'Frontend Development' && <Code size={20} />}
                  {category.category === 'Backend & Database' && <Database size={20} />}
                  {category.category === 'AI/ML Concepts' && <Cpu size={20} />}
                  {category.category === 'DevOps & Deployment' && <Server size={20} />}
                  {category.category}
                </h3>
                
                <ul className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{topic}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="glass-card rounded-3xl p-12 bg-gradient-to-br from-blue-50 to-cyan-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Build Your Own Version?
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            This project demonstrates real-world web development with modern technologies. 
            Explore the code, customize features, and deploy your own version.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-black transition-colors"
            >
              <Code size={20} />
              View Source Code
            </a>
            
            <button className="px-8 py-4 bg-white border border-gray-300 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
              <Download size={20} />
              Download Project Files
            </button>
            
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg transition-shadow">
              <Repeat size={20} />
              Restart Journey
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <EducationalTooltip
              title="Architecture Diagram"
              content="View the complete system architecture including frontend, backend, database, and AI services."
            >
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2">
                <Server size={16} />
                System Architecture
              </button>
            </EducationalTooltip>

            <EducationalTooltip
              title="API Documentation"
              content="Explore the RESTful API endpoints and learn how to integrate with the backend."
            >
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2">
                <Database size={16} />
                API Reference
              </button>
            </EducationalTooltip>

            <EducationalTooltip
              title="Deployment Guide"
              content="Step-by-step instructions to deploy this project on Vercel with MongoDB Atlas."
            >
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg flex items-center gap-2">
                <Share2 size={16} />
                Deployment Guide
              </button>
            </EducationalTooltip>
          </div>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          <p>
            Built with ❤️ for educational purposes. This project demonstrates modern web development 
            patterns, AI integration, and production-ready practices.
          </p>
          <p className="mt-2">
            Technologies used: React, Tailwind CSS, Framer Motion, Node.js, MongoDB, Face Recognition AI
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Import missing icons
import { 
  Search, 
  User, 
  Armchair, 
  Ticket, 
  Camera 
} from 'lucide-react';

export default Dashboard;