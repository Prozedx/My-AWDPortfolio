<?php

namespace App\Http\Requests;

use App\Models\GalleryItem;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GalleryItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * @return array<string, array<int, mixed>>
     */
    public function rules(): array
    {
        $galleryItem = $this->route('galleryItem');

        return [
            'title' => [
                'required',
                'string',
                'max:150',
                Rule::unique('gallery_items', 'title')->ignore(
                    $galleryItem instanceof GalleryItem ? $galleryItem->id : null,
                ),
            ],
            'caption' => ['required', 'string', 'max:2000'],
            'image' => [
                $galleryItem ? 'nullable' : 'required',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
            'category' => ['required', 'string', 'max:100'],
            'date_taken' => ['required', 'date_format:Y-m-d'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Please enter a title for this gallery item.',
            'title.unique' => 'A gallery item already uses this title.',
            'image.required' => 'Please choose an image to upload.',
            'image.image' => 'The uploaded file must be a valid image.',
            'image.mimes' => 'Choose a JPG, PNG, or WebP image.',
            'image.max' => 'The image must be 5 MB or smaller.',
            'date_taken.date_format' => 'Enter the date in a valid YYYY-MM-DD format.',
        ];
    }
}
