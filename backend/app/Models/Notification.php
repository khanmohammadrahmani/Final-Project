<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $table = 'notifications';

    protected $primaryKey = 'notification_id';

    public $timestamps = false; // because only created_at exists

    protected $fillable = [
        'recipient_id',
        'recipient_type',
        'notification_title',
        'notification_message',
        'is_read',
    ];

    protected $casts = [
        'notification_id' => 'integer',
        'recipient_id'    => 'integer',

        'is_read'         => 'boolean',

        'created_at'      => 'datetime',
    ];
}
