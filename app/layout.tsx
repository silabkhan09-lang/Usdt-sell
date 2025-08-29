import './globals.css'  // Make sure Tailwind globals are imported
import { ReactNode } from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'YourP2PPlatform',
  description: 'Buy and sell USDT safely with escrow and commission system',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-blue-900 to-blue-800 text-white min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="py-4 px-6 flex justify-between items-center bg-blue-950">
          <h1 className="text-2xl font-bold">YourP2PPlatform</h1>
          <nav className="space-x-4">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <Link href="/offers" className="hover:text-yellow-400">Browse Offers</Link>
            <Link href="/create-offer" className="hover:text-yellow-400">Create Offer</Link>
          </nav>
        </header>

        {/* Page Content */}
        <main className="px-4 md:px-16 py-8 flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 text-center text-gray-300 bg-blue-950">
          © {new Date().getFullYear()} YourP2PPlatform. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
