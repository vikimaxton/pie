import { Book } from 'lucide-react';

export default function MyCourses({ data }: { data: any }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg p-5 dark:bg-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">My Courses</h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {data.courses.map((course: any) => (
                    <li key={course.id} className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="bg-indigo-100 p-2 rounded-md dark:bg-indigo-900/50">
                                <Book className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{course.title}</span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{course.students} Students</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
