<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emp_salary_info', function (Blueprint $table) {
            $table->id('employee_salary_id');

            $table->unsignedBigInteger('employee_id');

            $table->decimal('base_salary', 12, 2)->default(0);

            $table->decimal('allowance', 12, 2)->default(0);
            $table->decimal('meal_allowance', 12, 2)->default(0);
            $table->decimal('transport_allowance', 12, 2)->default(0);
            $table->decimal('mobile_allowance', 12, 2)->default(0);

            $table->date('effective_from');

            $table->date('effective_to')->nullable();

            $table->boolean('is_active')->default(true);
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
        Schema::dropIfExists('emp_salary_info');
    }
};
