import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roadmap: Γίνε Fullstack Developer",
  description:
    "Ένας απλός και πρακτικός οδηγός για να μάθεις web development από το μηδέν.",
};

const themeInitScript = `
try {
  const stored = localStorage.getItem("theme");
  const dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);

  const scale = Number(localStorage.getItem("fontScale"));
  if (scale && scale !== 1) {
    document.documentElement.style.fontSize = Math.round(scale * 100) + "%";
  }
} catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <SiteHeader />

        <main className="w-full flex-1">{children}</main>

        <footer className="mt-auto border-t border-gray-200 bg-white py-6 dark:border-gray-800 dark:bg-gray-950">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Φτιάχτηκε για ανθρώπους που θέλουν να μάθουν με πράξη, όχι μόνο με θεωρία.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
