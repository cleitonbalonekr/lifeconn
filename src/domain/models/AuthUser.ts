import { Contact } from './Contact';
import { MedicalData } from './MedicalData';

export interface AuthUser {
  id: string;
  authId: string;
  fullName?: string;
  totalVoiceToken?: string;
  impactActivation?: boolean;
  notificationToken?: string;
  email: string;
  phoneNumber: string;
  photo?: string;
  medicalData: MedicalData[];
  contacts: Contact[];
}
