import { Timestamp } from 'firebase/firestore';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  cycle: 'monthly' | 'annually' | 'weekly';
  nextDue: Timestamp;
  createdAt: Timestamp;
}

export interface UserSettings {
  currency: string;
}

// Globals provided by the environment
declare global {
  const __app_id: string | undefined;
  const __firebase_config: string | undefined;
  const __initial_auth_token: string | undefined;
}