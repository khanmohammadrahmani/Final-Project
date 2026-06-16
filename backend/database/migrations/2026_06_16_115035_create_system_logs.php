<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('system_logs', function (Blueprint $table) {
            $table->id('log_id');

            $table->unsignedBigInteger('user_id')->nullable();

            $table->string('action', 100);

            $table->string('reference_table', 100)->nullable();

            $table->unsignedBigInteger('reference_record_id')->nullable();

            $table->text('old_value')->nullable();

            $table->text('new_value')->nullable();

            $table->timestamps(); // created_at only used, but keeping standard
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('system_logs');
    }
};
