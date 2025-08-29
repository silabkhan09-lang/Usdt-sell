// app/page.js
import { supabase } from '../lib/supabaseClient'

export default async function Home() {
  // 👇 change "todos" to your actual Supabase table
  const { data, error } = await supabase.from('todos').select('*')

  if (error) {
    console.error(error)
  }

  return (
    <div>
      <h1>My Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
