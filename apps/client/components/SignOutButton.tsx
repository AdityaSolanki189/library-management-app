'use client';

import { signout } from '../actions/auth';

function SignOutButton() {
    const handleOnSignOut = async () => {
        await signout();
    };

    return (
        <button
            type="button"
            className="border border-primary text-light-100 rounded-full px-2 py-1 shadow-md font-ibm-plex-sans text-sm hover:bg-primary hover:text-black"
            onClick={handleOnSignOut}
        >
            Sign Out
        </button>
    );
}

export default SignOutButton;
