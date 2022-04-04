import React from 'react';

import { useAuth } from '@/presentation/shared/context/auth';

import { AppRoutes } from './App.routes';
import { AuthRoutes } from './Auth.routes';

export default function Routes() {
  const { signed } = useAuth();
  return signed ? <AppRoutes /> : <AuthRoutes />;
}
