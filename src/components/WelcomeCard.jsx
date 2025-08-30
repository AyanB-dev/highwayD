export default function WelcomeCard({ name, email }) {
    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#232323]">Welcome, {name}!</h2>
            <p className="text-gray-500">Email: {email}</p>
        </div>
    );
}