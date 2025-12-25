export default function MyLearningProgress({ data }: { data: any }) {
    const percentage = Math.round((data.completed_modules / data.total_modules) * 100);

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Learning Progress</h3>
            <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Modules Completed</span>
                <span className="font-semibold text-gray-900 dark:text-white">{data.completed_modules}/{data.total_modules}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
                Next Goal: <span className="text-gray-900 dark:text-white font-medium">{data.next_goal}</span>
            </div>
        </div>
    );
}
