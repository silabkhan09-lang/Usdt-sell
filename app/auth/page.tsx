"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");
  const router = useRouter();

  const handleAuth = async () => {
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) router.push("/dashboard");
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (!error) router.push("/dashboard");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{mode === "signin" ? "Sign In" : "Sign Up"}</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-2 text-black rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-2 text-black rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleAuth} className="w-full bg-green-600 py-2 rounded mb-2">
        {mode === "signin" ? "Sign In" : "Sign Up"}
      </button>
      <button
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        className="w-full text-sm text-gray-400 underline"
      >
        {mode === "signin" ? "Need an account? Sign Up" : "Already have an account? Sign In"}
      </button>
    </div>
  );
}
