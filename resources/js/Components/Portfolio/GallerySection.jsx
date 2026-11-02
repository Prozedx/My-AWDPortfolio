import Card from '@/Components/Card';
import FilterButtonGroup from '@/Components/FilterButtonGroup';
import SectionDivider from '@/Components/SectionDivider';
import SectionTitle from '@/Components/SectionTitle';
import { useState } from 'react';

function formatGalleryDate(date) {
    return new Date(`${date}T00:00:00Z`).toLocaleDateString(undefined, {
        dateStyle: 'long',
        timeZone: 'UTC',
    });
}

export default function GallerySection({ galleryItems }) {
    const [galleryFilter, setGalleryFilter] = useState(null);
    const galleryCategories = [
        ...new Set(galleryItems.map(({ category }) => category)),
    ];
    const filteredItems = galleryItems.filter(
        ({ category }) => galleryFilter === null || category === galleryFilter,
    );

    return (
        <section
            className="relative min-h-[500px] scroll-mt-16 bg-white"
            id="gallery"
            aria-labelledby="gallery-title"
        >
            <div className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-12 sm:px-10 md:pb-24 md:pt-16 lg:px-16">
                <SectionTitle
                    id="gallery-title"
                    className="mx-auto mb-5 table rounded-md bg-[#c9dafa] px-6 py-3 text-3xl font-bold shadow-md sm:text-4xl"
                >
                    Gallery
                </SectionTitle>
                <p className="mb-6 text-center text-base text-gray-700 sm:text-lg">
                    Moments, projects, and memories.
                </p>
                <div className="mb-8">
                    <FilterButtonGroup
                        options={[
                            { value: null, label: 'All' },
                            ...galleryCategories.map((category) => ({
                                value: category,
                                label: category,
                            })),
                        ]}
                        value={galleryFilter}
                        onChange={setGalleryFilter}
                        label="Filter gallery by category"
                    />
                </div>
                {galleryItems.length === 0 ? (
                    <p className="rounded-md bg-[#dedede] p-8 text-center text-gray-700 shadow-sm">
                        The gallery is empty. Add your first photo to share it
                        here.
                    </p>
                ) : filteredItems.length === 0 ? (
                    <p className="text-center text-gray-700">
                        No photos in this category yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
                        {filteredItems.map((item) => (
                            <Card
                                key={item.id}
                                className="min-w-0 overflow-hidden rounded-md bg-[#dedede] shadow-md"
                            >
                                <img
                                    className="h-56 w-full object-cover sm:h-64"
                                    src={item.image_url}
                                    alt={item.title}
                                />
                                <div className="p-5">
                                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                        <span className="rounded-full bg-[#c9dafa] px-3 py-1 text-sm font-semibold">
                                            {item.category}
                                        </span>
                                        <time
                                            className="text-sm text-gray-600"
                                            dateTime={item.date_taken}
                                        >
                                            {formatGalleryDate(
                                                item.date_taken,
                                            )}
                                        </time>
                                    </div>
                                    <h3 className="text-xl font-bold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-base leading-relaxed text-gray-700">
                                        {item.caption}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
            <SectionDivider />
        </section>
    );
}
