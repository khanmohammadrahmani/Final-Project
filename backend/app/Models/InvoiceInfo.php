<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvoiceInfo extends Model
{
    protected $table = 'invoices_info';

    protected $primaryKey = 'invoice_id';

    public $timestamps = true;

    protected $fillable = [
        'order_id',
        'invoice_amount',
        'invoice_due_date',
        'invoice_description',
        'invoice_status',
        'is_deleted',
    ];

    protected $casts = [
        'invoice_id'       => 'integer',
        'order_id'         => 'integer',

        'invoice_amount'   => 'decimal:2',

        'invoice_due_date' => 'date',

        'is_deleted'       => 'boolean',

        'created_at'       => 'datetime',
        'updated_at'       => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function orderInfo(): BelongsTo
    {
        return $this->belongsTo(
            OrderInfo::class,
            'order_id',
            'order_id'
        );
    }
}
