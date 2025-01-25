'use client';

import { User } from '@repo/shared/schema';
import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import { getInitials } from '@repo/ui/global.css';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import UserCardActions from './UserCardActions';
import linkLogo from '@repo/ui/icons/admin/link.svg';

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'fullName',
        header: () => (
            <div className="text-left font-semibold bg-slate-200 p-2">
                User Info
            </div>
        ),
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="user flex gap-2 ml-2 my-2">
                    <Avatar>
                        <AvatarFallback className="bg-amber-100 rounded-full size-11">
                            {getInitials(user?.fullName || 'IN')}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col max-md:hidden">
                        <div className="font-semibold text-dark-200">
                            {user?.fullName}
                            <span
                                className={`ml-4 rounded-full bg-slate-100 px-2 text-xs ${user.isVerified ? 'text-green-600' : 'text-red-600'} `}
                            >
                                {user?.isVerified ? 'Verified' : 'Unverified'}
                            </span>
                        </div>
                        <p className="text-xs text-light-500">{user?.email}</p>
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'createdAt',
        header: () => (
            <div className="text-left font-semibold bg-slate-200 p-2">
                Date Joined
            </div>
        ),
        cell: ({ row }) => {
            const formattedDate = format(row.getValue('createdAt'), 'PPP');
            return <div className="ml-2">{formattedDate}</div>;
        },
    },
    {
        accessorKey: 'isAdmin',
        header: () => (
            <div className="text-left font-semibold bg-slate-200 p-2">Role</div>
        ),
        cell: ({ row }): JSX.Element => {
            const isAdmin = row.getValue('isAdmin');
            return (
                <div className="flex ml-2">
                    <div
                        className={`px-2 py-1 rounded-full ${isAdmin ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} font-ibm-plex-sans text-sm`}
                    >
                        {isAdmin ? 'Admin' : 'User'}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'universityId',
        header: () => (
            <div className="text-left font-semibold bg-slate-200 p-2">
                University ID
            </div>
        ),
        cell: ({ row }) => {
            return <div className="ml-2">{row.getValue('universityId')}</div>;
        },
    },
    {
        accessorKey: 'universityCard',
        header: () => (
            <div className="text-left font-semibold bg-slate-200 p-2">
                University Card
            </div>
        ),
        cell: ({ row }) => {
            return (
                <Link href={''} className="flex gap-2">
                    <span className="text-blue-600 ml-2 font-semibold">
                        View ID Card
                    </span>
                    <Image
                        src={linkLogo}
                        alt="University Card"
                        width={16}
                        height={16}
                    />
                </Link>
            );
        },
    },
    {
        accessorKey: 'id',
        header: () => (
            <div className="text-left font-semibold bg-slate-200 p-2">
                Actions
            </div>
        ),
        cell: ({ row }) => {
            return (
                <div className="flex justify-center">
                    <UserCardActions user={row.original} />
                </div>
            );
        },
    },
];
