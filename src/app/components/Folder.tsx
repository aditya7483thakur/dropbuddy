// components/FolderForm.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { createFolder } from "../services/folderService";

export function FolderForm() {
  const [folderName, setFolderName] = useState("");
  const { getToken } = useAuth();

  const handleCreate = async () => {
    if (!folderName.trim()) return;

    const token = await getToken(); // 👈 Clerk token
    try {
      const res = await createFolder({ name: folderName }, token!);
      console.log("Folder created:", res);
      setFolderName("");
    } catch (err) {
      alert("Error creating folder");
    }
  };

  return (
    <div>
      <input
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        className="border p-2"
        placeholder="Folder name"
      />
      <button
        onClick={handleCreate}
        className="bg-indigo-600 text-white p-2 ml-2 rounded"
      >
        Create
      </button>
    </div>
  );
}
