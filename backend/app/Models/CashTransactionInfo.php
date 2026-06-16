<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CashTransactionInfo extends Model
{
    protected $table = 'cash_transactions_info';

    protected $primaryKey = 'transaction_id';

    public $timestamps = true;

    protected $fillable = [
        'reference_type',
        'reference_id',
        'transaction_type',
        'amount',
        'transaction_description',
        'transaction_date',
        'is_deleted',
    ];

    protected $casts = [
        'transaction_id'   => 'integer',
        'reference_id'     => 'integer',

        'amount'           => 'decimal:2',

        'transaction_date' => 'date',

        'is_deleted'       => 'boolean',

        'created_at'       => 'datetime',
        'updated_at'       => 'datetime',
    ];
}
