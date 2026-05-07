import { RouterProvider } from '@tanstack/react-router';
import { QueryProvider } from '@core/providers';
import { TooltipProvider } from '@shared/components/ui';
import { router } from './router';

export function App() {
    return (
        <QueryProvider>
            <TooltipProvider>
                <RouterProvider router={router} />
            </TooltipProvider>
        </QueryProvider>
    );
}
