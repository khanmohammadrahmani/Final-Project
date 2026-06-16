<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('employee_info', function (Blueprint $table) {
            $table->id('employee_id');

            $table->string('emp_full_name', 255);
            $table->string('emp_father_name', 255)->nullable();

            $table->string('emp_nid_number', 100)->nullable();

            $table->date('emp_dob')->nullable();

            $table->string('emp_gender', 20)->nullable();
            $table->string('emp_marital_status', 20)->nullable();

            $table->string('emp_phone', 30)->nullable();
            $table->string('emp_email', 255)->nullable();

            $table->text('emp_permanent_address')->nullable();
            $table->text('emp_current_address')->nullable();

            $table->string('emp_bank_account', 100)->nullable();

            $table->string('emp_photo_url', 500)->nullable();

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employee_info');
    }
};