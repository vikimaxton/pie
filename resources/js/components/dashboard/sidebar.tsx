import { Link, useForm } from '@inertiajs/react';
import { LucideIcon, Home, Users, Settings, Shield, Book, Clipboard, BookOpen, BarChart, LogOut } from 'lucide-react';

interface SidebarItem {
    label: string;
    url: string;
    active: boolean;
    icon: string;
}

interface SidebarProps {
    items: SidebarItem[];
    currentRoute?: string;
}

const iconMap: Record<string, LucideIcon> = {
    'home': Home,
    'users': Users,
    'settings': Settings,
    'shield': Shield,
    'book': Book,
    'clipboard': Clipboard,
    'book-open': BookOpen,
    'bar-chart': BarChart,
};

export default function DashboardSidebar({ items }: SidebarProps) {
    const { post } = useForm();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        // Since we are using standard Laravel Auth, the logout route is usually named 'logout'
        // But since we can't use route(), we use the URL directly
        post('/logout');
    };

    return (
        <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col h-full border-r border-gray-800">
            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {items.map((item) => {
                    const Icon = iconMap[item.icon] || Home;
                    // item.url and item.active are passed from backend
                    const active = (item as any).active;

                    return (
                        <Link
                            key={item.label}
                            href={(item as any).url || '#'}
                            className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${active
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className="mr-3 h-5 w-5" aria-hidden="true" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <form onSubmit={handleLogout}>
                    <button
                        type="submit"
                        className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
                        Log out
                    </button>
                </form>
            </div>
        </aside>
    );
}
