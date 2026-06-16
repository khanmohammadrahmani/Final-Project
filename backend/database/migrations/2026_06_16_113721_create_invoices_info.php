<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices_info', function (Blueprint $table) {
            $table->id('invoice_id');

            // FK (logic reference only)
            $table->unsignedBigInteger('order_id');

            $table->decimal('invoice_amount', 12, 2)->default(0);

            $table->date('invoice_due_date');

            $table->text('invoice_description')->nullable();

            $table->string('invoice_status', 50)->default('pending');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices_info');
    }
};