import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await supabase.auth.signInWithPassword({ email, password });
  };

  return (
     <div style={{ padding: 40 }}>
      <h2 style={{ marginBottom: 16 }}>Login</h2>

      <input style={{ marginRight: 8, padding: 6 }} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input style={{ marginRight: 8, padding: 6 }} type="password" onChange={e => setPassword(e.target.value)} />
      <button style={{ padding: "6px 12px" }} onClick={login}>Login</button>
    </div>
  );
}
