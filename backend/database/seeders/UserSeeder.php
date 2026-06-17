<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'customer_id'      => null,
            'employee_id'      => null,

            'user_name'        => 'Admin User',

            'password_hash'    => Hash::make('12345678'),

            'user_email'       => 'admin@gmail.com',

            'failed_attempts'  => 0,

            'time_range_start' => null,
            'time_range_end'   => null,

            'user_role'        => 'Admin',

            'is_active'        => true,

            'user_photo_url'   => null,
        ]);
    }
}
