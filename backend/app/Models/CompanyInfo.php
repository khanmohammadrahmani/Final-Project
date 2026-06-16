<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyInfo extends Model
{
    protected $table = 'company_info';

    protected $primaryKey = 'company_id';

    protected $fillable = [
        'company_name',
        'license_number',
        'license_expire_date',
        'company_phone',
        'company_email',
        'company_address',
        'company_logo_url',
    ];

    protected $casts = [
        'license_expire_date' => 'date',
    ];
}
