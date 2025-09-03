"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PaymentMethods() {
  const [methods, setMethods] = useState([]);
  const [methodName, setMethodName] = useState("");
  const [accountDetails, setAccountDetails] = useState("");

  const fetchMethods = async () => {
    const { data } = await supabase.from("payment_methods").select("*").order("created_at", { ascending: false });
    setMethods(data || []);
  };

  useEffect(() => { fetchMethods(); }, []);

  const addMethod = async () => {
    await supabase.from("payment_methods").insert([{ method_name: methodName, account_details: accountDetails }]);
    setMethodName(""); setAccountDetails("");
    fetchMethods();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
      <input
        placeholder="Method Name (e.g. Bank, PayPal)"
        className="w-full p-2 mb-2 text-black rounded"
        value={methodName}
        onChange={(e) => setMethodName(e.target.value)}
      />
      <input
        placeholder="Account Details"
        className="w-full p-2 mb-2 text-black rounded"
        value={accountDetails}
        onChange={(e) => setAccountDetails(e.target.value)}
      />
      <button onClick={addMethod} className="w-full bg-green-600 py-2 rounded">Add Method</button>

      <div className="mt-4 space-y-2">
        {methods.map((m: any) => (
          <div key={m.id} className="bg-gray-800 p-3 rounded">
            <p><b>{m.method_name}</b></p>
            <p className="text-sm text-gray-400">{m.account_details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
