import GalleryForm from '@/Components/GalleryForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const form = useForm({
        title: '',
        caption: '',
        image: null,
        category: '',
        date_taken: '',
        location: '',
    });

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Add gallery item
                </h2>
            }
        >
            <Head title="Add gallery item" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-sm sm:p-8">
                        <div className="mb-6">
                            <Link
                                className="text-sm font-medium text-indigo-700 underline"
                                href={route('gallery.index')}
                            >
                                Back to gallery management
                            </Link>
                        </div>
                        <GalleryForm
                            form={form}
                            galleryItem={null}
                            onSubmit={(event) => {
                                event.preventDefault();
                                form.post(route('gallery.store'), {
                                    forceFormData: true,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
