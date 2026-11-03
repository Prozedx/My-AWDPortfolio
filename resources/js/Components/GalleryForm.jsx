import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function GalleryForm({ form, galleryItem, onSubmit }) {
    return (
        <form className="space-y-6" onSubmit={onSubmit}>
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    className="mt-1 block w-full"
                    value={form.data.title}
                    onChange={(event) =>
                        form.setData('title', event.target.value)
                    }
                    maxLength={150}
                    required
                />
                <InputError className="mt-2" message={form.errors.title} />
            </div>

            <div>
                <InputLabel htmlFor="caption" value="Caption" />
                <textarea
                    id="caption"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows="4"
                    maxLength={2000}
                    value={form.data.caption}
                    onChange={(event) =>
                        form.setData('caption', event.target.value)
                    }
                    required
                />
                <InputError className="mt-2" message={form.errors.caption} />
            </div>

            <div>
                <InputLabel htmlFor="category" value="Category" />
                <TextInput
                    id="category"
                    className="mt-1 block w-full"
                    value={form.data.category}
                    onChange={(event) =>
                        form.setData('category', event.target.value)
                    }
                    maxLength={100}
                    required
                />
                <InputError className="mt-2" message={form.errors.category} />
            </div>

            <div>
                <InputLabel htmlFor="date_taken" value="Date taken" />
                <TextInput
                    id="date_taken"
                    type="date"
                    className="mt-1 block w-full"
                    value={form.data.date_taken}
                    onChange={(event) =>
                        form.setData('date_taken', event.target.value)
                    }
                    required
                />
                <InputError className="mt-2" message={form.errors.date_taken} />
            </div>

            <div>
                <InputLabel htmlFor="location" value="Location" />
                <TextInput
                    id="location"
                    className="mt-1 block w-full"
                    value={form.data.location}
                    onChange={(event) =>
                        form.setData('location', event.target.value)
                    }
                    maxLength={100}
                    required
                />
                <InputError className="mt-2" message={form.errors.location} />
            </div>


            <div>
                <InputLabel htmlFor="image" value="Image" />
                {galleryItem && (
                    <img
                        className="mb-3 mt-2 h-40 rounded-md object-cover"
                        src={galleryItem.image_url}
                        alt={galleryItem.title}
                    />
                )}
                <input
                    id="image"
                    className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-[#c9dafa] file:px-4 file:py-2 file:font-semibold"
                    type="file"
                    onChange={(event) =>
                        form.setData('image', event.target.files[0] ?? null)
                    }
                    required={!galleryItem}
                />
                <p className="mt-1 text-sm text-gray-600">
                    JPG, PNG, or WebP; maximum file size 5 MB.
                    {galleryItem && ' Leave blank to keep the current image.'}
                </p>
                <InputError className="mt-2" message={form.errors.image} />
            </div>

            <PrimaryButton disabled={form.processing}>
                {form.processing
                    ? 'Saving...'
                    : galleryItem
                      ? 'Save changes'
                      : 'Add to gallery'}
            </PrimaryButton>
        </form>
    );
}
