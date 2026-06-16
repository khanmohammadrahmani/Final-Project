<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('company_documents', function (Blueprint $table) {
            $table->id('document_id');

            $table->unsignedBigInteger('company_id');

            $table->string('doc_name', 255);
            $table->text('doc_description')->nullable();
            $table->string('doc_file_url', 500);

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();

            $table->foreign('company_id')
                ->references('company_id')
                ->on('company_info')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_documents');
    }
};