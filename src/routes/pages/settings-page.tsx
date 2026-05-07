import { PageHeader } from '@shared/components/layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@shared/components/ui';

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <PageHeader title="Settings" description="Manage your application settings." />
            <Card>
                <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Configure general application preferences.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Settings page content will be implemented here.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
