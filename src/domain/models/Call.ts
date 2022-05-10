import { AuthUser } from './AuthUser';
import { CallEvent } from './CallEvent';
import { Message } from './Message';

export interface Call {
  id: string;
  userId: string | AuthUser | null;
  token: string;
  location: Call.Location;
  createdAt: Date;
  events: CallEvent[];
  lastEvent: CallEvent;
  open: boolean;
  victimName?: string;
  helper?: {
    id: string;
    fullName: string;
    phoneNumber: string;
  };
  messages: Message[];
  photos: string[];
}

export namespace Call {
  export const CALL_PHOTO_LIMIT = 3;
  export type Location = {
    latitude: number;
    longitude: number;
  };
}
