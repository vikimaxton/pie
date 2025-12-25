<?php

namespace App\Services\Dashboard\Widgets\Mentor;

use App\Models\User;
use App\Services\Dashboard\Widget;

class MyCoursesWidget implements Widget
{
    public function getKey(): string
    {
        return 'my_courses';
    }

    public function authorize(User $user): bool
    {
        return $user->hasRole('mentor');
    }

    public function getData(User $user): array
    {
        // In real app: $user->courses()->get()
        return [
            'courses' => [
                ['id' => 1, 'title' => 'Advanced Laravel Architecture', 'students' => 120],
                ['id' => 2, 'title' => 'React & Inertia Mastery', 'students' => 85],
            ]
        ];
    }

    public function getPriority(): int
    {
        return 10;
    }

    public function getCacheTTL(): ?int
    {
        return null; // Real-time
    }
}
