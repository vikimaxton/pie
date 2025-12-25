import PlatformOverview from './widgets/platform-overview';
import UserActivitySnapshot from './widgets/user-activity-snapshot';
import MyCourses from './widgets/my-courses';
import StudentProgressTracker from './widgets/student-progress-tracker';
import MyLearningProgress from './widgets/my-learning-progress';
import TodaysStudyPlan from './widgets/todays-study-plan';

interface WidgetData {
    key: string;
    data: any;
}

interface WidgetGridProps {
    widgets: WidgetData[];
}

const WIDGET_REGISTRY: Record<string, React.FC<{ data: any }>> = {
    'platform_overview': PlatformOverview,
    'user_activity_snapshot': UserActivitySnapshot,
    'my_courses': MyCourses,
    'student_progress_tracker': StudentProgressTracker,
    'my_learning_progress': MyLearningProgress,
    'todays_study_plan': TodaysStudyPlan,
};

export default function WidgetGrid({ widgets }: WidgetGridProps) {
    if (!widgets || widgets.length === 0) {
        return (
            <div className="col-span-3 text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg shadow border border-dashed border-gray-300 dark:border-gray-700">
                No widgets available for this view.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {widgets.map((widget) => {
                const WidgetComponent = WIDGET_REGISTRY[widget.key];

                if (!WidgetComponent) {
                    console.warn(`Widget [${widget.key}] not found in registry.`);
                    return null;
                }

                return <WidgetComponent key={widget.key} data={widget.data} />;
            })}
        </div>
    );
}
