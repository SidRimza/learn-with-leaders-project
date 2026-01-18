import { supabase } from "../lib/supabase";

export default function Header() {
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
      <h1 className="text-xl font-semibold text-gray-800">
        Learn with Leaders
      </h1>

      <button
        onClick={logout}
        className="px-4 py-1.5 border rounded text-sm hover:bg-gray-100"
      >
        Logout
      </button>
    </header>
  );
}
