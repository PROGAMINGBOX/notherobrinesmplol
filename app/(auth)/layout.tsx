import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-950 dark:to-gray-900">
      <div className="mb-8">
        <Link
          href="/"
          className="text-2xl font-bold text-primary-600 dark:text-primary-400"
        >
          SmoothOpsX
        </Link>
      </div>
      {children}
    </div>
  );
}
