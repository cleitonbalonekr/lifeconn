import { AuthUser } from './AuthUser';
import { CallEvent } from './CallEvent';

export interface Call {
  id: string;
  userId: string | AuthUser | null;
  token: string;
  location: CallLocation;
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
}

export type CallLocation = {
  latitude: number;
  longitude: number;
};
