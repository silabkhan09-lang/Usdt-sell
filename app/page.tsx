"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import OrdersTable from "../components/OrdersTable";
import TransactionsList from "../components/TransactionsList";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [wallet, setWallet] = useState<number>(0);
  const [orders, setOrders] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    setUserEmail(user.email || "");

    // Wallet
    const { data: walletData } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", user.id)
      .single();
    setWallet(walletData?.balance || 0);

    // Orders
    const { data: ordersData } = await supabase
      .from("orders")
      .select("*, buyer:buyer_id(email), seller:seller_id(email)");
    setOrders(ordersData || []);

    // Transactions
    const { data: txData } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setTransactions(txData || []);
  }

  async function addFunds() {
    const user = (await supabase.auth.getUser()).data.user;
    await supabase.rpc("add_funds", { user_id: user.id, amount: 100 });
    fetchData();
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          Welcome to Mooj 👋 {userEmail && `, ${userEmail}`}
        </h2>
        <p className="text-gray-400">Your secure P2P USDT trading platform</p>
      </div>

      {/* Wallet */}
      <div className="bg-gray-800 p-4 rounded-xl shadow mb-6">
        <h3 className="text-lg">Wallet</h3>
        <p className="text-2xl font-bold">${wallet.toFixed(2)}</p>
        <button
          onClick={addFunds}
          className="mt-3 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-xl"
        >
          Add Funds
        </button>
      </div>

      {/* Orders */}
      <OrdersTable orders={orders} />

      {/* Transactions */}
      <TransactionsList transactions={transactions} />
    </div>
  );
}
