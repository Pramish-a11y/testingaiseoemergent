import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Loader2, Target, TrendingUp, BarChart3 } from 'lucide-react';

const EntryScreen = ({ onAnalysisComplete }) => {
  const [domain, setDomain] = useState('');
  const [region, setRegion] = useState('US');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!domain.trim()) {
      alert('Please enter a domain to analyze');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: domain.trim(),
          region,
          language
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      onAnalysisComplete(data);
      navigate('/overview');
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Your Content Opportunities
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Analyze your domain to identify high-impact SEO content gaps and 
          opportunities that your competitors are winning
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Smart Gap Detection</h3>
          <p className="text-gray-600 text-sm">
            AI-powered analysis identifies content gaps with highest ROI potential
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Traffic Potential</h3>
          <p className="text-gray-600 text-sm">
            Estimate traffic gains from ranking for identified opportunities
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-primary-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Priority Scoring</h3>
          <p className="text-gray-600 text-sm">
            Ranked recommendations based on impact, effort, and competition
          </p>
        </div>
      </div>

      {/* Analysis Form */}
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <form onSubmit={handleAnalyze} className="space-y-6">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                Domain to Analyze
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  disabled={isLoading}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Enter your domain without http:// or www.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                  Target Region
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  disabled={isLoading}
                >
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                </select>
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  disabled={isLoading}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="pt">Portuguese</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !domain.trim()}
              className="w-full btn-primary flex items-center justify-center space-x-2 py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing Content Gaps...</span>
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Analyze Content Gaps</span>
                </>
              )}
            </button>
          </form>
        </div>

        {isLoading && (
          <div className="mt-8 card bg-blue-50 border-blue-200">
            <div className="flex items-center space-x-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <div>
                <p className="font-medium text-blue-900">Analysis in Progress</p>
                <p className="text-blue-700 text-sm">
                  Scanning competitor content, analyzing keywords, and identifying opportunities...
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntryScreen;