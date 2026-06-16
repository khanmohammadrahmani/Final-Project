<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PaymentInfo extends Model
{
    protected $table = 'payments_info';

    protected $primaryKey = 'payment_id';

    public $timestamps = true;

    protected $fillable = [
        'invoice_id',
        'payment_amount',
        'payment_date',
        'payment_method',
        'payment_status',
        'is_deleted',
    ];

    protected $casts = [
        'payment_id'     => 'integer',
        'invoice_id'     => 'integer',

        'payment_amount' => 'decimal:2',

        'payment_date'   => 'date',

        'is_deleted'     => 'boolean',

        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function invoiceInfo(): BelongsTo
    {
        return $this->belongsTo(
            InvoiceInfo::class,
            'invoice_id',
            'invoice_id'
        );
    }
}
