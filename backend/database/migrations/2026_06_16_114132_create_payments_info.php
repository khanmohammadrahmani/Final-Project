<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments_info', function (Blueprint $table) {
            $table->id('payment_id');

            // FK reference (no strict constraint as per your pattern)
            $table->unsignedBigInteger('invoice_id');

            $table->decimal('payment_amount', 12, 2)->default(0);

            $table->date('payment_date');

            $table->string('payment_method', 50);

            $table->string('payment_status', 50)->default('pending');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments_info');
    }
};