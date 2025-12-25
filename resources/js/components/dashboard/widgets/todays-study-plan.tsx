import { CheckCircle } from 'lucide-react';

export default function TodaysStudyPlan({ data }: { data: any }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Today's Study Plan</h3>
            <div className="space-y-3">
                {data.tasks.map((task: string, idx: number) => (
                    <div key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{task}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-center text-gray-500 dark:text-gray-400">
                Est. Time: {data.estimated_time}
            </div>
        </div>
    );
}
