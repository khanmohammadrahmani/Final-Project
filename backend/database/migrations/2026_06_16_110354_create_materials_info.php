<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('materials_info', function (Blueprint $table) {
            $table->id('material_id');

            $table->string('material_name', 255);

            $table->string('material_unit', 50);

            $table->decimal('current_stock', 12, 2)->default(0);

            $table->decimal('unit_price', 12, 2)->default(0);

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('materials_info');
    }
};