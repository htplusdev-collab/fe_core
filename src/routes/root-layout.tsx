import { Outlet } from '@tanstack/react-router';
import { AppLayout } from '@shared/components/layout';

export function RootLayout() {
    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
}
