"use client";
import React, { useState } from "react";
import { fileUpload } from "@/app/services/fileService";
import { useAuth } from "@clerk/nextjs";
import { UploadCloud, UploadCloudIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFolder } from "@/context/FolderContext";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function FileUploadDialog({
  parentId,
}: {
  parentId: string | null;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { refreshFiles } = useFolder();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = e.target.files[0];

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size must be less than ${MAX_FILE_SIZE_MB} MB`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setLoading(true);

    try {
      const token = await getToken();
      const result = await fileUpload(selectedFile, token!, parentId);
      toast.success("File uploaded successfully.");
      console.log(result);
      setSelectedFile(null);
      setIsDialogOpen(false);
      refreshFiles();
    } catch (err) {
      toast.error("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex font-medium text-lg w-full items-center">
          <UploadCloudIcon className="w-4 h-4" />
          <p className="pl-2"> Upload File</p>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload a File</AlertDialogTitle>
          <AlertDialogDescription>
            Select a file to upload. Max size: {MAX_FILE_SIZE_MB} MB
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex flex-col items-center gap-3 mt-2">
          <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-blue-400 p-4 rounded-xl cursor-pointer hover:bg-blue-50 transition">
            <UploadCloud className="w-8 h-8 text-blue-500 mb-1" />
            <p className="text-blue-600 text-sm">
              {selectedFile ? selectedFile.name : "Click to choose a file"}
            </p>
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            onClick={handleUpload}
            className="bg-indigo-500 text-white hover:cursor-pointer"
            disabled={loading || !selectedFile}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
