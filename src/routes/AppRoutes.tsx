import { lazy, Suspense } from 'react';

import { useAppSelector } from 'app/hooks';
import PageLoader from 'components/PageLoader';

import PublicRoutes from './PublicRoutes';

const PrivateRoutes = lazy(() => import('./PrivateRoutes'));

const AppRoutes = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Suspense fallback={<PageLoader />}>{user ? <PrivateRoutes /> : <PublicRoutes />}</Suspense>
  );
};

export default AppRoutes;
