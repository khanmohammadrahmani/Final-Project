<?php
namespace App\Models;

use App\Models\InvoiceInfo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
// ✅ MUST HAVE

class PaymentInfo extends Model
{
    protected $table = 'payments_info';

    protected $primaryKey = 'payment_id';

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

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(
            InvoiceInfo::class,
            'invoice_id',
            'invoice_id'
        );
    }
}
