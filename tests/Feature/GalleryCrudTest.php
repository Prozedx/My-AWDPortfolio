<?php

namespace Tests\Feature;

use App\Models\GalleryItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GalleryCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');
    }

    public function test_gallery_management_requires_authentication(): void
    {
        $this->get(route('gallery.index'))
            ->assertRedirect(route('login'));
    }

    public function test_gallery_items_are_created_and_displayed_on_the_portfolio(): void
    {
        $this->actingAs(User::factory()->create())
            ->post(route('gallery.store'), $this->galleryData())
            ->assertRedirect(route('gallery.index'))
            ->assertSessionHas('success', 'Gallery item created.');

        $item = GalleryItem::firstOrFail();

        $this->assertSame('First Gallery Photo', $item->title);
        $this->assertSame('Paris, France', $item->location);
        $this->assertStringStartsWith('gallery/', $item->image_path);
        Storage::disk('public')->assertExists($item->image_path);

        $this->get(route('gallery.index'))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Gallery/Index')
                ->where('flash.success', 'Gallery item created.')
            );

        $this->get('/')
            ->assertInertia(fn (Assert $page) => $page
                ->component('Portfolio')
                ->has('galleryItems', 1)
                ->where('galleryItems.0.title', 'First Gallery Photo')
                ->where('galleryItems.0.category', 'Travel')
                ->where('galleryItems.0.date_taken', '2025-03-15')
                ->where('galleryItems.0.location', 'Paris, France')
            );
    }

    public function test_create_and_edit_pages_are_distinct_inertia_pages(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->get(route('gallery.create'))
            ->assertInertia(fn (Assert $page) => $page->component('Gallery/Create'));

        $item = GalleryItem::create([
            'title' => 'Editable Photo',
            'caption' => 'An existing photo.',
            'image_path' => 'gallery/existing.png',
            'category' => 'Travel',
            'date_taken' => '2025-03-15',
            'location' => 'Paris, France',
        ]);

        $this->get(route('gallery.edit', $item))
            ->assertInertia(fn (Assert $page) => $page
                ->component('Gallery/Edit')
                ->where('galleryItem.id', $item->id)
            );
    }

    public function test_validation_errors_include_custom_messages_and_preserve_input(): void
    {
        $caption = str_repeat('c', 2001);

        $this->actingAs(User::factory()->create())
            ->from(route('gallery.create'))
            ->post(route('gallery.store'), [
                'title' => '',
                'caption' => $caption,
                'image' => UploadedFile::fake()->create('notes.txt', 10, 'text/plain'),
                'category' => str_repeat('x', 101),
                'date_taken' => 'not-a-date',
            ])
            ->assertRedirect(route('gallery.create'))
            ->assertSessionHasErrors([
                'title',
                'caption',
                'image',
                'category',
                'date_taken',
                'location',
            ])
            ->assertSessionHasErrors([
                'title' => 'Please enter a title for this gallery item.',
                'image' => 'Choose a JPG, PNG, or WebP image.',
            ])
            ->assertSessionHas('_old_input.caption', $caption);

        $this->assertDatabaseCount('gallery_items', 0);
    }

    public function test_gallery_titles_must_be_unique(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post(route('gallery.store'), $this->galleryData());

        $this->from(route('gallery.create'))
            ->post(route('gallery.store'), [
                ...$this->galleryData(),
                'image' => UploadedFile::fake()->createWithContent(
                    'second-photo.png',
                    base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lV8AAAAASUVORK5CYII='),
                ),
            ])
            ->assertRedirect(route('gallery.create'))
            ->assertSessionHasErrors([
                'title' => 'A gallery item already uses this title.',
            ]);

        $this->assertDatabaseCount('gallery_items', 1);
    }

    public function test_gallery_items_can_be_updated_and_deleted(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post(route('gallery.store'), $this->galleryData());
        $item = GalleryItem::firstOrFail();
        $oldImagePath = $item->image_path;

        $this->put(route('gallery.update', $item), [
            'title' => 'Updated Photo',
            'caption' => 'An updated caption.',
            'image' => UploadedFile::fake()->createWithContent(
                'updated-photo.png',
                base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lV8AAAAASUVORK5CYII='),
            ),
            'category' => 'Projects',
            'date_taken' => '2025-04-20',
            'location' => 'Home studio',
        ])->assertRedirect(route('gallery.index'))
            ->assertSessionHas('success', 'Gallery item updated.');

        $item->refresh();
        $this->assertSame('Updated Photo', $item->title);
        $this->assertSame('2025-04-20', $item->date_taken->format('Y-m-d'));
        $this->assertSame('Home studio', $item->location);
        $this->assertNotSame($oldImagePath, $item->image_path);
        Storage::disk('public')->assertMissing($oldImagePath);
        Storage::disk('public')->assertExists($item->image_path);

        $this->put(route('gallery.update', $item), [
            'title' => 'Updated Photo',
            'caption' => 'Keeping its own title is valid.',
            'category' => 'Projects',
            'date_taken' => '2025-04-20',
            'location' => 'Home studio',
        ])->assertRedirect(route('gallery.index'))
            ->assertSessionHas('success', 'Gallery item updated.');

        $this->delete(route('gallery.destroy', $item))
            ->assertRedirect(route('gallery.index'))
            ->assertSessionHas('success', 'Gallery item deleted.');

        $this->assertDatabaseMissing('gallery_items', ['id' => $item->id]);
        Storage::disk('public')->assertMissing($item->image_path);
    }

    private function galleryData(): array
    {
        return [
            'title' => 'First Gallery Photo',
            'caption' => 'A photo from the portfolio.',
            'image' => UploadedFile::fake()->createWithContent(
                'portfolio-photo.png',
                base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lV8AAAAASUVORK5CYII='),
            ),
            'category' => 'Travel',
            'date_taken' => '2025-03-15',
            'location' => 'Paris, France',
        ];
    }
}
