export interface Contact {
  id: string;
  contactId: string;
  nickname: string;
  phoneNumber: string;
  notificationToken?: string;
  hasAccount: boolean;
}
