"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Mooj</h2>
      <p className="text-gray-400 mb-6 text-sm">Trade USDT safely with escrow protection</p>
      <Link href="/dashboard" className="bg-green-600 px-5 py-3 rounded-lg text-lg">
        Enter Marketplace
      </Link>
    </div>
  );
}
