import React, { useState } from "react";

export default function AgrinovaCallPage() {
  const [phone, setPhone] = useState("");

  const handleCall = async () => {
    const res = await fetch("http://localhost:8000/make-call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_number: phone }),
    });
    const data = await res.json();
    console.log("Vapi response:", data);
    alert("Calling " + phone);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold mb-4">📞 Talk to Agrinova AI</h1>
      <input
        type="tel"
        placeholder="Enter your phone number (e.g., +919876543210)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border p-2 rounded-lg mb-4 w-64"
      />
      <button
        onClick={handleCall}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        Start Call
      </button>
    </div>
  );
}
