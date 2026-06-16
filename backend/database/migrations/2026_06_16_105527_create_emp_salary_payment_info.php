<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emp_salary_payment_info', function (Blueprint $table) {
            $table->id('payment_id');

            $table->unsignedBigInteger('employee_salary_id');

            $table->string('salary_month', 20);

            $table->decimal('salary_bonus', 12, 2)->default(0);
            $table->decimal('salary_deduction', 12, 2)->default(0);

            $table->decimal('gross_salary', 12, 2)->default(0);
            $table->decimal('paid_amount', 12, 2)->default(0);

            $table->date('payment_date')->nullable();

            $table->string('payment_status', 50)->default('pending');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();

            $table->foreign('employee_salary_id')
                ->references('employee_salary_id')
                ->on('emp_salary_info')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('emp_salary_payment_info');
    }
};