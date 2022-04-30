import { AuthUser } from './AuthUser';
import { CallEvent } from './CallEvent';

export interface Call {
  id: string;
  userId: string | AuthUser;
  token: string;
  location: CallLocation;
  createdAt: Date;
  events: CallEvent[];
  lastEvent: CallEvent;
  open: boolean;
}

export type CallLocation = {
  latitude: number;
  longitude: number;
};
