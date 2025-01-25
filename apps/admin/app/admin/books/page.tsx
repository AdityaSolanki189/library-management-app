'use client';

import { Book } from '@repo/shared/schema';
import { Button } from '@repo/ui/button';
import { DataTable } from '@repo/ui/data-table';
import { toast } from '@repo/ui/sonner';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllBooks } from '../../../actions/book';
import { columns } from '../../../components/BookColumns';
import Loader from '../../../components/Loader';

const Page = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllBooks = async () => {
            const response = await getAllBooks();

            if (!response.success) {
                toast.error(response.error);
            }

            setBooks(response.books);
            setLoading(false);
        };

        fetchAllBooks();
    }, []);

    return (
        <section className="w-full rounded-2xl bg-white p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">All Books</h2>
                <Button className="bg-primary-admin p-2 rounded-sm" asChild>
                    <Link href="/admin/books/new" className="text-white">
                        + Create a New Book
                    </Link>
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <Loader />
                </div>
            ) : (
                <div className="mt-7 w-full overflow-hidden">
                    <DataTable data={books} columns={columns} />
                </div>
            )}
        </section>
    );
};

export default Page;
