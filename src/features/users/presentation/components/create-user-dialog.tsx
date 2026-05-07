import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@shared/components/ui';
import { CreateUserForm } from '../../forms';
import { useCreateUserMutation } from '../../hooks';
import { type CreateUserFormValues } from '../../validation';

interface CreateUserDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateUserDialog({ open, onOpenChange }: CreateUserDialogProps) {
    const createMutation = useCreateUserMutation();

    const handleSubmit = async (data: CreateUserFormValues) => {
        await createMutation.mutateAsync({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
            role: data.role,
            password: data.password,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                    <DialogDescription>
                        Add a new user to the system. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>
                <CreateUserForm onSubmit={handleSubmit} isSubmitting={createMutation.isPending} />
            </DialogContent>
        </Dialog>
    );
}
