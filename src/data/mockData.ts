import { DroneRequest, Drone, RequestStatus, RequestPriority, InjuryCategory, InjuryType } from '@/types';

// Mock drone requests for dashboard
export const mockDroneRequests: DroneRequest[] = [
  {
    id: 'REQ-001',
    name: 'Sarah Johnson',
    age: 34,
    location: 'Downtown Medical Center, Block A',
    coordinates: { lat: -1.2921, lng: 36.8219 },
    injuryCategory: 'trauma',
    injuryType: 'heavy_bleeding',
    status: 'in_transit',
    priority: 'emergency',
    droneId: 'DRONE-01',
    dispatchTime: new Date(Date.now() - 5 * 60 * 1000),
    eta: 4,
    progress: 65,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'REQ-002',
    name: 'Michael Ochieng',
    age: 45,
    location: 'Westlands Business District',
    coordinates: { lat: -1.2673, lng: 36.8110 },
    injuryCategory: 'chronic',
    injuryType: 'chronic_cardiac',
    status: 'dispatched',
    priority: 'high',
    droneId: 'DRONE-02',
    dispatchTime: new Date(Date.now() - 2 * 60 * 1000),
    eta: 8,
    progress: 25,
    createdAt: new Date(Date.now() - 8 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'REQ-003',
    name: 'Jane Wanjiku',
    age: 28,
    location: 'Kibera Health Center',
    coordinates: { lat: -1.3133, lng: 36.7877 },
    injuryCategory: 'postpartum',
    injuryType: 'postpartum_hemorrhage',
    status: 'pending',
    priority: 'emergency',
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    id: 'REQ-004',
    name: 'David Mwangi',
    age: 52,
    location: 'Industrial Area, Warehouse 7',
    coordinates: { lat: -1.3044, lng: 36.8554 },
    injuryCategory: 'trauma',
    injuryType: 'breathing_difficulty',
    status: 'completed',
    priority: 'high',
    droneId: 'DRONE-03',
    progress: 100,
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 'REQ-005',
    name: 'Anonymous',
    age: 22,
    location: 'Eastleigh, Section 3',
    coordinates: { lat: -1.2756, lng: 36.8474 },
    injuryCategory: 'gbv',
    injuryType: 'gbv_emergency',
    status: 'pending',
    priority: 'emergency',
    createdAt: new Date(Date.now() - 1 * 60 * 1000),
    updatedAt: new Date()
  }
];

// Mock drones
export const mockDrones: Drone[] = [
  {
    id: 'DRONE-01',
    name: 'AeroMed Alpha',
    status: 'dispatched',
    batteryLevel: 78,
    currentLocation: { lat: -1.2850, lng: 36.8200 },
    lastMaintenance: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'DRONE-02',
    name: 'AeroMed Beta',
    status: 'dispatched',
    batteryLevel: 92,
    currentLocation: { lat: -1.2700, lng: 36.8150 },
    lastMaintenance: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'DRONE-03',
    name: 'AeroMed Gamma',
    status: 'available',
    batteryLevel: 100,
    currentLocation: { lat: -1.2921, lng: 36.8219 },
    lastMaintenance: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'DRONE-04',
    name: 'AeroMed Delta',
    status: 'maintenance',
    batteryLevel: 45,
    lastMaintenance: new Date()
  },
  {
    id: 'DRONE-05',
    name: 'AeroMed Echo',
    status: 'available',
    batteryLevel: 88,
    currentLocation: { lat: -1.2921, lng: 36.8219 },
    lastMaintenance: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

// Emergency tips by injury type
export const emergencyTips: Record<InjuryType, string[]> = {
  heavy_bleeding: [
    'Apply direct pressure to the wound with a clean cloth',
    'Elevate the injured area above heart level if possible',
    'Do not remove any objects embedded in the wound',
    'Keep the person calm and still',
    'Monitor for signs of shock (pale skin, rapid breathing)'
  ],
  breathing_difficulty: [
    'Help the person sit upright or in a comfortable position',
    'Loosen any tight clothing around neck and chest',
    'Stay calm and encourage slow, deep breaths',
    'Do not give food or water',
    'If person has prescribed inhaler, help them use it'
  ],
  head_injury: [
    'Keep the person still and do not move their head or neck',
    'Apply gentle pressure if bleeding, but not directly on wound',
    'Watch for changes in consciousness or behavior',
    'Do not give any medications',
    'Keep the person awake if possible'
  ],
  neck_injury: [
    'DO NOT move the person unless absolutely necessary',
    'Stabilize the head and neck in the position found',
    'If must move, support head and neck as a unit',
    'Monitor breathing and consciousness',
    'Keep person warm with blankets if available'
  ],
  spinal_injury: [
    'DO NOT move the person - movement can cause permanent damage',
    'Keep person completely still',
    'Place rolled towels or clothing on either side of neck',
    'Monitor breathing without moving them',
    'Reassure the person and keep them calm'
  ],
  postpartum_hemorrhage: [
    'Keep the mother lying down with legs elevated',
    'Massage the uterus gently (lower abdomen)',
    'Encourage breastfeeding if baby is present',
    'Keep mother warm and monitor consciousness',
    'Collect and estimate blood loss if possible'
  ],
  postpartum_infection: [
    'Keep the mother comfortable and hydrated',
    'Monitor temperature if thermometer available',
    'Note any discharge characteristics',
    'Keep the area clean',
    'Do not give unprescribed antibiotics'
  ],
  gbv_physical: [
    'Ensure the person is in a safe location',
    'Provide emotional support and privacy',
    'Document injuries if person consents',
    'Do not pressure person to make decisions',
    'Respect their choices and autonomy'
  ],
  gbv_emergency: [
    'Prioritize immediate safety',
    'Help person to a safe, private location',
    'Provide emotional support',
    'Do not ask for details of the incident',
    'Respect privacy and confidentiality'
  ],
  chronic_cardiac: [
    'Help person sit or lie in comfortable position',
    'If person has nitroglycerin, help them take it',
    'Loosen tight clothing',
    'Monitor breathing and consciousness',
    'If person becomes unconscious, prepare for CPR'
  ],
  chronic_diabetic: [
    'If conscious and able to swallow, give sugar (juice, candy)',
    'Do not give insulin without confirmation of blood sugar',
    'Help person sit or lie down',
    'Monitor consciousness',
    'If unconscious, do not give anything by mouth'
  ],
  chronic_respiratory: [
    'Help person sit upright',
    'Assist with prescribed medications (inhalers)',
    'Ensure good airflow in the area',
    'Encourage pursed-lip breathing',
    'Stay calm and provide reassurance'
  ],
  other: [
    'Keep the person calm and comfortable',
    'Monitor vital signs if possible',
    'Note any symptoms and their progression',
    'Do not give unprescribed medications',
    'Provide reassurance that help is coming'
  ]
};

// Database placeholder functions
// TODO: Replace with actual Supabase calls
export const db = {
  // Requests
  createRequest: async (request: Omit<DroneRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<DroneRequest> => {
    console.log('DB: Creating request', request);
    // Placeholder - will connect to Supabase
    return {
      ...request,
      id: `REQ-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  },
  
  getRequests: async (): Promise<DroneRequest[]> => {
    console.log('DB: Fetching requests');
    // Placeholder - will connect to Supabase
    return mockDroneRequests;
  },
  
  updateRequestStatus: async (requestId: string, status: RequestStatus, droneId?: string): Promise<void> => {
    console.log('DB: Updating request', requestId, status, droneId);
    // Placeholder - will connect to Supabase
  },

  // Drones
  getDrones: async (): Promise<Drone[]> => {
    console.log('DB: Fetching drones');
    // Placeholder - will connect to Supabase
    return mockDrones;
  },
  
  getAvailableDrones: async (): Promise<Drone[]> => {
    console.log('DB: Fetching available drones');
    // Placeholder - will connect to Supabase
    return mockDrones.filter(d => d.status === 'available');
  },

  // Users
  createUser: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    console.log('DB: Creating user', user);
    // Placeholder - will connect to Supabase
    return {
      ...user,
      id: `USER-${Date.now()}`,
      createdAt: new Date()
    };
  },

  authenticateUser: async (email: string, password: string): Promise<User | null> => {
    console.log('DB: Authenticating user', email);
    // Placeholder - will connect to Supabase Auth
    return null;
  }
};

// Type for User (importing causes circular dependency, so define inline)
interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'responder' | 'admin';
  createdAt: Date;
}
