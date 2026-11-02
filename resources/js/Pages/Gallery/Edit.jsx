import GalleryForm from '@/Components/GalleryForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ galleryItem }) {
    const form = useForm({
        title: galleryItem.title,
        caption: galleryItem.caption,
        image: null,
        category: galleryItem.category,
        date_taken: galleryItem.date_taken,
    });

    function submitForm(event) {
        event.preventDefault();
        form
            .transform((data) => ({ ...data, _method: 'put' }))
            .post(route('gallery.update', galleryItem.id), {
                forceFormData: true,
            });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit gallery item
                </h2>
            }
        >
            <Head title="Edit gallery item" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-6">
                            <Link
                                className="text-sm font-medium text-indigo-700 underline"
                                href={route('gallery.index')}
                            >
                                Back to gallery items
                            </Link>
                        </div>
                        <GalleryForm
                            form={form}
                            galleryItem={galleryItem}
                            onSubmit={submitForm}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
