<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\Dashboard\WidgetManager;

class DashboardController extends Controller
{
    protected WidgetManager $widgetManager;

    public function __construct(WidgetManager $widgetManager)
    {
        $this->widgetManager = $widgetManager;
    }

    public function index(Request $request)
    {
        $user = $request->user();
        $user->load('role'); // Ensure role is loaded

        $roleSlug = $user->role->slug;

        $config = [
            'role' => $roleSlug,
            'sidebar' => $this->getSidebarItems($user, $roleSlug),
            'widgets' => $this->widgetManager->getWidgetsForUser($user),
            'permissions' => $this->getPermissions($user),
        ];

        return Inertia::render('Dashboard', [
            'dashboardConfig' => $config,
        ]);
    }

    private function getSidebarItems($user, $roleSlug)
    {
        $items = [
            [
                'label' => 'Dashboard', 
                'url' => route('dashboard'), 
                'active' => request()->routeIs('dashboard'),
                'icon' => 'home'
            ],
        ];

        if ($roleSlug === 'super_admin' || $roleSlug === 'admin') {
            // Placeholder URLs for now
            $items[] = ['label' => 'Users', 'url' => '#', 'active' => false, 'icon' => 'users'];
        }

        if ($roleSlug === 'super_admin') {
            $items[] = ['label' => 'Roles', 'url' => '#', 'active' => false, 'icon' => 'shield'];
        }

        if ($roleSlug === 'mentor') {
            $items[] = ['label' => 'My Courses', 'url' => '#', 'active' => false, 'icon' => 'book'];
            $items[] = ['label' => 'Assignments', 'url' => '#', 'active' => false, 'icon' => 'clipboard'];
        }

        if ($roleSlug === 'student') {
            $items[] = ['label' => 'My Learning', 'url' => '#', 'active' => false, 'icon' => 'book-open'];
            $items[] = ['label' => 'Progress', 'url' => '#', 'active' => false, 'icon' => 'bar-chart'];
        }

        return $items;
    }

    // Removed getWidgets() as it is now handled by WidgetManager

    private function getPermissions($user)
    {
        return [
            'can_manage_roles' => $user->can('manage-roles'),
            'can_manage_users' => $user->can('manage-users'),
            'can_manage_content' => $user->can('manage-content'),
            'can_view_student_content' => $user->can('view-student-content'),
        ];
    }
}
