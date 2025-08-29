import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';

export default function Home() {
  const [wallet, setWallet] = useState<{ balance: number; escrow_balance: number } | null>(null);

  useEffect(() => {
    async function fetchWallet() {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;

      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', user.id)
        .single();
      if (error) console.error(error);
      else setWallet(data);
    }

    fetchWallet();
  }, []);

  return (
    <div>
      <h1>Welcome to Mooj P2P USDT Platform</h1>
      {wallet && (
        <div>
          <p>Balance: {wallet.balance} USDT</p>
          <p>Escrow: {wallet.escrow_balance} USDT</p>
        </div>
      )}
    </div>
  );
}
