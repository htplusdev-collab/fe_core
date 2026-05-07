import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@shared/components/ui';
import { PageHeader } from '@shared/components/layout';
import { UsersTable, CreateUserDialog } from '../components';
import { type User } from '../../domain';

export function UsersPage() {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const handleEdit = useCallback((_user: User) => {
        // TODO: implement edit dialog
    }, []);

    const handleDelete = useCallback((_user: User) => {
        // TODO: implement delete confirmation
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Users"
                description="Manage user accounts and permissions."
                actions={
                    <Button
                        onClick={() => {
                            setCreateDialogOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add User
                    </Button>
                }
            />
            <UsersTable onEdit={handleEdit} onDelete={handleDelete} />
            <CreateUserDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
        </div>
    );
}
