<?php

namespace App\Services\Dashboard\Widgets\Student;

use App\Models\User;
use App\Services\Dashboard\Widget;

class TodaysStudyPlanWidget implements Widget
{
    public function getKey(): string
    {
        return 'todays_study_plan';
    }

    public function authorize(User $user): bool
    {
        return $user->hasRole('student');
    }

    public function getData(User $user): array
    {
        return [
            'tasks' => [
                'Watch: Dependency Injection',
                'Read: Service Container',
                'Quiz: Chapter 3'
            ],
            'estimated_time' => '1h 30m'
        ];
    }

    public function getPriority(): int
    {
        return 20;
    }

    public function getCacheTTL(): ?int
    {
        return 3600; // Daily cache
    }
}
