import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const { auth } = usePage().props;
    const href = auth.user ? route('gallery.index') : route('login');

    return (
        <footer
            className="flex h-9 items-center justify-end bg-[#a8c7ff] px-4 sm:px-8"
            aria-label="End of page"
        >
            <Link
                className="text-xs text-[#526f92] opacity-70 transition hover:opacity-100"
                href={href}
                title={auth.user ? 'Manage gallery' : 'Admin login'}
            >
                Admin
            </Link>
        </footer>
    );
}
