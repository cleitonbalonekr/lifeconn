import { AuthUser } from '@/domain/models';

export interface UpdateNotificationTokenRepository {
  update(
    notificationToken: string,
    userId: string
  ): Promise<UpdateNotificationTokenRepository.Result>;
}

export namespace UpdateNotificationTokenRepository {
  export type Result = AuthUser | null;
}
