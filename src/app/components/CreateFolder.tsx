// components/FolderForm.tsx
"use client";
import { useState } from "react";
import { createFolder } from "../services/folderService";
import { useAuth } from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className=" w-60 h-60 border-2 border-dashed border-gray-300 hover:cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-colors duration-200 rounded-lg"
            title="Create new folder"
          >
            <Plus className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Write your folder name !</AlertDialogTitle>
            <input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="border p-2"
              placeholder="Folder name"
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              onClick={handleCreate}
              className="bg-indigo-600 text-white p-2 ml-2 rounded"
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
