export default function StudentProgressTracker({ data }: { data: any }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Student Progress</h3>
            <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                    <div className="text-xl font-bold text-red-600 dark:text-red-400">{data.needs_attention}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Needs Help</div>
                </div>
                <div>
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">{data.top_performers}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Top Students</div>
                </div>
                <div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{data.average_completion}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Avg Completion</div>
                </div>
            </div>
        </div>
    );
}
