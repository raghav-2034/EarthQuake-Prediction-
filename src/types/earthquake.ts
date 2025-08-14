export interface Earthquake {
  id: string;
  magnitude: number;
  location: string;
  depth: number;
  latitude: number;
  longitude: number;
  timestamp: Date;
  type: string;
  significance: number;
}

export interface PredictionModel {
  id: string;
  name: string;
  accuracy: number;
  lastUpdated: Date;
  status: 'active' | 'training' | 'inactive';
}

export interface Prediction {
  id: string;
  location: string;
  predictedMagnitude: number;
  probability: number;
  timeWindow: string;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  generatedAt: Date;
}