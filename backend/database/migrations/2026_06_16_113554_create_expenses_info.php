<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('expenses_info', function (Blueprint $table) {
            $table->id('expense_id');

            $table->string('expense_type', 100);

            $table->decimal('expense_amount', 12, 2)->default(0);

            $table->date('expense_date');

            $table->text('expense_description')->nullable();

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('expenses_info');
    }
};