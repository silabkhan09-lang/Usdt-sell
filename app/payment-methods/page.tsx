"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// Define proper type for a payment method
interface PaymentMethod {
  id: string;
  method_name: string;
  account_details: string;
  created_at: string;
}

export default function PaymentMethods() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [methodName, setMethodName] = useState("");
  const [accountDetails, setAccountDetails] = useState("");

  const fetchMethods = async () => {
    const { data } = await supabase
      .from<PaymentMethod>("payment_methods")
      .select("*")
      .order("created_at", { ascending: false });

    setMethods(data || []);
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const addMethod = async () => {
    if (!methodName || !accountDetails) return;

    await supabase
      .from("payment_methods")
      .insert([{ method_name: methodName, account_details: accountDetails }]);

    setMethodName("");
    setAccountDetails("");
    fetchMethods(); // ← Call fetchMethods to refresh the list
  };

  return (
    <div>
      <h2>Payment Methods</h2>
      <input
        type="text"
        placeholder="Method Name"
        value={methodName}
        onChange={(e) => setMethodName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Account Details"
        value={accountDetails}
        onChange={(e) => setAccountDetails(e.target.value)}
      />
      <button onClick={addMethod}>Add Method</button>

      <ul>
        {methods.map((method) => (
          <li key={method.id}>
            {method.method_name}: {method.account_details}
          </li>
        ))}
      </ul>
    </div>
  );
}
