import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 noise-overlay">
      {/* Animated background orbs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl will-change-transform"
          style={{ animation: "blob 7s infinite" }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl will-change-transform"
          style={{ animation: "blob 7s infinite 2s" }}
        />
        <div
          className="absolute left-1/2 bottom-1/4 h-80 w-80 rounded-full bg-emerald-600/15 blur-3xl will-change-transform"
          style={{ animation: "blob 7s infinite 4s" }}
        />
        {/* Additional orbs for depth */}
        <div
          className="absolute right-1/3 bottom-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl will-change-transform"
          style={{ animation: "blob 9s infinite 1s" }}
        />
        <div
          className="absolute left-1/3 top-1/2 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl will-change-transform"
          style={{ animation: "blob 8s infinite 3s" }}
        />
      </div>

      {/* Floating particles/dots */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] h-1 w-1 rounded-full bg-emerald-400/60 animate-float-slow" />
        <div className="absolute top-[30%] right-[20%] h-1.5 w-1.5 rounded-full bg-teal-400/50 animate-float-medium" />
        <div className="absolute top-[60%] left-[30%] h-1 w-1 rounded-full bg-emerald-300/40 animate-float-fast" />
        <div className="absolute top-[45%] right-[35%] h-1 w-1 rounded-full bg-cyan-400/50 animate-float-slow [animation-delay:2s]" />
        <div className="absolute top-[70%] left-[60%] h-1.5 w-1.5 rounded-full bg-emerald-400/40 animate-float-medium [animation-delay:1s]" />
        <div className="absolute top-[15%] right-[40%] h-1 w-1 rounded-full bg-teal-300/50 animate-float-fast [animation-delay:3s]" />
        <div className="absolute top-[80%] left-[45%] h-1 w-1 rounded-full bg-emerald-500/30 animate-float-slow [animation-delay:4s]" />
        <div className="absolute top-[25%] left-[55%] h-1.5 w-1.5 rounded-full bg-cyan-300/40 animate-float-medium [animation-delay:2.5s]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-slide-up text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Stay Compliant.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Ship Faster.
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-400 animate-slide-up [animation-delay:0.1s] opacity-0 [animation-fill-mode:forwards]">
            SmoothOpsX auto-monitors regulatory changes for your tech stack and
            tells you exactly what to fix - in plain English.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-slide-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards]">
            <Button variant="primary" size="lg" href="/signup">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" href="#features">
              See How It Works
            </Button>
          </div>
        </div>

        {/* 3D Glass mockup card with shine effect */}
        <div className="mt-20 flex justify-center animate-scale-in [animation-delay:0.3s] opacity-0 [animation-fill-mode:forwards]">
          <div
            className="relative w-full max-w-2xl"
            style={{ perspective: "1000px" }}
          >
            <div
              className="glass-shine bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-emerald-500/10"
              style={{ transform: "rotateX(5deg) rotateY(-2deg)" }}
            >
              {/* Mockup dashboard header */}
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <div className="h-3 w-3 rounded-full bg-teal-400" />
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                </div>
                <div className="h-4 w-32 rounded bg-white/10" />
              </div>
              {/* Mockup stats */}
              <div className="relative z-10 grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-400">98%</p>
                  <p className="text-xs text-gray-500 mt-1">Compliant</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-teal-400">24</p>
                  <p className="text-xs text-gray-500 mt-1">Tracked</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-white">3</p>
                  <p className="text-xs text-gray-500 mt-1">Action Items</p>
                </div>
              </div>
              {/* Mockup rows */}
              <div className="relative z-10 space-y-3">
                <div className="h-4 w-full rounded bg-white/5" />
                <div className="h-4 w-3/4 rounded bg-white/5" />
                <div className="h-4 w-5/6 rounded bg-white/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating pill badges */}
        <div className="absolute top-32 left-10 hidden lg:block animate-float-slow">
          <span className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 shadow-lg shadow-emerald-500/5">
            GDPR
          </span>
        </div>
        <div className="absolute top-48 right-16 hidden lg:block animate-float-medium [animation-delay:1s]">
          <span className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 shadow-lg shadow-emerald-500/5">
            SOC2
          </span>
        </div>
        <div className="absolute bottom-40 left-20 hidden lg:block animate-float-fast [animation-delay:2s]">
          <span className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 text-sm text-gray-300 shadow-lg shadow-emerald-500/5">
            HIPAA
          </span>
        </div>
      </div>
    </section>
  );
}
