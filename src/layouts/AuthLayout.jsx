import backgroundImage from '../assets/WindowsW.png';

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg md:grid md:max-w-4xl md:grid-cols-2">

        {/* Left Column for the Form */}
        <div className="p-8">{children}</div>

        {/* Right Column for the Image */}
        <div className="relative hidden md:block">
          <img
            className="h-full w-full object-cover"
            src={backgroundImage}
            alt="Abstract background"
          />
        </div>
      </div>
    </main>
  );
}