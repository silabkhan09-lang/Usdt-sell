"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewOrder() {
  const [type, setType] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const createOrder = async () => {
    await supabase.from("orders").insert([{ type, amount, price, status: "open" }]);
    router.push("/dashboard");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Order</h2>
      <select className="w-full p-2 mb-2 text-black rounded" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <input placeholder="Amount" className="w-full p-2 mb-2 text-black rounded" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input placeholder="Price" className="w-full p-2 mb-2 text-black rounded" value={price} onChange={(e) => setPrice(e.target.value)} />
      <button onClick={createOrder} className="w-full bg-green-600 py-2 rounded text-white">Create</button>
    </div>
  );
}
