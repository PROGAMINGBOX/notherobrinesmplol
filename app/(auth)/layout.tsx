import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-950 px-4 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-32 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 -right-32 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl animate-blob [animation-delay:2s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl animate-blob [animation-delay:4s]" />
      {/* Additional orbs for depth */}
      <div className="absolute top-[10%] right-[20%] h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl animate-blob [animation-delay:1s]" />
      <div className="absolute bottom-[15%] left-[15%] h-56 w-56 rounded-full bg-teal-400/10 blur-3xl animate-blob [animation-delay:3s]" />

      <div className="relative z-10 mb-8 animate-slide-up">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
        >
          SmoothOpsX
        </Link>
      </div>
      <div className="relative z-10 w-full flex flex-col items-center animate-slide-up [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards]">
        {children}
      </div>
    </div>
  );
}
