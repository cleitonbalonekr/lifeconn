export interface SendContactsNotification {
  notifyContacts: (userId: string) => Promise<SendContactsNotification.Model>;
}

export namespace SendContactsNotification {
  export type Model = void;
}
