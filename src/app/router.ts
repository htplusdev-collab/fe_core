import { createRouter } from '@tanstack/react-router';
import { rootRoute } from '@/routes/__root';
import { indexRoute } from '@/routes/index';
import { usersRoute } from '@/routes/users';
import { productsRoute } from '@/routes/products';
import { settingsRoute } from '@/routes/settings';

const routeTree = rootRoute.addChildren([indexRoute, usersRoute, productsRoute, settingsRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
