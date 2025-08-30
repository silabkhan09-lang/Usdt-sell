"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Marketplace</h2>
      <Link href="/orders/new" className="bg-blue-500 text-white px-4 py-2 rounded">+ New Order</Link>
      <div className="mt-6 space-y-4">
        {orders.map((o) => (
          <Link key={o.id} href={`/orders/${o.id}`} className="block border p-4 rounded-lg hover:bg-gray-100">
            {o.type.toUpperCase()} {o.amount} USDT @ ${o.price} ({o.status})
          </Link>
        ))}
      </div>
    </div>
  );
}
