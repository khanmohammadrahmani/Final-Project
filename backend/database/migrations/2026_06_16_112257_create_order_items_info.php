<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items_info', function (Blueprint $table) {
            $table->id('order_item_id');

            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('material_id');

            $table->decimal('order_item_quantity', 12, 2)->default(0);
            $table->decimal('order_item_unit_price', 12, 2)->default(0);

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();

            // FK constraints (recommended)
            $table->foreign('order_id')
                ->references('order_id')
                ->on('orders_info')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreign('material_id')
                ->references('material_id')
                ->on('materials_info')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items_info');
    }
};