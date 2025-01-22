'use client';

import { Avatar, AvatarFallback } from '@repo/ui/avatar';
import logo from "@repo/ui/icons/admin/logo.svg";
import { cn, getInitials } from '@repo/ui/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '../actions/user';
import { adminSideBarLinks } from '../lib/constants';
import SignOutButton from './SignOutButton';

const Sidebar = ({ user }: { user: User }) => {
    const pathname = usePathname();
    return (
        <div className="admin-sidebar">
            <div>
                <div className="logo">
                    <Image
                        src={logo}
                        alt="logo"
                        height={42}
                        width={42}
                    />
                    <h1>BookWise</h1>
                </div>

                <div className="mt-10 flex flex-col gap-5">
                    {adminSideBarLinks.map((link) => {
                        const isSelected =
                            (link.route !== '/admin' &&
                                pathname.includes(link.route) &&
                                link.route.length > 1) ||
                            pathname === link.route;

                        return (
                            <Link href={link.route} key={link.route}>
                                <div
                                    className={cn(
                                        'link',
                                        isSelected &&
                                            'bg-primary-admin shadow-sm',
                                    )}
                                >
                                    <div className="relative size-5">
                                        <Image
                                            src={link.img}
                                            alt="icon"
                                            fill
                                            className={`${isSelected ? 'brightness-0 invert' : ''}  object-contain`}
                                        />
                                    </div>

                                    <p
                                        className={cn(
                                            isSelected
                                                ? 'text-white'
                                                : 'text-dark',
                                        )}
                                    >
                                        {link.text}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className='mt-10 border-t border-red-400 border-dashed pt-4'>
                    <SignOutButton />
                </div>
            </div>

            <div className="user">
                <Avatar>
                    <AvatarFallback className="bg-amber-100 rounded-full size-11">
                        {getInitials(user?.name || 'IN')}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col max-md:hidden">
                    <p className="font-semibold text-dark-200">
                        {user?.name}
                    </p>
                    <p className="text-xs text-light-500">
                        {user?.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
