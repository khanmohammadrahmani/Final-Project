<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SystemLog extends Model
{
    protected $table = 'system_logs';

    protected $primaryKey = 'log_id';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'action',
        'reference_table',
        'reference_record_id',
        'old_value',
        'new_value',
    ];

    protected $casts = [
        'log_id'              => 'integer',
        'user_id'             => 'integer',
        'reference_record_id' => 'integer',

        'created_at'          => 'datetime',
        'updated_at'          => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function user(): BelongsTo
    {
        return $this->belongsTo(
            User::class,
            'user_id',
            'user_id'
        );
    }
}
