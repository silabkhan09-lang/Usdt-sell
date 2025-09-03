import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <header className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-900 text-white">
          <h1 className="text-xl font-bold">Mooj</h1>
          <nav className="flex gap-3 text-sm">
            <Link href="/dashboard">Market</Link>
            <Link href="/wallet">Wallet</Link>
            <Link href="/payment-methods">Pay</Link>
            <Link href="/auth">Auth</Link>
          </nav>
        </header>
        <main className="p-4 bg-gray-900 text-white">{children}</main>
      </body>
    </html>
  );
}
