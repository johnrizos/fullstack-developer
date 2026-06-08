import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadmap: Γίνε Fullstack Developer",
  description:
    "Ένας απλός και πρακτικός οδηγός για να μάθεις web development από το μηδέν.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el">
      <body className="min-h-screen bg-gray-50 flex flex-col text-gray-900 font-sans">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600">Fullstack Roadmap</h1>
            <nav>
              <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
                Αρχική
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:py-8">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto py-6">
          <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
            <p>Φτιάχτηκε για ανθρώπους που θέλουν να μάθουν με πράξη, όχι μόνο με θεωρία.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
