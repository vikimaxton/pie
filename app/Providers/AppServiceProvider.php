<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(\App\Services\Dashboard\WidgetManager::class, function ($app) {
            $manager = new \App\Services\Dashboard\WidgetManager();
            
            // Register Admin Widgets
            $manager->register(\App\Services\Dashboard\Widgets\Admin\PlatformOverviewWidget::class);
            $manager->register(\App\Services\Dashboard\Widgets\Admin\UserActivityWidget::class);
            
            // Register Mentor Widgets
            $manager->register(\App\Services\Dashboard\Widgets\Mentor\MyCoursesWidget::class);
            $manager->register(\App\Services\Dashboard\Widgets\Mentor\StudentProgressTrackerWidget::class);
            
            // Register Student Widgets
            $manager->register(\App\Services\Dashboard\Widgets\Student\MyLearningProgressWidget::class);
            $manager->register(\App\Services\Dashboard\Widgets\Student\TodaysStudyPlanWidget::class);
            
            return $manager;
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Illuminate\Support\Facades\Gate::define('access-admin-panel', function ($user) {
            return $user->hasRole('super_admin') || $user->hasRole('admin');
        });

        \Illuminate\Support\Facades\Gate::define('manage-roles', function ($user) {
            return $user->hasRole('super_admin');
        });

        \Illuminate\Support\Facades\Gate::define('manage-users', function ($user) {
            return $user->hasRole('super_admin') || $user->hasRole('admin');
        });

        \Illuminate\Support\Facades\Gate::define('manage-content', function ($user) {
            return $user->hasRole('mentor');
        });

        \Illuminate\Support\Facades\Gate::define('view-student-content', function ($user) {
            return $user->hasRole('student');
        });
    }
}
