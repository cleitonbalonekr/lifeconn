export interface AuthUser {
  id: string;
  authId: string;
  fullName?: string;
  nickname?: string;
  totalVoiceToken?: string;
  email: string;
  phoneNumber: string;
  photo?: string;
}
