'use client';

import { Book } from '@repo/shared/schema';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import BookCardActions from './BookCardActions';

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: 'title',
        header: 'Book Title',
    },
    {
        accessorKey: 'author',
        header: 'Author',
    },
    {
        header: 'Genre',
        accessorKey: 'genre',
    },
    {
        header: 'Date Created',
        accessorKey: 'createdAt',
        cell: ({ row }) => {
            const formattedDate = format(row.getValue('createdAt'), 'MM/dd/yyyy');
            return (
                <div>
                    {formattedDate}
                </div>
            );
        },
    },
    {
        header: 'Actions',
        cell: ({ row }) => {
            return (
                <div>
                    <BookCardActions
                        book={row.original}
                    />
                </div>
            );
        },
    },
];
