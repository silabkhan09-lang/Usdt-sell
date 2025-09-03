"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

// Define a proper type for the order
interface Order {
  id: string;
  type: string;
  amount: number;
  price: number;
  status: "open" | "taken" | "paid" | "released" | "cancelled";
  commission?: number; // add commission field
}

export default function OrderRoom() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const router = useRouter();

  const COMMISSION_PERCENT = 1; // 1% commission

  useEffect(() => {
    const fetchOrder = async () => {
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

    // Calculate commission when order is marked "paid"
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

  if (!order) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p><b>Type:</b> {order.type.toUpperCase()}</p>
        <p><b>Amount:</b> {order.amount} USDT</p>
        <p><b>Price:</b> ${order.price}</p>
        <p><b>Status:</b> {order.status}</p>
        {order.commission !== undefined && (
          <p><b>Commission:</b> {order.commission} USDT</p>
        )}
      </div>

      <div className="s
