'use client';

import { Book } from '@repo/shared/schema';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import BookCardActions from './BookCardActions';

export const columns: ColumnDef<Book>[] = [
    {
        accessorKey: 'title',
        header: () => <div className='text-left font-semibold bg-slate-200 p-2'>Book Title</div>,
    },
    {
        accessorKey: 'author',
        header: () => <div className='text-left font-semibold bg-slate-200 p-2'>Author</div>,
    },
    {
        accessorKey: 'genre',
        header: () => <div className='text-left font-semibold bg-slate-200 p-2'>Genre</div>,
    },
    {
        accessorKey: 'createdAt',
        header: () => <div className='text-left font-semibold bg-slate-200 p-2'>Date Created</div>,
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
        accessorKey: 'id',
        header: () => <div className='text-left font-semibold bg-slate-200 p-2'>Actions</div>,
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
