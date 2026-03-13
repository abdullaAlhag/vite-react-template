import { useState } from "react";

export default function Login({ onLogin }: { onLogin: (user: any) => void }) {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      onLogin(data.user);
    } else {
      alert("Error logging in");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <input type="text" placeholder="Username" className="w-full p-4 mb-4 border rounded-xl" 
               onChange={e => setForm({...form, username: e.target.value})} />
        <input type="password" placeholder="Password" className="w-full p-4 mb-6 border rounded-xl" 
               onChange={e => setForm({...form, password: e.target.value})} />
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Login</button>
      </div>
    </div>
  );
}

