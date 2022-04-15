export interface AuthUser {
  id: string;
  authId: string;
  fullName?: string;
  nickname?: string;
  totalVoiceToken?: string;
  impactActivation?: boolean;
  email: string;
  phoneNumber: string;
  photo?: string;
}
