<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emp_work_experience_info', function (Blueprint $table) {
            $table->id('experience_id');

            $table->unsignedBigInteger('employee_id');

            $table->string('job_title', 150);

            $table->text('responsibilities')->nullable();
            $table->text('experience_description')->nullable();

            $table->date('start_date');
            $table->date('end_date')->nullable();

            $table->string('organization', 255);
            $table->text('organization_address')->nullable();

            $table->string('reference_email', 255)->nullable();
            $table->string('reference_phone', 30)->nullable();

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
        Schema::dropIfExists('emp_work_experience_info');
    }
};