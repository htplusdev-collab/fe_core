import { Link } from '@tanstack/react-router';
import { LayoutDashboard, Users, Package, Settings, Menu } from 'lucide-react';
import { useUIStore } from '@core/stores';
import { Button } from '@shared/components/ui';
import { cn } from '@shared/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/' as const, icon: LayoutDashboard },
    { name: 'Users', href: '/users' as const, icon: Users },
    { name: 'Products', href: '/products' as const, icon: Package },
    { name: 'Settings', href: '/settings' as const, icon: Settings },
];

export function AppSidebar() {
    const { sidebarOpen, toggleSidebar } = useUIStore();

    return (
        <aside
            className={cn(
                'flex h-screen flex-col border-r bg-card transition-all duration-300',
                sidebarOpen ? 'w-64' : 'w-16',
            )}
        >
            <div className="flex h-14 items-center border-b px-4">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu className="h-5 w-5" />
                </Button>
                {sidebarOpen && <span className="ml-2 text-lg font-semibold">Enterprise</span>}
            </div>
            <nav className="flex-1 space-y-1 p-2">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground [&.active]:bg-accent [&.active]:text-accent-foreground"
                    >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {sidebarOpen && <span className="ml-3">{item.name}</span>}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
