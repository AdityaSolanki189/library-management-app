"use client";

import { User } from '@repo/shared/schema';
import { DataTable } from '@repo/ui/data-table';
import { toast } from '@repo/ui/sonner';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../actions/user';
import Loader from '../../../components/Loader';
import { columns } from '../../../components/UserColumns';

const page = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await getAllUsers();

            if (!response.success) {
                toast('Error', {
                    description: response.error,
                });
            }

            setUsers(response.users);
            setLoading(false);
        };

        fetchAllUsers();
    }, []);

    return (
        <section className="w-full rounded-2xl bg-white p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">All Users</h2>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-96">
                    <Loader />
                </div>
            ) : (
                <div className="mt-7 w-full overflow-hidden">
                    <DataTable data={users} columns={columns} />
                </div>
            )}
        </section>
    );
};

export default page;
