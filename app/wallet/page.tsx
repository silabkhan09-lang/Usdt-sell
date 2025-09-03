"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      const { data: wallet } = await supabase.from("wallets").select("*").single();
      if (wallet) setBalance(wallet.balance);

      const { data: txs } = await supabase.from("transactions").select("*").order("created_at", { ascending: false });
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
        {transactions.map((tx: any) => (
          <div key={tx.id} className="bg-gray-700 p-3 rounded">
            <p>{tx.type} {tx.amount} USDT</p>
            <p className="text-xs text-gray-400">{tx.created_at}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
