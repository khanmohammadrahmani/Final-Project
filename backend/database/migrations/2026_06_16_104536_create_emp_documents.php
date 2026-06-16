<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('emp_documents', function (Blueprint $table) {
            $table->id('document_id');

            $table->unsignedBigInteger('employee_id');

            $table->string('doc_name', 255);
            $table->text('doc_description')->nullable();
            $table->string('doc_file_url', 500);

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
        Schema::dropIfExists('emp_documents');
    }
};