<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_info', function (Blueprint $table) {
            $table->id('customer_id');

            $table->string('cust_full_name', 255);

            $table->string('cust_father_name', 255)->nullable();

            $table->string('cust_nid_number', 100)->nullable();

            $table->date('cust_dob')->nullable();

            $table->string('cust_gender', 20)->nullable();

            $table->string('cust_phone', 30)->nullable();

            $table->string('cust_email', 255)->nullable();

            $table->text('cust_address')->nullable();

            $table->string('cust_current_status', 50)->default('active');

            $table->string('cust_photo_url', 500)->nullable();

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_info');
    }
};
