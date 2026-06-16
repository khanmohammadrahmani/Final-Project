<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_usage_info', function (Blueprint $table) {
            $table->id('equipment_usage_id');

            $table->unsignedBigInteger('equipment_id');
            $table->unsignedBigInteger('employee_id');

            $table->date('usage_start_date');
            $table->date('usage_end_date')->nullable();

            $table->text('usage_description')->nullable();

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_usage_info');
    }
};