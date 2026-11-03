<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('gallery_items', 'location')) {
            Schema::table('gallery_items', function (Blueprint $table) {
                $table->string('location', 100)->nullable()->after('category');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('gallery_items', 'location')) {
            Schema::table('gallery_items', function (Blueprint $table) {
                $table->dropColumn('location');
            });
        }
    }
};
