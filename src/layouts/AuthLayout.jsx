import WindowsWImage from '../assets/WindowsW.png';

export default function AuthLayout({ children }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white p-4">
      {/* 1. The grid is changed to a 12-column layout on desktop */}
      <div className="w-full max-w-sm overflow-hidden rounded-[32px] bg-white shadow-lg md:grid md:max-w-6xl md:grid-cols-12">

        {/* 2. The Left Column (form) now spans 5 of the 12 columns */}
        <div className="p-8 md:col-span-5">{children}</div>

        {/* 3. The Right Column (image) now spans the remaining 7 columns */}
        <div className="relative hidden p-3 md:col-span-7 md:block">
          <img
            className="h-full w-full rounded-3xl object-cover"
            src={WindowsWImage}
            alt="Abstract background"
          />
        </div>
      </div>
    </main>
  );
}