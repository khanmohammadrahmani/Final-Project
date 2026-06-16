<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpenseInfo extends Model
{
    protected $table = 'expenses_info';

    protected $primaryKey = 'expense_id';

    public $timestamps = true;

    protected $fillable = [
        'expense_type',
        'expense_amount',
        'expense_date',
        'expense_description',
        'is_deleted',
    ];

    protected $casts = [
        'expense_id'     => 'integer',
        'expense_amount' => 'decimal:2',
        'expense_date'   => 'date',
        'is_deleted'     => 'boolean',
        'created_at'     => 'datetime',
        'updated_at'     => 'datetime',
    ];
}
