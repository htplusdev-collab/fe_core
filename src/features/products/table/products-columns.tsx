import { type ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { Badge, Button } from '@shared/components/ui';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@shared/components/ui';
import { DataTableColumnHeader } from '@shared/components/data-table';
import { type Product } from '../domain';
import { formatDate } from '@shared/lib/utils';

const statusVariantMap = {
    published: 'default',
    draft: 'secondary',
    archived: 'outline',
} as const;

interface ProductColumnsOptions {
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export function createProductColumns({
    onEdit,
    onDelete,
}: ProductColumnsOptions): ColumnDef<Product>[] {
    return [
        {
            accessorKey: 'name',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Product" />,
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                    </div>
                );
            },
        },
        {
            accessorKey: 'category',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
            cell: ({ row }) => <Badge variant="outline">{row.original.category}</Badge>,
        },
        {
            accessorKey: 'price',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
            cell: ({ row }) => row.original.formattedPrice,
        },
        {
            accessorKey: 'stock',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
            cell: ({ row }) => {
                const stock = row.original.stock;
                return (
                    <span className={stock === 0 ? 'text-destructive font-medium' : ''}>
                        {stock}
                    </span>
                );
            },
        },
        {
            accessorKey: 'status',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
            cell: ({ row }) => {
                const status = row.original.status;
                return <Badge variant={statusVariantMap[status]}>{status}</Badge>;
            },
        },
        {
            accessorKey: 'createdAt',
            header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
            cell: ({ row }) => formatDate(row.original.createdAt),
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const product = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    onEdit(product);
                                }}
                            >
                                Edit product
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => {
                                    onDelete(product);
                                }}
                            >
                                Delete product
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}
