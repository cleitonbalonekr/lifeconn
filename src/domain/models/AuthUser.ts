export interface AuthUser {
  id: string;
  authId: string;
  fullName?: string;
  nickname?: string;
  email: string;
  phoneNumber: string;
  photo?: string;
}
