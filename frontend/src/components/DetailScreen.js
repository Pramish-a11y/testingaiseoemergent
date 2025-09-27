import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  ExternalLink, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users,
  Calendar,
  BarChart3,
  Lightbulb,
  Download
} from 'lucide-react';

const DetailScreen = ({ gap }) => {
  const navigate = useNavigate();

  const getPriorityColor = (score) => {
    if (score >= 8.0) return 'success';
    if (score >= 6.0) return 'warning'; 
    return 'danger';
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty >= 70) return 'danger';
    if (difficulty >= 40) return 'warning';
    return 'success';
  };

  const handleExport = () => {
    // Simulate export functionality
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/overview')}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Overview</span>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Details</span>
          </button>
          <button className="btn-primary">
            Start Content Creation
          </button>
        </div>
      </div>

      {/* Keyword Header */}
      <div className="card mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h1 className="text-3xl font-bold text-gray-900">{gap.keyword}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                gap.opportunity_score >= 8.0 ? 'bg-success-100 text-success-800' :
                gap.opportunity_score >= 6.0 ? 'bg-warning-100 text-warning-800' :
                'bg-danger-100 text-danger-800'
              }`}>
                Opportunity Score: {gap.opportunity_score}/10
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
              <span>Category: <strong>{gap.category}</strong></span>
              <span>Intent: <strong>{gap.intent}</strong></span>
              <span>Gap Type: <strong>{gap.gap_type}</strong></span>
            </div>
            
            <p className="text-gray-700">{gap.evidence}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Metrics Overview */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{gap.search_volume.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Monthly Searches</p>
              </div>
              
              <div className="text-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
                  getDifficultyColor(gap.difficulty) === 'success' ? 'bg-success-100' :
                  getDifficultyColor(gap.difficulty) === 'warning' ? 'bg-warning-100' : 'bg-danger-100'
                }`}>
                  <Target className={`w-6 h-6 ${
                    getDifficultyColor(gap.difficulty) === 'success' ? 'text-success-600' :
                    getDifficultyColor(gap.difficulty) === 'warning' ? 'text-warning-600' : 'text-danger-600'
                  }`} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{gap.difficulty}</p>
                <p className="text-sm text-gray-600">Difficulty Score</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-success-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{gap.potential_traffic.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Traffic Potential</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">#{gap.competitor_rank}</p>
                <p className="text-sm text-gray-600">Competitor Rank</p>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          {gap.detailed_analysis && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Market Analysis</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Search Trends</h3>
                  <p className="text-gray-700">{gap.detailed_analysis.search_trends}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Seasonal Patterns</h3>
                  <p className="text-gray-700">{gap.detailed_analysis.seasonal_patterns}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Competition Analysis</h3>
                  <p className="text-gray-700">{gap.detailed_analysis.competition_analysis}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Target Audience</h3>
                  <p className="text-gray-700">{gap.detailed_analysis.target_audience}</p>
                </div>
              </div>
            </div>
          )}

          {/* Content Recommendations */}
          {gap.detailed_analysis && (
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Content Recommendations</span>
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Recommended Format</h3>
                  <p className="text-gray-700">{gap.detailed_analysis.content_format_recommendation}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Content Angle</h3>
                  <p className="text-gray-700">{gap.detailed_analysis.content_angle}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Recommended Content Structure</h3>
                  <ul className="space-y-2">
                    {gap.detailed_analysis.recommended_sections.map((section, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{section}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Gap Analysis */}
          {gap.gap_analysis && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-warning-500" />
                <span>Gap Analysis</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Content Quality</h3>
                  <p className="text-sm text-gray-600">{gap.gap_analysis.content_quality_gap}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Keyword Targeting</h3>
                  <p className="text-sm text-gray-600">{gap.gap_analysis.keyword_targeting_gap}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">User Experience</h3>
                  <p className="text-sm text-gray-600">{gap.gap_analysis.user_experience_gap}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Authority</h3>
                  <p className="text-sm text-gray-600">{gap.gap_analysis.authority_gap}</p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {gap.recommended_actions && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span>Recommended Actions</span>
              </h2>
              
              <div className="space-y-3">
                {gap.recommended_actions.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Current Ranking</span>
                <span className="font-medium text-gray-900">
                  {gap.current_rank ? `#${gap.current_rank}` : 'Not Ranking'}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Estimated CPC</span>
                <span className="font-medium text-gray-900">$2.40</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Competition Level</span>
                <span className="font-medium text-gray-900">Medium</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Content Investment</span>
                <span className="font-medium text-gray-900">2-3 weeks</span>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Export & Integration</h2>
            
            <div className="space-y-3">
              <button className="w-full btn-secondary justify-center flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Export to Content Calendar</span>
              </button>
              
              <button className="w-full btn-secondary justify-center flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Add to Task Management</span>
              </button>
              
              <button className="w-full btn-secondary justify-center flex items-center space-x-2">
                <ExternalLink className="w-4 h-4" />
                <span>Share with Team</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailScreen;