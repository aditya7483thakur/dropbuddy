// components/FolderForm.tsx
"use client";
import { useState } from "react";
import { createFolder } from "../services/folderService";
import { useAuth } from "@clerk/nextjs";

export function CreateFolder({ parentId }: { parentId: string | null }) {
  const [folderName, setFolderName] = useState("");
  console.log("createFolder", parentId);
  const { getToken } = useAuth();
  const handleCreate = async () => {
    if (!folderName.trim()) return;

    try {
      const token = await getToken();
      const res = await createFolder({ name: folderName, parentId }, token!);
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
