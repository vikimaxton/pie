export default function UserActivitySnapshot({ data }: { data: any }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">User Activity</h3>
            <dl className="space-y-4">
                <div className="flex justify-between items-center">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">New Registrations (7d)</dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">{data.new_registrations}</dd>
                </div>
                <div className="flex justify-between items-center">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Recent Logins</dt>
                    <dd className="text-lg font-semibold text-gray-900 dark:text-white">{data.recent_logins}</dd>
                </div>
                <div className="flex justify-between items-center">
                    <dt className="text-sm text-gray-500 dark:text-gray-400">Churn Rate</dt>
                    <dd className="text-lg font-semibold text-red-600 dark:text-red-400">{data.churn_rate}</dd>
                </div>
            </dl>
        </div>
    );
}
