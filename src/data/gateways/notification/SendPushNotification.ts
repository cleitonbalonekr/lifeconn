export interface SendPushNotification {
  notify(tokens: string[], victimName: string): Promise<void>;
}
