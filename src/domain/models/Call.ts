import { CallEvent } from './CallEvent';

export interface Call {
  id: string;
  userId: string;
  token: string;
  location: {
    latitude: number;
    longitude: number;
  };
  createdAt: Date;
  events: CallEvent[];
  lastEvent: CallEvent;
  open: boolean;
}