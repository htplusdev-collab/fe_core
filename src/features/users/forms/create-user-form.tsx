import { GenericForm, TextField, SelectField } from '@shared/components/forms';
import { createUserSchema, type CreateUserFormValues } from '../validation';

const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Manager', value: 'manager' },
    { label: 'User', value: 'user' },
    { label: 'Viewer', value: 'viewer' },
];

interface CreateUserFormProps {
    onSubmit: (data: CreateUserFormValues) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function CreateUserForm({ onSubmit, isSubmitting }: CreateUserFormProps) {
    return (
        <GenericForm
            schema={createUserSchema}
            onSubmit={onSubmit}
            submitLabel="Create User"
            isSubmitting={isSubmitting}
            className="space-y-4"
        >
            {() => (
                <>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField<CreateUserFormValues>
                            name="firstName"
                            label="First Name"
                            placeholder="John"
                            required
                        />
                        <TextField<CreateUserFormValues>
                            name="lastName"
                            label="Last Name"
                            placeholder="Doe"
                            required
                        />
                    </div>
                    <TextField<CreateUserFormValues>
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        required
                    />
                    <SelectField<CreateUserFormValues>
                        name="role"
                        label="Role"
                        options={roleOptions}
                        required
                    />
                    <TextField<CreateUserFormValues>
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Min. 8 characters"
                        required
                    />
                </>
            )}
        </GenericForm>
    );
}
