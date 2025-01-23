'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';

import { Button } from '@repo/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@repo/ui/form';
import { Input } from '@repo/ui/input';
import { toast } from '@repo/ui/sonner';
import { Textarea } from '@repo/ui/textarea';
import { useRouter } from 'next/navigation';
import ColorPicker from '../components/ColorPicker';

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    type: 'create' | 'update';
}

const BookForm = <T extends FieldValues>({
    type,
    schema,
    defaultValues,
    onSubmit,
}: Props<T>) => {
    const router = useRouter();

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    })

    const handleSubmit: SubmitHandler<T> = async (data) => {

        const result = await onSubmit(data);

        if (result?.success) {
            toast('Success', {
                description: `Added book successfully`,
            });

            router.push(`/admin/books`);
        } else {
            toast('Error', {
                description: result?.error || 'Failed to add book',
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-8"
            >
                <FormField
                    control={form.control}
                    name={'title' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Title
                            </FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="Book title"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'author' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Author
                            </FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="Book author"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'genre' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Genre
                            </FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="Book genre"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={'rating' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Rating
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={10}
                                    placeholder="Book rating"
                                    {...field}
                                    className="book-form_input"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={'totalCopies' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Total Copies
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={1}
                                    max={50}
                                    placeholder="Total copies"
                                    {...field}
                                    className="book-form_input"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={'coverUrl' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Image
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    min={1}
                                    max={100}
                                    placeholder="Image URL"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'coverColor' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Primary Color
                            </FormLabel>
                            <FormControl>
                                <ColorPicker
                                    onPickerChange={field.onChange}
                                    value={field.value}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'description' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Description
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Book description"
                                    {...field}
                                    rows={10}
                                    className="book-form_input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name={'videoUrl' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Trailer
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    min={1}
                                    max={100}
                                    placeholder="Video URL"
                                    {...field}
                                    className="book-form_input"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={'summary' as Path<T>}
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-1">
                            <FormLabel className="text-base font-normal text-dark-500">
                                Book Summary
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Book summary"
                                    {...field}
                                    rows={5}
                                    className="book-form_input"
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="book-form_btn text-white">
                    {type === 'create' ? 'Add Book' : 'Update Book'}
                </Button>
            </form>
        </Form>
    );
};
export default BookForm;
