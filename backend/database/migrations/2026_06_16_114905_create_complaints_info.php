<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('complaints_info', function (Blueprint $table) {
            $table->id('complaint_id');

            // FK (NOT NULL as requested)
            $table->unsignedBigInteger('user_id');

            $table->string('complaint_type', 100);

            $table->string('subject', 255);

            $table->text('description');

            $table->string('attachment_url', 500)->nullable();

            $table->string('status', 50)->default('pending');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('complaints_info');
    }
};