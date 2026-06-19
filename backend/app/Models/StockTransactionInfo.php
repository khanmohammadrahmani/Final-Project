<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StockTransactionInfo extends Model
{
    protected $table = 'stock_transactions_info';

    protected $primaryKey = 'stock_transaction_id';

    public $timestamps = true;

    protected $fillable = [
        'material_id',
        'quantity',
        'stock_transaction_type',
        'stock_transaction_date',
        'is_deleted',
    ];

    protected $casts = [
        'stock_transaction_id'   => 'integer',
        'material_id'            => 'integer',

        'quantity'               => 'decimal:2',

        'stock_transaction_date' => 'date',

        'is_deleted'             => 'boolean',

        'created_at'             => 'datetime',
        'updated_at'             => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function materialInfo(): BelongsTo
    {
        return $this->belongsTo(
            MaterialInfo::class,
            'material_id',
            'material_id'
        );
    }
}
