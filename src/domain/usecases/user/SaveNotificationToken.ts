import { AuthUser } from '@/domain/models';

export interface SaveNotificationToken {
  update: (
    params: SaveNotificationToken.Params
  ) => Promise<SaveNotificationToken.Model>;
}

export namespace SaveNotificationToken {
  export type Params = {
    notificationToken: string;
    userId: string;
  };

  export type Model = AuthUser;
}
