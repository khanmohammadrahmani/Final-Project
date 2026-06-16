<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_maintenance_info', function (Blueprint $table) {
            $table->id('equip_maintenance_id');

            $table->unsignedBigInteger('equipment_id');

            $table->decimal('maintenance_cost', 12, 2)->default(0);

            $table->date('maintenance_date');

            $table->text('maintenance_description')->nullable();

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_maintenance_info');
    }
};