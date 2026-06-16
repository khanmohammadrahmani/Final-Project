<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyDocuments extends Model
{
    protected $table = 'company_documents';

    protected $primaryKey = 'document_id';

    public $timestamps = true;

    protected $fillable = [
        'company_id',
        'doc_name',
        'doc_description',
        'doc_file_url',
        'is_deleted',
    ];

    protected $casts = [
        'company_id' => 'integer',
        'is_deleted' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Document belongs to a company.
     */
    public function companyInfo(): BelongsTo
    {
        return $this->belongsTo(
            CompanyInfo::class,
            'company_id',
            'company_id'
        );
    }
}
