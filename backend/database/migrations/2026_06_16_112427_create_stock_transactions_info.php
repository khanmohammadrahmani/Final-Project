<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stock_transactions_info', function (Blueprint $table) {
            $table->id('stock_transaction_id');

            $table->unsignedBigInteger('material_id');

            $table->decimal('quantity', 12, 2)->default(0);

            $table->string('stock_transaction_type', 50);

            $table->date('stock_transaction_date');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();

            $table->foreign('material_id')
                ->references('material_id')
                ->on('materials_info')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_transactions_info');
    }
};