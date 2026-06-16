<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CustomerInfo extends Model
{
    protected $table = 'customer_info';

    protected $primaryKey = 'customer_id';

    public $timestamps = true;

    protected $fillable = [
        'cust_full_name',
        'cust_father_name',
        'cust_nid_number',
        'cust_dob',
        'cust_gender',
        'cust_phone',
        'cust_email',
        'cust_address',
        'cust_current_status',
        'cust_photo_url',
        'is_deleted',
    ];

    protected $casts = [
        'customer_id' => 'integer',
        'cust_dob'    => 'date',
        'is_deleted'  => 'boolean',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function users(): HasMany
    {
        return $this->hasMany(
            Users::class,
            'customer_id',
            'customer_id'
        );
    }
}
