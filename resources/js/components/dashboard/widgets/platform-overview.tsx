export default function PlatformOverview({ data }: { data: any }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Platform Overview</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                    <div className="text-sm text-blue-600 dark:text-blue-400">Total Users</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.total_users}</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
                    <div className="text-sm text-green-600 dark:text-green-400">Total Roles</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.total_roles}</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
                    <div className="text-sm text-purple-600 dark:text-purple-400">Active Sessions</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.active_sessions}</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Revenue</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{data.revenue}</div>
                </div>
            </div>
        </div>
    );
}
