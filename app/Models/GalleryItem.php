<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    protected $appends = ['image_url'];

    protected $fillable = [
        'title',
        'caption',
        'image_path',
        'category',
        'date_taken',
    ];

    protected function casts(): array
    {
        return [
            'date_taken' => 'date:Y-m-d',
        ];
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn () => url('/storage/'.$this->image_path));
    }
}
