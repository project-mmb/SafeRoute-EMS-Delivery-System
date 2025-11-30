export type InjuryCategory = 'trauma' | 'postpartum' | 'gbv' | 'chronic' | 'other';

export type InjuryType = 
  | 'heavy_bleeding'
  | 'breathing_difficulty'
  | 'head_injury'
  | 'neck_injury'
  | 'spinal_injury'
  | 'postpartum_hemorrhage'
  | 'postpartum_infection'
  | 'gbv_physical'
  | 'gbv_emergency'
  | 'chronic_cardiac'
  | 'chronic_diabetic'
  | 'chronic_respiratory'
  | 'other';

export type RequestStatus = 'pending' | 'dispatched' | 'in_transit' | 'delivered' | 'completed' | 'cancelled';

export type RequestPriority = 'normal' | 'high' | 'emergency';

export interface DroneRequest {
  id: string;
  userId?: string;
  name: string;
  age: number;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  injuryCategory: InjuryCategory;
  injuryType: InjuryType;
  injuryDescription?: string;
  status: RequestStatus;
  priority: RequestPriority;
  droneId?: string;
  dispatchTime?: Date;
  eta?: number; // in minutes
  progress?: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'responder' | 'admin';
  createdAt: Date;
}

export interface Drone {
  id: string;
  name: string;
  status: 'available' | 'dispatched' | 'maintenance' | 'offline';
  batteryLevel: number;
  currentLocation?: {
    lat: number;
    lng: number;
  };
  lastMaintenance: Date;
}

// Helper to check if injury requires drone dispatch
export const requiresDroneDispatch = (injuryType: InjuryType): boolean => {
  const criticalInjuries: InjuryType[] = [
    'heavy_bleeding',
    'breathing_difficulty',
    'head_injury',
    'neck_injury',
    'spinal_injury',
    'postpartum_hemorrhage',
    'gbv_emergency'
  ];
  return criticalInjuries.includes(injuryType);
};

// Injury type labels
export const injuryTypeLabels: Record<InjuryType, string> = {
  heavy_bleeding: 'Heavy Bleeding',
  breathing_difficulty: 'Breathing Difficulty',
  head_injury: 'Head Injury',
  neck_injury: 'Neck Injury',
  spinal_injury: 'Spinal Injury',
  postpartum_hemorrhage: 'Postpartum Hemorrhage',
  postpartum_infection: 'Postpartum Infection',
  gbv_physical: 'Physical Injury (GBV)',
  gbv_emergency: 'Emergency (GBV)',
  chronic_cardiac: 'Cardiac Event',
  chronic_diabetic: 'Diabetic Emergency',
  chronic_respiratory: 'Respiratory Distress',
  other: 'Other'
};

// Category labels
export const injuryCategoryLabels: Record<InjuryCategory, string> = {
  trauma: 'Trauma / Emergency',
  postpartum: 'Postpartum',
  gbv: 'Gender-Based Violence',
  chronic: 'Chronic Condition',
  other: 'Other'
};

// Get injuries by category
export const injuriesByCategory: Record<InjuryCategory, InjuryType[]> = {
  trauma: ['heavy_bleeding', 'breathing_difficulty', 'head_injury', 'neck_injury', 'spinal_injury'],
  postpartum: ['postpartum_hemorrhage', 'postpartum_infection'],
  gbv: ['gbv_physical', 'gbv_emergency'],
  chronic: ['chronic_cardiac', 'chronic_diabetic', 'chronic_respiratory'],
  other: ['other']
};
