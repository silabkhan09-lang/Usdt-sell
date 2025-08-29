// app/dashboard/page.tsx
import { ReactNode } from "react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">mmoj.com</h1>
        <nav className="flex flex-col gap-4">
          <button className="flex items-center gap-2 text-gray-300 hover:text-white">
            📊 Dashboard
          </button>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white">
            📑 Orders
          </button>
          <button className="flex items-center gap-2 text-gray-300 hover:text-white">
            💼 Wallet
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 space-y-8">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-300 space-x-6">
            <a href="#" className="hover:text-white">Dashboard</a>
            <a href="#" className="hover:text-white">Orders</a>
            <a href="#" className="hover:text-white">Wallet</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">John Doe</span>
            <button className="rounded-full bg-gray-700 p-2">⚙️</button>
          </div>
        </div>

        {/* Dashboard Header */}
        <h2 className="text-2xl font-bold">USDT P2P Dashboard</h2>
        <p className="text-gray-400 mb-6">Manage your escrow trades securely</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Orders */}
          <div className="bg-[#1e293b] p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Active Orders</h3>
            <table className="w-full text-sm">
              <thead className="text-gray-400">
                <tr>
                  <th className="text-left">Buyer</th>
                  <th className="text-left">Seller</th>
                  <th className="text-left">Amount (USDT)</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td>Alice</td>
                  <td>Bob</td>
                  <td>100</td>
                  <td>
                    <span className="bg-yellow-600 px-2 py-1 rounded text-xs">
                      Pending
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Charlie</td>
                  <td>Dan</td>
                  <td>250</td>
                  <td>
                    <span className="bg-green-600 px-2 py-1 rounded text-xs">
                      Released
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Wallet */}
          <div className="bg-[#1e293b] p-6 rounded-xl shadow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Wallet</h3>
              <p className="text-2xl font-bold">$1,000.00</p>
            </div>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Add Funds
            </button>
          </div>

          {/* Recent Transactions */}
          <div className="bg-[#1e293b] p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span>⬇️ Order #1</span> <span>100 USDT</span>
              </li>
              <li className="flex justify-between">
                <span>⬇️ Order #2</span> <span>250 USDT</span>
              </li>
              <li className="flex justify-between">
                <span>⬇️ Order #3</span> <span>50 USDT</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
