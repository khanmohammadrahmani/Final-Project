<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_info', function (Blueprint $table) {
            $table->id('equipment_id');

            $table->string('equip_name', 150);

            $table->string('equip_company', 150)->nullable();

            $table->string('equip_serial_number', 100)->nullable();

            $table->date('equip_purchase_date');

            $table->decimal('equip_purchase_price', 12, 2)->default(0);

            $table->string('equip_current_status', 50)->default('active');

            $table->boolean('is_deleted')->default(false);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_info');
    }
};
