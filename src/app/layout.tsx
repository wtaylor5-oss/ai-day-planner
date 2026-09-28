import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Day Planner",
  description: "Tell it your day in plain language. It builds the schedule.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6">
          <header className="flex items-baseline justify-between border-b border-line py-6">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Day Planner
            </Link>
            <nav className="flex gap-5 text-sm text-ink/70">
              <Link href="/tasks/new" className="hover:text-ink">
                Add task
              </Link>
              <Link href="/events/new" className="hover:text-ink">
                Add event
              </Link>
              <Link href="/settings" className="hover:text-ink">
                Settings
              </Link>
            </nav>
          </header>
          <main className="flex-1 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
