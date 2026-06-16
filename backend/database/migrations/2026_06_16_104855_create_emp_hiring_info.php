<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emp_hiring_info', function (Blueprint $table) {
            $table->id('hiring_info_id');

            $table->unsignedBigInteger('employee_id');

            $table->string('position', 100);

            $table->string('employment_type', 50);

            $table->date('hire_date');

            $table->date('end_date')->nullable();

            $table->string('current_status', 50);

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();

            $table->foreign('employee_id')
                ->references('employee_id')
                ->on('employee_info')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emp_hiring_info');
    }
};