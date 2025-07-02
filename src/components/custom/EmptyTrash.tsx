"use client";

import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function EmptyTrash() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { getToken } = useAuth();

  async function handleEmptyTrash() {
    setLoading(true);
    setMessage("");

    try {
      const token = await getToken();
      const response = await axios.delete("/api/files/emptyTrash", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message || "Trash emptied successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleEmptyTrash}
        disabled={loading}
        className="bg-indigo-500"
        style={{
          padding: "8px 16px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Emptying Trash..." : "Empty Trash"}
      </button>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
