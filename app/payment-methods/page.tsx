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
    await supabase
      .from("payment_methods")
      .insert([{ method_name: methodName, account_details: accountDetails }]);

    setMethodName("");
    setAccountDetails("");
    fetch
