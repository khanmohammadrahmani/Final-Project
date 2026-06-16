<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cash_transactions_info', function (Blueprint $table) {
            $table->id('transaction_id');

            $table->string('reference_type', 50);

            $table->unsignedBigInteger('reference_id');

            $table->string('transaction_type', 50);

            $table->decimal('amount', 12, 2)->default(0);

            $table->text('transaction_description')->nullable();

            $table->date('transaction_date');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cash_transactions_info');
    }
};
