import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paris Group Copilot",
  description:
    "Copiloto de venture studio para discovery e execução de MVPs com IA.",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projeto", label: "Projeto" },
  { href: "/projetos", label: "Projetos" },
  { href: "/hipotese", label: "Hipótese" },
  { href: "/decisoes", label: "Decisões" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-gray-200 dark:border-gray-800">
          <nav className="mx-auto flex max-w-3xl items-center gap-6 p-4 text-sm">
            <Link href="/" className="font-semibold">
              Paris Group Copilot
            </Link>
            <ul className="flex gap-4">
              {NAV_LINKS.filter((l) => l.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
