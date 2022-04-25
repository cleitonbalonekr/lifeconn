export interface GetUserContactsNotificationToken {
  getNotificationTokens(
    userId: GetUserContactsNotificationToken.Params
  ): Promise<GetUserContactsNotificationToken.Result>;
}

export namespace GetUserContactsNotificationToken {
  export type Params = string;
  export type Result = {
    tokens: string[];
    fullName: string;
  };
}
