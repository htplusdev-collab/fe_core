import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/ui';
import { PageHeader } from '@shared/components/layout';
import { Users, Package, TrendingUp, DollarSign } from 'lucide-react';

const stats = [
    { title: 'Total Users', value: '2,845', icon: Users, trend: '+12.5%' },
    { title: 'Products', value: '1,234', icon: Package, trend: '+8.2%' },
    { title: 'Revenue', value: '$45,231', icon: DollarSign, trend: '+20.1%' },
    { title: 'Growth', value: '12.5%', icon: TrendingUp, trend: '+4.3%' },
] as const;

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <PageHeader title="Dashboard" description="Welcome to your enterprise dashboard." />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className="text-green-600">{stat.trend}</span> from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
