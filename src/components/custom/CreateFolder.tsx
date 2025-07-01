// components/FolderForm.tsx
"use client";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";
import { createFolder } from "@/app/services/folderService";

export function CreateFolder({ parentId }: { parentId: string | null }) {
  const [folderName, setFolderName] = useState("");
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
        <AlertDialogTrigger asChild className="px-0 ">
          <div className="flex font-medium text-lg w-full justify-center items-center">
            <Folder className="w-4 h-4" />
            <p className="pl-2"> Create Folder</p>
          </div>
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
              className="bg-indigo-500 text-white hover:cursor-pointer"
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
