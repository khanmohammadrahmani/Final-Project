<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('suppliers_info', function (Blueprint $table) {
            $table->id('supplier_id');

            $table->string('supplier_name', 255);

            $table->string('supplier_phone', 30)->nullable();
            $table->string('supplier_email', 255)->nullable();

            $table->text('supplier_address')->nullable();

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suppliers_info');
    }
};
