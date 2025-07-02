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
import { TrashIcon } from "lucide-react";
import { emptyTrash } from "@/app/services/fileService";
import { toast } from "sonner";
import { useFolder } from "@/context/FolderContext";

export function EmptyTrash() {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refreshFiles } = useFolder();
  const { getToken } = useAuth();

  async function handleEmptyTrash() {
    setLoading(true);

    try {
      const token = await getToken();
      const response = await emptyTrash(token!);
      toast.success("Trash emptied successfully.");
      setIsDialogOpen(false);
      refreshFiles();
    } catch (error) {
      toast.error("Failed to empty trash. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger asChild>
          <div className="flex font-medium text-lg w-full justify-center items-center cursor-pointer">
            <TrashIcon className="w-4 h-4" />
            <p className="pl-2">Empty Trash</p>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base">
              {" "}
              Are you sure you want to permanently delete all items in the
              trash? This action cannot be undone.
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <Button
              onClick={handleEmptyTrash}
              disabled={loading}
              className="bg-indigo-500 text-white hover:cursor-pointer"
            >
              {loading ? "Emptying..." : "Empty"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
