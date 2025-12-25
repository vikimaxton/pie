export default function AppLogo({ className }: { className?: string }) {
    return (
        <img
            src="/mainlogo.svg"
            alt="Logo"
            className={`h-8 w-auto ${className || ''}`}
        />
    );
}
