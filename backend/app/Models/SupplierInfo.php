<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupplierInfo extends Model
{
    protected $table = 'suppliers_info';

    protected $primaryKey = 'supplier_id';

    public $timestamps = true;

    protected $fillable = [
        'supplier_name',
        'supplier_phone',
        'supplier_email',
        'supplier_address',
        'is_deleted',
    ];

    protected $casts = [
        'supplier_id' => 'integer',
        'is_deleted'  => 'boolean',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];
}
