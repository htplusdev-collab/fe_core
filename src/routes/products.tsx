import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { rootRoute } from './__root';

export const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/products',
    component: lazyRouteComponent(
        () => import('@features/products/presentation/pages/products-page-export'),
    ),
});
