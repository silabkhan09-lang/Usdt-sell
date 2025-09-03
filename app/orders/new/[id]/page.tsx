"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function OrderRoom() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase.from("orders").select("*").eq("id", id).single();
      setOrder(data);
    };
    fetchOrder();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    await supabase.from("orders").update({ status: newStatus }).eq("id", id);
    router.refresh();
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p><b>Type:</b> {order.type.toUpperCase()}</p>
        <p><b>Amount:</b> {order.amount} USDT</p>
        <p><b>Price:</b> ${order.price}</p>
        <p><b>Status:</b> {order.status}</p>
      </div>

      <div className="space-y-2">
        {order.status === "open" && (
          <button onClick={() => updateStatus("taken")} className="w-full bg-blue-500 py-2 rounded">
            Take Order
          </button>
        )}
        {order.status === "taken" && (
          <button onClick={() => updateStatus("paid")} className="w-full bg-yellow-500 py-2 rounded">
            Mark Paid
          </button>
        )}
        {order.status === "paid" && (
          <button onClick={() => updateStatus("released")} className="w-full bg-green-600 py-2 rounded">
            Release
          </button>
        )}
        {["open", "taken"].includes(order.status) && (
          <button onClick={() => updateStatus("cancelled")} className="w-full bg-red-600 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
