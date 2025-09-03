"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

interface Order {
  id: string;
  type: string;
  amount: number;
  price: number;
  status: "open" | "taken" | "paid" | "released" | "cancelled";
  commission?: number;
}

export default function OrderRoom() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  const COMMISSION_PERCENT = 1; // 1% commission

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from<Order>("orders")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error("Error fetching order:", error);
      else setOrder(data);
    };

    fetchOrder();
  }, [id]);

  const calculateCommission = (amount: number) => {
    return parseFloat(((amount * COMMISSION_PERCENT) / 100).toFixed(2));
  };

  const updateStatus = async (newStatus: Order["status"]) => {
    if (!order) return;

    let commission = order.commission || 0;

    if (newStatus === "paid") {
      commission = calculateCommission(order.amount);
    }

    const { error } = await supabase
      .from<Order>("orders")
      .update({ status: newStatus, commission })
      .eq("id", id);

    if (error) console.error("Error updating status:", error);
    else router.refresh();
  };

  if (!order) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>

      <div className="bg-gray-800 p-4 rounded-lg mb-4 text-white">
        <p>
          <b>Type:</b> {order.type.toUpperCase()}
        </p>
        <p>
          <b>Amount:</b> {order.amount} USDT
        </p>
        <p>
          <b>Price:</b> ${order.price}
        </p>
        <p>
          <b>Status:</b> {order.status}
        </p>
        {order.commission !== undefined && (
          <p>
            <b>Commission:</b> {order.commission} USDT
          </p>
        )}
      </div>

      <div className="flex gap-2">
        {order.status !== "paid" && (
          <button
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            onClick={() => updateStatus("paid")}
          >
            Mark as Paid
          </button>
        )}
        {order.status !== "released" && (
          <button
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => updateStatus("released")}
          >
            Release Order
          </button>
        )}
        {order.status !== "cancelled" && (
          <button
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            onClick={() => updateStatus("cancelled")}
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );
}
