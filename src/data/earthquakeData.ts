import { Earthquake, PredictionModel, Prediction } from '../types/earthquake';

// Sample earthquake data
export const earthquakeData: Earthquake[] = [
  {
    id: '1',
    magnitude: 7.2,
    location: 'San Francisco, CA',
    depth: 15.2,
    latitude: 37.7749,
    longitude: -122.4194,
    timestamp: new Date('2024-01-15T14:30:00Z'),
    type: 'tectonic',
    significance: 850
  },
  {
    id: '2',
    magnitude: 6.8,
    location: 'Los Angeles, CA',
    depth: 8.7,
    latitude: 34.0522,
    longitude: -118.2437,
    timestamp: new Date('2024-01-12T09:15:00Z'),
    type: 'tectonic',
    significance: 720
  },
  {
    id: '3',
    magnitude: 5.4,
    location: 'Seattle, WA',
    depth: 22.1,
    latitude: 47.6062,
    longitude: -122.3321,
    timestamp: new Date('2024-01-10T16:45:00Z'),
    type: 'tectonic',
    significance: 420
  },
  {
    id: '4',
    magnitude: 6.1,
    location: 'Tokyo, Japan',
    depth: 35.0,
    latitude: 35.6762,
    longitude: 139.6503,
    timestamp: new Date('2024-01-08T03:22:00Z'),
    type: 'tectonic',
    significance: 580
  },
  {
    id: '5',
    magnitude: 7.8,
    location: 'Istanbul, Turkey',
    depth: 12.5,
    latitude: 41.0082,
    longitude: 28.9784,
    timestamp: new Date('2024-01-05T11:30:00Z'),
    type: 'tectonic',
    significance: 920
  }
];

export const predictionModels: PredictionModel[] = [
  {
    id: 'neural-net-v2',
    name: 'Neural Network v2.0',
    accuracy: 87.3,
    lastUpdated: new Date('2024-01-16T10:00:00Z'),
    status: 'active'
  },
  {
    id: 'seismic-pattern',
    name: 'Seismic Pattern Analysis',
    accuracy: 82.1,
    lastUpdated: new Date('2024-01-16T08:30:00Z'),
    status: 'active'
  },
  {
    id: 'ml-ensemble',
    name: 'ML Ensemble Model',
    accuracy: 91.2,
    lastUpdated: new Date('2024-01-16T12:15:00Z'),
    status: 'training'
  }
];

export const predictions: Prediction[] = [
  {
    id: 'pred-1',
    location: 'San Francisco Bay Area',
    predictedMagnitude: 6.2,
    probability: 73,
    timeWindow: '7 days',
    confidence: 85,
    riskLevel: 'high',
    generatedAt: new Date('2024-01-16T14:00:00Z')
  },
  {
    id: 'pred-2',
    location: 'Southern California',
    predictedMagnitude: 5.8,
    probability: 45,
    timeWindow: '14 days',
    confidence: 72,
    riskLevel: 'medium',
    generatedAt: new Date('2024-01-16T14:00:00Z')
  },
  {
    id: 'pred-3',
    location: 'Pacific Northwest',
    predictedMagnitude: 7.1,
    probability: 28,
    timeWindow: '30 days',
    confidence: 68,
    riskLevel: 'critical',
    generatedAt: new Date('2024-01-16T14:00:00Z')
  }
];