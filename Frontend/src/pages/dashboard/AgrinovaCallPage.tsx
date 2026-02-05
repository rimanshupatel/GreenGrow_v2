import React, { useState } from "react";
import { apiUrl } from "@/lib/env";

export default function AgrinovaCallPage() {
  const [phone, setPhone] = useState("");

  const handleCall = async () => {
    if (!phone.trim()) {
      alert("Please enter a valid phone number.");
      return;
    }

    try {
      const res = await fetch(apiUrl("/make-call"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_number: phone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.msg || "Call failed");
      }

      console.log("Vapi response:", data);
      alert("Calling " + phone);
    } catch (error) {
      console.error("Call error:", error);
      alert("Unable to place call right now.");
    }
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
