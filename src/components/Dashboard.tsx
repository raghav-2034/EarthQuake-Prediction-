import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, TrendingUp, Globe, Clock } from 'lucide-react';
import { earthquakeData, predictionModels } from '../data/earthquakeData';
import { format } from 'date-fns';

export const Dashboard: React.FC = () => {
  const recentEarthquakes = earthquakeData.slice(0, 3);
  const magnitudeData = earthquakeData.map(eq => ({
    location: eq.location.split(',')[0],
    magnitude: eq.magnitude,
    depth: eq.depth
  }));

  const riskData = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 30, color: '#F59E0B' },
    { name: 'High Risk', value: 20, color: '#EF4444' },
    { name: 'Critical Risk', value: 5, color: '#DC2626' }
  ];

  const activeModels = predictionModels.filter(model => model.status === 'active');
  const avgAccuracy = activeModels.reduce((sum, model) => sum + model.accuracy, 0) / activeModels.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Predictions</p>
              <p className="text-3xl font-bold text-gray-900">24</p>
              <p className="text-sm text-green-600 mt-1">+3 from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">{avgAccuracy.toFixed(1)}%</p>
              <p className="text-sm text-green-600 mt-1">+2.1% this week</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Areas</p>
              <p className="text-3xl font-bold text-gray-900">7</p>
              <p className="text-sm text-red-600 mt-1">2 new alerts</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Update</p>
              <p className="text-3xl font-bold text-gray-900">2m</p>
              <p className="text-sm text-gray-500 mt-1">ago</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Magnitude Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Earthquake Magnitudes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={magnitudeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="magnitude" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {riskData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Earthquakes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Earthquakes</h3>
        <div className="space-y-4">
          {recentEarthquakes.map((earthquake) => (
            <div key={earthquake.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  earthquake.magnitude >= 7 ? 'bg-red-500' :
                  earthquake.magnitude >= 6 ? 'bg-orange-500' :
                  earthquake.magnitude >= 5 ? 'bg-yellow-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-900">{earthquake.location}</p>
                  <p className="text-sm text-gray-500">
                    {format(earthquake.timestamp, 'MMM dd, yyyy HH:mm')} • Depth: {earthquake.depth}km
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">M{earthquake.magnitude}</p>
                <p className="text-sm text-gray-500">Magnitude</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};