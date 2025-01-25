import home from '@repo/ui/icons/admin/home.svg';
import users from '@repo/ui/icons/admin/users.svg';
import book from '@repo/ui/icons/admin/book.svg';
import bookmark from '@repo/ui/icons/admin/bookmark.svg';
import user from '@repo/ui/icons/admin/user.svg';

export const adminSideBarLinks = [
    {
        img: home,
        route: '/admin',
        text: 'Home',
    },
    {
        img: users,
        route: '/admin/users',
        text: 'All Users',
    },
    {
        img: book,
        route: '/admin/books',
        text: 'All Books',
    },
    {
        img: bookmark,
        route: '/admin/book-requests',
        text: 'Borrow Requests',
    },
    {
        img: user,
        route: '/admin/account-requests',
        text: 'Account Requests',
    },
];
