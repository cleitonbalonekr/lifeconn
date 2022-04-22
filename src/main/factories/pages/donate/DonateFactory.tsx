import React from 'react';

import { makeRemoteLoadCallsBalance } from '@/main/factories/usecases/remoteLoadCallsBalanceFactory';
import { Donate } from '@/presentation/modules/donate';

export const MakeDonate: React.FC = () => {
  return <Donate loadCallsBalance={makeRemoteLoadCallsBalance()} />;
};
