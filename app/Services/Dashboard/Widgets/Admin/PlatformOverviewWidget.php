<?php

namespace App\Services\Dashboard\Widgets\Admin;

use App\Models\User;
use App\Models\Role;
use App\Services\Dashboard\Widget;

class PlatformOverviewWidget implements Widget
{
    public function getKey(): string
    {
        return 'platform_overview';
    }

    public function authorize(User $user): bool
    {
        return $user->hasRole('super_admin') || $user->hasRole('admin');
    }

    public function getData(User $user): array
    {
        return [
            'total_users' => User::count(),
            'total_roles' => Role::count(),
            'active_sessions' => 15, // Dummy for now
            'revenue' => '$52,000',  // Dummy for now
        ];
    }

    public function getPriority(): int
    {
        return 10;
    }

    public function getCacheTTL(): ?int
    {
        return 60; // Cache for 1 minute
    }
}
