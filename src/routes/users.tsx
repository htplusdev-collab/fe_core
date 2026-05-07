import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const usersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/users',
    component: lazyRouteComponent(
        () => import('@features/users/presentation/pages/users-page-export'),
    ),
});
