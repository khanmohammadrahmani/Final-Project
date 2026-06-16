<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders_info', function (Blueprint $table) {
            $table->id('order_id');

            $table->unsignedBigInteger('supplier_id')->nullable();
            $table->unsignedBigInteger('customer_id')->nullable();

            $table->string('order_type', 50);

            $table->date('order_date');

            $table->decimal('total_amount', 12, 2)->default(0);

            $table->string('order_status', 50)->default('pending');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();

            $table->foreign('supplier_id')
                ->references('supplier_id')
                ->on('suppliers_info')
                ->cascadeOnUpdate()
                ->nullOnDelete();

            $table->foreign('customer_id')
                ->references('customer_id')
                ->on('customer_info')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders_info');
    }
};