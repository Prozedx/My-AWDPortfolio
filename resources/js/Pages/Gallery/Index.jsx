import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ galleryItems }) {
    const { flash } = usePage().props;

    function deleteItem(item) {
        if (window.confirm(`Delete "${item.title}" from the gallery?`)) {
            router.delete(route('gallery.destroy', item.id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gallery items
                </h2>
            }
        >
            <Head title="Manage gallery" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {flash.success && (
                        <div
                            className="rounded-md border border-green-200 bg-green-50 p-4 text-green-800"
                            role="status"
                        >
                            {flash.success}
                        </div>
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <Link
                            className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                            href={route('gallery.create')}
                        >
                            Add gallery item
                        </Link>
                        <Link
                            className="text-sm font-medium text-indigo-700 underline"
                            href="/#gallery"
                        >
                            View public gallery
                        </Link>
                    </div>

                    {galleryItems.length === 0 ? (
                        <div className="rounded-lg bg-white p-8 text-center text-gray-700 shadow-sm">
                            No gallery items yet. Add your first photo to get
                            started.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {galleryItems.map((item) => (
                                <article
                                    className="flex flex-col gap-5 rounded-lg bg-white p-5 shadow-sm sm:flex-row"
                                    key={item.id}
                                >
                                    <img
                                        className="h-48 w-full rounded-md object-cover sm:w-56"
                                        src={item.image_url}
                                        alt={item.title}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-start justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {item.category} ·{' '}
                                                    {item.date_taken}
                                                </p>
                                            </div>
                                            <div className="flex gap-3">
                                                <Link
                                                    className="font-medium text-indigo-700 underline"
                                                    href={route(
                                                        'gallery.edit',
                                                        item.id,
                                                    )}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="font-medium text-red-700 underline"
                                                    type="button"
                                                    onClick={() =>
                                                        deleteItem(item)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <p className="mt-3 whitespace-pre-line text-gray-700">
                                            {item.caption}
                                        </p>
                                        {item.location && (
                                            <p className="mt-2 text-sm text-gray-600">
                                                Location: {item.location}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
