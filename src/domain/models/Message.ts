export interface Message {
  id: string;
  isPhoto: boolean;
  content: string;
  createdAt: Date;
  from: string;
}
