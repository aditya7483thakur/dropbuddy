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
import { Folder } from "lucide-react";
import { createFolder } from "@/app/services/folderService";
import { toast } from "sonner";
import { useFolder } from "@/context/FolderContext";

export function CreateFolder({ parentId }: { parentId: string | null }) {
  const [folderName, setFolderName] = useState("");
  const [loader, setLoader] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refreshFiles } = useFolder();
  const { getToken } = useAuth();
  const handleCreate = async () => {
    if (!folderName.trim()) return;
    setLoader(true);
    try {
      const token = await getToken();
      const response = await createFolder(
        { name: folderName, parentId },
        token!
      );

      if (response?.status === 200 || response?.message) {
        toast.success(response.message);
        setIsDialogOpen(false);
        refreshFiles();
      }
      setFolderName("");
    } catch (err) {
      toast.error("Error creating folder");
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
              disabled={loader}
              className="bg-indigo-500 text-white hover:cursor-pointer"
            >
              {loader ? "Creating..." : "Create"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
