"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Define wallet interface
interface WalletData {
  id: string;
  balance: number;
  created_at: string;
}

// Define transaction interface
interface Transaction {
  id: string;
  type: string;
  amount: number;
  created_at: string;
}

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchWallet = async () => {
      // Fetch wallet balance
      const { data: wallet } = await supabase.from<WalletData>("wallets").select("*").single();
      if (wallet) setBalance(wallet.balance);

      // Fetch transactions
      const { data: txs } = await supabase.from<Transaction>("transactions")
        .select("*")
        .order("created_at", { ascending: false });
      setTransactions(txs || []);
    };
    fetchWallet();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Wallet</h2>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p><b>Balance:</b> {balance} USDT</p>
      </div>

      <h3 className="font-bold mb-2">Transactions</h3>
      <div className="space-y-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-gray-700 p-3 rounded">
