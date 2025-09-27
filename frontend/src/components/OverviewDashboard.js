import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  Users, 
  BarChart3, 
  ExternalLink,
  ChevronRight,
  Badge,
  Signal
} from 'lucide-react';

const OverviewDashboard = ({ analysisData, onGapSelect }) => {
  const navigate = useNavigate();

  const handleGapClick = async (gap) => {
    try {
      // Fetch detailed data for the gap
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gap/${gap.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch gap details');
      }
      const detailData = await response.json();
      onGapSelect(detailData);
      navigate(`/detail/${gap.id}`);
    } catch (error) {
      console.error('Error fetching gap details:', error);
      alert('Failed to load gap details. Please try again.');
    }
  };

  const getPriorityColor = (score) => {
    if (score >= 8.0) return 'success';
    if (score >= 6.0) return 'warning'; 
    return 'danger';
  };

  const getPriorityClass = (score) => {
    if (score >= 8.0) return 'priority-high';
    if (score >= 6.0) return 'priority-medium';
    return 'priority-low';
  };

  const getPriorityLabel = (score) => {
    if (score >= 8.0) return 'High Priority';
    if (score >= 6.0) return 'Medium Priority';
    return 'Low Priority';
  };

  const getIntentColor = (intent) => {
    switch (intent) {
      case 'Commercial Investigation':
        return 'bg-blue-100 text-blue-800';
      case 'Informational':
        return 'bg-green-100 text-green-800';
      case 'Transactional':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>New Analysis</span>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Content Gap Analysis
            </h1>
            <p className="text-gray-600">
              Domain: <span className="font-medium">{analysisData.domain}</span>
            </p>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Analysis completed: {new Date(analysisData.created_at).toLocaleDateString()}
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Opportunities</p>
              <p className="text-3xl font-bold text-gray-900">{analysisData.total_gaps}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-3xl font-bold text-success-600">{analysisData.high_priority_gaps}</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Traffic Potential</p>
              <p className="text-3xl font-bold text-blue-600">
                {analysisData.estimated_traffic_potential.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">monthly visits</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Opportunity</p>
              <p className="text-3xl font-bold text-orange-600">
                {(analysisData.content_gaps.reduce((sum, gap) => sum + gap.opportunity_score, 0) / analysisData.content_gaps.length).toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">out of 10</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Gaps List */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Prioritized Content Opportunities
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success-500 rounded-full"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-danger-500 rounded-full"></div>
              <span>Low Priority</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {analysisData.content_gaps.map((gap, index) => (
            <div
              key={gap.id}
              onClick={() => handleGapClick(gap)}
              className={`gap-item ${getPriorityClass(gap.opportunity_score)} cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {gap.keyword}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getIntentColor(gap.intent)}`}>
                        {gap.intent}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {gap.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{gap.evidence}</p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Search Volume</span>
                      <p className="font-medium text-gray-900">{gap.search_volume.toLocaleString()}/mo</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Difficulty</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${gap.difficulty >= 70 ? 'bg-red-500' : gap.difficulty >= 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${gap.difficulty}%` }}
                          ></div>
                        </div>
                        <span className="font-medium text-gray-900">{gap.difficulty}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Current Rank</span>
                      <p className="font-medium text-gray-900">
                        {gap.current_rank ? `#${gap.current_rank}` : 'Not Ranking'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Competitor Rank</span>
                      <p className="font-medium text-gray-900">#{gap.competitor_rank}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Traffic Potential</span>
                      <p className="font-medium text-gray-900">{gap.potential_traffic.toLocaleString()}/mo</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 ml-6">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Signal className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">Opportunity Score</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {gap.opportunity_score}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        gap.opportunity_score >= 8.0 ? 'bg-success-100 text-success-800' :
                        gap.opportunity_score >= 6.0 ? 'bg-warning-100 text-warning-800' :
                        'bg-danger-100 text-danger-800'
                      }`}>
                        {getPriorityLabel(gap.opportunity_score)}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Actions */}
      <div className="flex items-center justify-center mt-8 space-x-4">
        <button className="btn-secondary flex items-center space-x-2">
          <ExternalLink className="w-4 h-4" />
          <span>Export to CSV</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2">
          <ExternalLink className="w-4 h-4" />
          <span>Generate Report</span>
        </button>
      </div>
    </div>
  );
};

export default OverviewDashboard;