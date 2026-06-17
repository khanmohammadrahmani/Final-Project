<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_info', function (Blueprint $table) {
            $table->id('company_id');

            $table->string('company_name', 255);
            $table->string('license_number', 100)->nullable();
            $table->date('license_expire_date')->nullable();

            $table->string('company_phone', 30)->nullable();
            $table->string('company_email', 255)->nullable();
            $table->text('company_address')->nullable();

            $table->string('company_logo_url', 500)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_info');
    }
};
