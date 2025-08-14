import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Wifi, AlertCircle, CheckCircle, Radio } from 'lucide-react';

interface SeismicReading {
  time: string;
  magnitude: number;
  frequency: number;
  station: string;
}

export const Monitoring: React.FC = () => {
  const [isLive, setIsLive] = useState(true);
  const [seismicData, setSeismicData] = useState<SeismicReading[]>([]);

  // Simulate real-time data
  useEffect(() => {
    const generateReading = (): SeismicReading => ({
      time: new Date().toLocaleTimeString(),
      magnitude: Math.random() * 3 + 1,
      frequency: Math.random() * 50 + 10,
      station: `Station-${Math.floor(Math.random() * 5) + 1}`
    });

    const interval = setInterval(() => {
      if (isLive) {
        setSeismicData(prev => {
          const newData = [...prev, generateReading()].slice(-20);
          return newData;
        });
      }
    }, 2000);

    // Initialize with some data
    if (seismicData.length === 0) {
      const initialData = Array.from({ length: 10 }, generateReading);
      setSeismicData(initialData);
    }

    return () => clearInterval(interval);
  }, [isLive, seismicData.length]);

  const stations = [
    { id: 'SF-001', name: 'San Francisco Bay', status: 'online', lastReading: '2s ago', magnitude: 2.1 },
    { id: 'LA-002', name: 'Los Angeles Basin', status: 'online', lastReading: '1s ago', magnitude: 1.8 },
    { id: 'SEA-003', name: 'Seattle Metro', status: 'online', lastReading: '3s ago', magnitude: 1.5 },
    { id: 'PDX-004', name: 'Portland Area', status: 'maintenance', lastReading: '5m ago', magnitude: 0.0 },
    { id: 'SD-005', name: 'San Diego Coast', status: 'online', lastReading: '1s ago', magnitude: 2.3 }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Unusual seismic pattern detected in SF Bay Area', time: '2m ago' },
    { id: 2, type: 'info', message: 'Station PDX-004 scheduled for maintenance', time: '15m ago' },
    { id: 3, type: 'success', message: 'All primary monitoring stations operational', time: '1h ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-time Monitoring</h2>
          <p className="text-gray-600">Live seismic activity tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {isLive ? 'Live' : 'Paused'}
            </span>
          </div>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLive 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* Live Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Seismic Activity</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Radio className="w-4 h-4" />
            <span>Real-time feed</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={seismicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="magnitude" 
              stroke="#EF4444" 
              strokeWidth={2}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Station Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monitoring Stations</h3>
          <div className="space-y-4">
            {stations.map((station) => (
              <div key={station.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    station.status === 'online' ? 'bg-green-500' :
                    station.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{station.name}</p>
                    <p className="text-sm text-gray-500">{station.id} • {station.lastReading}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {station.magnitude > 0 ? `${station.magnitude}M` : '--'}
                  </p>
                  <p className="text-sm text-gray-500">Current</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'info' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                  ) : alert.type === 'info' ? (
                    <Wifi className="w-4 h-4 text-blue-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">98.7%</p>
            <p className="text-sm text-gray-600">Uptime</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">5/5</p>
            <p className="text-sm text-gray-600">Stations Online</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Radio className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">1.2s</p>
            <p className="text-sm text-gray-600">Avg Latency</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <CheckCircle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">24/7</p>
            <p className="text-sm text-gray-600">Monitoring</p>
          </div>
        </div>
      </div>
    </div>
  );
};