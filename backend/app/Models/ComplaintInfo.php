<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComplaintInfo extends Model
{
    protected $table = 'complaints_info';

    protected $primaryKey = 'complaint_id';

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'complaint_type',
        'subject',
        'description',
        'attachment_url',
        'status',
        'is_deleted',
    ];

    protected $casts = [
        'complaint_id' => 'integer',
        'user_id'      => 'integer',

        'is_deleted'   => 'boolean',

        'created_at'   => 'datetime',
        'updated_at'   => 'datetime',
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
