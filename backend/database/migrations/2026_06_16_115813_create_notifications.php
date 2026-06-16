<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notification_id');

            // Nullable FK as requested
            $table->unsignedBigInteger('recipient_id')->nullable();

            $table->string('recipient_type', 50);

            $table->string('notification_title', 255);

            $table->text('notification_message');

            $table->boolean('is_read')->default(false);

            $table->timestamp('created_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};