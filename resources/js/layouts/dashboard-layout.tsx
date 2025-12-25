import { PropsWithChildren, useState, useEffect } from 'react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import AppLogo from '@/components/app-logo';
import { Link, usePage } from '@inertiajs/react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

interface DashboardLayoutProps extends PropsWithChildren {
    sidebarItems: any[];
}

export default function DashboardLayout({ children, sidebarItems }: DashboardLayoutProps) {
    const user = usePage().props.auth.user;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // If switching to mobile, close sidebar automatically
            if (mobile) {
                setIsSidebarOpen(false);
            } else {
                // If switching to desktop, open it
                setIsSidebarOpen(true);
            }
        };

        // Initial check
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden">
            {/* Top Header */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-6 shrink-0 z-30 dark:bg-gray-800 dark:border-gray-700 relative">
                <div className="flex items-center gap-4">
                    {/* Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md focus:outline-none transition-colors"
                        aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                    >
                        {isSidebarOpen ? <PanelLeftClose size={24} /> : <PanelLeftOpen size={24} />}
                    </button>

                    <Link href="/dashboard" className="flex items-center">
                        <AppLogo />
                    </Link>
                </div>
                <div className="ml-auto flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                        {user.role?.slug === 'student' && user.roll_number
                            ? `Roll No: ${user.roll_number}`
                            : user.name
                        }
                    </span>
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs ring-2 ring-white dark:ring-gray-800">
                        {user.name.charAt(0)}
                    </div>
                </div>
            </header>

            {/* Main Content Area (Sidebar + Page) */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* 
                    Sidebar Container 
                    - Mobile: Fixed overlay, full height, z-index 20
                    - Desktop: Relative, full height. Collapses by changing width to 0.
                */}
                <div className={`
                    bg-slate-900 border-r border-gray-800 transition-all duration-300 ease-in-out h-full flex flex-col
                    ${isMobile ? 'fixed inset-y-0 left-0 z-20 pt-16 w-64' : 'relative'}
                    ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
                    ${!isMobile && isSidebarOpen ? 'w-64' : ''}
                    ${!isMobile && !isSidebarOpen ? 'w-0 overflow-hidden border-none' : ''}
                `}>
                    <div className="w-64 h-full">
                        {/* Inner container with fixed width to prevent content squashing during transition */}
                        <DashboardSidebar items={sidebarItems} />
                    </div>
                </div>

                {/* Mobile Backdrop */}
                {isMobile && isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-10"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 w-full bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
