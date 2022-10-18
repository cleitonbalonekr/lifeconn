/* eslint-disable no-shadow */
export enum EventStatus {
  AUTHOR_CREATED = 'AUTHOR_CREATED',
  AUTHOR_CANCELLED = 'AUTHOR_CANCELLED',
  ORG_VIEWED = 'ORG_VIEWED',
  ORG_CANCELLED = 'ORG_CANCELLED',
  ORG_ANSWERED = 'ORG_ANSWERED',
  ORG_FINISHED = 'ORG_FINISHED'
}

export interface CallEvent {
  id: string;
  notes?: string;
  occurredAt: Date;
  status: EventStatus;
  creatorId: string;
  callId: string;
}
