"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Transaction {
  id: string;
  type: string;
  amount: number;
  created_at: string;
}

export default function WalletPage() {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        // Fetch balance from Supabase
        const { data: wallet, error: walletError } = await supabase
          .from("wallets")
          .select("balance")
          .single();

        if (walletError) throw walletError;
        if (wallet) setBalance(wallet.balance);

        // Fetch transactions from Supabase
        const { data: txs, error: txError } = await supabase
          .from("transactions")
          .select("*")
          .order("created_at", { ascending: false });

        if (txError) throw txError;
        if (txs) setTransactions(txs);
      } catch (error) {
        console.error("Error fetching wallet:", error);
      }
    };

    fetchWallet();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Wallet</h1>
      <p className="mb-6">Balance: ${balance.toFixed(2)}</p>

      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((tx) => (
            <li key={tx.id} className="p-2 border rounded">
              <div>Type: {tx.type}</div>
              <div>Amount: {tx.amount}</div>
              <div>Date: {new Date(tx.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
