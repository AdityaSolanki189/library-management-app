'use client';

import { addBookSchema } from '@repo/shared/schema';
import { Button } from '@repo/ui/button';
import Link from 'next/link';
import { createBook } from '../../../../actions/book';
import BookForm from '../../../../components/BookForm';

const Page = () => {
    return (
        <>
            <Button asChild className="back-btn">
                <Link href="/admin/books">Go Back</Link>
            </Button>

            <section className="w-full max-w-2xl">
                <BookForm
                    type="create"
                    schema={addBookSchema}
                    defaultValues={{
                        title: '',
                        description: '',
                        author: '',
                        genre: '',
                        rating: 1,
                        coverUrl: '',
                        videoUrl: '',
                        coverColor: '',
                        totalCopies: 1,
                        availableCopies: 1,
                        summary: '',
                    }}
                    onSubmit={createBook}
                />
            </section>
        </>
    );
};
export default Page;
