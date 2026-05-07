import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@shared/components/ui';
import { CreateProductForm } from '../../forms';
import { useCreateProductMutation } from '../../hooks';
import { type CreateProductFormValues } from '../../validation';

interface CreateProductDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateProductDialog({ open, onOpenChange }: CreateProductDialogProps) {
    const createMutation = useCreateProductMutation();

    const handleSubmit = async (data: CreateProductFormValues) => {
        await createMutation.mutateAsync({
            name: data.name,
            description: data.description,
            sku: data.sku,
            price: data.price,
            stock: data.stock,
            category: data.category,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                    <DialogDescription>
                        Add a new product to the catalog. Fill in the details below.
                    </DialogDescription>
                </DialogHeader>
                <CreateProductForm
                    onSubmit={handleSubmit}
                    isSubmitting={createMutation.isPending}
                />
            </DialogContent>
        </Dialog>
    );
}
