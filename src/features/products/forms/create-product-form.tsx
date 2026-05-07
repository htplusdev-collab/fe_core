import { GenericForm, TextField, SelectField, TextareaField } from '@shared/components/forms';
import { createProductSchema, type CreateProductFormValues } from '../validation';

const categoryOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Books', value: 'books' },
    { label: 'Home & Garden', value: 'home-garden' },
    { label: 'Sports', value: 'sports' },
];

interface CreateProductFormProps {
    onSubmit: (data: CreateProductFormValues) => void | Promise<void>;
    isSubmitting?: boolean;
}

export function CreateProductForm({ onSubmit, isSubmitting }: CreateProductFormProps) {
    return (
        <GenericForm
            schema={createProductSchema}
            onSubmit={onSubmit}
            submitLabel="Create Product"
            isSubmitting={isSubmitting}
            className="space-y-4"
        >
            {() => (
                <>
                    <TextField<CreateProductFormValues>
                        name="name"
                        label="Product Name"
                        placeholder="Enter product name"
                        required
                    />
                    <TextareaField<CreateProductFormValues>
                        name="description"
                        label="Description"
                        placeholder="Describe the product..."
                        required
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <TextField<CreateProductFormValues>
                            name="sku"
                            label="SKU"
                            placeholder="PRD-001"
                            required
                        />
                        <SelectField<CreateProductFormValues>
                            name="category"
                            label="Category"
                            options={categoryOptions}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField<CreateProductFormValues>
                            name="price"
                            label="Price"
                            type="number"
                            placeholder="0.00"
                            required
                        />
                        <TextField<CreateProductFormValues>
                            name="stock"
                            label="Stock"
                            type="number"
                            placeholder="0"
                            required
                        />
                    </div>
                </>
            )}
        </GenericForm>
    );
}
