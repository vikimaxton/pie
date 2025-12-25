import { Link } from '@inertiajs/react';
import { Plus, Shield, BookOpen } from 'lucide-react';

interface ActionPanelProps {
    permissions: Record<string, boolean>;
}

export default function ActionPanel({ permissions }: ActionPanelProps) {
    if (!permissions) return null;

    const hasAnyAction = permissions.can_manage_users || permissions.can_manage_roles || permissions.can_manage_content;

    if (!hasAnyAction) return null;

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8 dark:bg-gray-800">
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Quick Actions
                </h3>
            </div>
            <div className="p-5 bg-gray-50 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 dark:bg-gray-800/50">
                {permissions.can_manage_users && (
                    <button className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        <span>Add User</span>
                    </button>
                )}

                {permissions.can_manage_roles && (
                    <button className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                        <Shield className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        <span>Create Role</span>
                    </button>
                )}

                {permissions.can_manage_content && (
                    <button className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <BookOpen className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        <span>Create Course</span>
                    </button>
                )}
            </div>
        </div>
    );
}
