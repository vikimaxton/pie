<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
        ]);

        // User::factory(10)->create();

        // Create specific users for each role
        $roles = ['super_admin', 'admin', 'mentor', 'student'];

        foreach ($roles as $slug) {
            $roleId = \Illuminate\Support\Facades\DB::table('roles')->where('slug', $slug)->value('id');
            
            User::firstOrCreate(
                ['email' => "{$slug}@example.com"],
                [
                    'name' => ucfirst(str_replace('_', ' ', $slug)),
                    'password' => bcrypt('password'),
                    'role_id' => $roleId,
                    'email_verified_at' => now(),
                ]
            );
        }

        // Keep the original test user as Super Admin for backward compatibility
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
                'role_id' => \Illuminate\Support\Facades\DB::table('roles')->where('slug', 'super_admin')->value('id'),
                'email_verified_at' => now(),
            ]
        );
    }
}
