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

            // وروسته به FK شي
            $table->unsignedBigInteger('company_id');

            $table->string('doc_name', 255);

            $table->text('doc_description')->nullable();

            $table->string('doc_file_url');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('company_documents');
    }
};