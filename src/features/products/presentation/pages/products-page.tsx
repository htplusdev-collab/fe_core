import { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@shared/components/ui';
import { PageHeader } from '@shared/components/layout';
import { ProductsTable, CreateProductDialog } from '../components';
import { type Product } from '../../domain';

export function ProductsPage() {
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    const handleEdit = useCallback((_product: Product) => {
        // TODO: implement edit dialog
    }, []);

    const handleDelete = useCallback((_product: Product) => {
        // TODO: implement delete confirmation
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Products"
                description="Manage your product catalog."
                actions={
                    <Button
                        onClick={() => {
                            setCreateDialogOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                }
            />
            <ProductsTable onEdit={handleEdit} onDelete={handleDelete} />
            <CreateProductDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
        </div>
    );
}
