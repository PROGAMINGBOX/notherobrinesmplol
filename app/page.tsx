import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmoothOpsX - Stay Compliant. Ship Faster.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400">
        SmoothOpsX
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Stay Compliant. Ship Faster.
      </p>
    </main>
  );
}
