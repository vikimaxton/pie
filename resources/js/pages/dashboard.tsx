import DashboardLayout from '@/layouts/dashboard-layout';
import WidgetGrid from '@/components/dashboard/widget-grid';
import ActionPanel from '@/components/dashboard/action-panel';
import { Head } from '@inertiajs/react';

interface DashboardConfig {
    role: string;
    sidebar: any[];
    widgets: any[];
    permissions: Record<string, boolean>;
}

interface DashboardProps {
    dashboardConfig: DashboardConfig;
}

export default function Dashboard({ dashboardConfig }: DashboardProps) {
    return (
        <DashboardLayout sidebarItems={dashboardConfig.sidebar}>
            <Head title="Dashboard" />

            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-gray-200">
                    Welcome back, {dashboardConfig.role.replace('_', ' ')}!
                </h2>

                <ActionPanel permissions={dashboardConfig.permissions} />

                <WidgetGrid widgets={dashboardConfig.widgets} />
            </div>

            {/* Example of Role-Based Conditional Rendering */}
            {dashboardConfig.permissions.can_manage_roles && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4 dark:bg-yellow-900/20 dark:border-yellow-700">
                    <p className="text-yellow-700 dark:text-yellow-400">
                        You have super admin privileges. You can manage system roles.
                    </p>
                </div>
            )}
        </DashboardLayout>
    );
}
