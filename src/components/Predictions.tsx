import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, TrendingUp, RefreshCw } from 'lucide-react';
import { predictions, predictionModels } from '../data/earthquakeData';
import { format } from 'date-fns';

export const Predictions: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <TrendingUp className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Earthquake Predictions</h2>
          <p className="text-gray-600">AI-powered seismic activity forecasts</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">All Models</option>
            {predictionModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Model Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictionModels.map((model) => (
          <div key={model.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{model.name}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${
                model.status === 'active' ? 'bg-green-100 text-green-800' :
                model.status === 'training' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {model.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Accuracy</span>
              <span className="font-semibold text-gray-900">{model.accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${model.accuracy}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {predictions.map((prediction) => (
          <div key={prediction.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getRiskColor(prediction.riskLevel).replace('text-', 'text-').replace('bg-', 'bg-').replace('border-', '')}`}>
                  {getRiskIcon(prediction.riskLevel)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{prediction.location}</h3>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    Predicted Magnitude: {prediction.predictedMagnitude}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getRiskColor(prediction.riskLevel)}`}>
                {prediction.riskLevel.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Probability</p>
                <p className="text-xl font-bold text-gray-900">{prediction.probability}%</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Confidence</p>
                <p className="text-xl font-bold text-gray-900">{prediction.confidence}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Time Window: {prediction.timeWindow}</span>
              </div>
              <span>Generated {format(prediction.generatedAt, 'MMM dd, HH:mm')}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Risk Assessment</span>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2 w-32">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        prediction.riskLevel === 'critical' ? 'bg-red-600' :
                        prediction.riskLevel === 'high' ? 'bg-orange-500' :
                        prediction.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${prediction.probability}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{prediction.probability}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prediction Insights */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Prediction Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Increased seismic activity detected in the Pacific Ring of Fire</li>
              <li>• Neural network models show 91.2% accuracy in recent validations</li>
              <li>• 3 high-risk zones identified requiring enhanced monitoring</li>
              <li>• Tectonic plate movement patterns suggest elevated activity in next 30 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};