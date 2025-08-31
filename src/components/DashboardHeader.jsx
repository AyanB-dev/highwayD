import IconSpiral from './IconSpiral';

// Receive the onSignOut function as a prop
export default function DashboardHeader({ onSignOut }) {
    return (
        <header className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
                <IconSpiral className="h-8 w-8" />
                <h1 className="text-xl font-medium text-[#232323]">Dashboard</h1>
            </div>
            {/* Call the onSignOut function when the button is clicked */}
            <button onClick={onSignOut} className="text-sm text-[#6C6C6C]">
                Sign Out
            </button>
        </header>
    );
}