import { CallEvent } from './CallEvent';

export interface Call {
  id: string;
  userId: string;
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
