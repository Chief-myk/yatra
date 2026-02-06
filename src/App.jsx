import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import SearchFlight from './pages/SearchFlight';
import PassengerDetails from './pages/PassengerDetails';
import SeatSelection from './pages/SeatSelection';
import BoardingPass from './pages/BoardingPass';
import SelfCheckin from './pages/SelfCheckin';
import Dashboard from './pages/Dashboard';

const App = () => {
  // Helper function to get current step based on route
  const getCurrentStep = (pathname) => {
    const steps = {
      '/': 1,
      '/search': 1,
      '/passenger': 2,
      '/seats': 3,
      '/boarding': 4,
      '/checkin': 5,
      '/dashboard': 6
    };
    return steps[pathname] || 1;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout currentStep={getCurrentStep('/')}>
            <SearchFlight />
          </Layout>
        } />
        
        <Route path="/search" element={
          <Layout currentStep={getCurrentStep('/search')}>
            <SearchFlight />
          </Layout>
        } />
        
        <Route path="/passenger" element={
          <Layout currentStep={getCurrentStep('/passenger')}>
            <PassengerDetails />
          </Layout>
        } />
        
        <Route path="/seats" element={
          <Layout currentStep={getCurrentStep('/seats')}>
            <SeatSelection />
          </Layout>
        } />
        
        <Route path="/boarding" element={
          <Layout currentStep={getCurrentStep('/boarding')}>
            <BoardingPass />
          </Layout>
        } />
        
        <Route path="/checkin" element={
          <Layout currentStep={getCurrentStep('/checkin')}>
            <SelfCheckin />
          </Layout>
        } />
        
        <Route path="/dashboard" element={
          <Layout currentStep={getCurrentStep('/dashboard')}>
            <Dashboard />
          </Layout>
        } />
        
        {/* Redirect any unknown route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;