import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EntryScreen from './components/EntryScreen';
import OverviewDashboard from './components/OverviewDashboard';
import DetailScreen from './components/DetailScreen';
import './App.css';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedGap, setSelectedGap] = useState(null);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
  };

  const handleGapSelect = (gap) => {
    setSelectedGap(gap);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  SEO Content Gap Analyzer
                </h1>
              </div>
              <div className="text-sm text-gray-500">
                Identify high-impact content opportunities
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<EntryScreen onAnalysisComplete={handleAnalysisComplete} />} 
            />
            <Route 
              path="/overview" 
              element={
                analysisData ? (
                  <OverviewDashboard 
                    analysisData={analysisData} 
                    onGapSelect={handleGapSelect}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/detail/:gapId" 
              element={
                selectedGap ? (
                  <DetailScreen gap={selectedGap} />
                ) : (
                  <Navigate to="/overview" replace />
                )
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;