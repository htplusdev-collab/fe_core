import { Bell, LogOut, User } from 'lucide-react';
import { useAuthStore } from '@core/stores';
import { Button } from '@shared/components/ui';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@shared/components/ui';

export function AppHeader() {
    const { user, clearAuth } = useAuthStore();

    return (
        <header className="flex h-14 items-center justify-between border-b bg-card px-6">
            <div className="flex items-center">
                <h2 className="text-lg font-semibold">Dashboard</h2>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{user?.name ?? 'Guest'}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={clearAuth}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
