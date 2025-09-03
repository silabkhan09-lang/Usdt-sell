"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Marketplace</h2>
        <Link href="/orders/new" className="bg-blue-500 px-3 py-2 rounded text-sm">+ New</Link>
      </div>
      <div className="space-y-3">
        {orders.map((o) => (
          <Link key={o.id} href={`/orders/${o.id}`}>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="font-bold">{o.type.toUpperCase()}</span>
                <span className="text-sm bg-gray-700 px-2 py-1 rounded">{o.status}</span>
              </div>
              <div className="mt-2 text-sm">
                <p>{o.amount} USDT</p>
                <p>${o.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
