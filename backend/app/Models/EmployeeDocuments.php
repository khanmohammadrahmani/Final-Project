<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EmployeeDocuments extends Model
{
    protected $table = 'emp_documents';

    protected $primaryKey = 'document_id';

    public $timestamps = true;

    protected $fillable = [
        'employee_id',
        'doc_name',
        'doc_description',
        'doc_file_url',
        'is_deleted',
    ];

    protected $casts = [
        'employee_id' => 'integer',
        'is_deleted'  => 'boolean',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function employeeInfo(): BelongsTo
    {
        return $this->belongsTo(
            EmployeeInfo::class,
            'employee_id',
            'employee_id'
        );
    }
}
