"use client";
import { useEffect, useState } from "react";
import { CreateFolder } from "../components/CreateFolder";
import FileUploadComponent from "../components/FileUpload";
import FileBrowser from "../components/FileBrowser";
import { useFolder } from "@/context/FolderContext";
import { Preahvihear } from "next/font/google";

export default function Page() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const { path, setPath } = useFolder();
  console.log("Dashboard folder", currentFolderId);

  // Handler when user clicks a folder inside FileBrowser
  const handleFolderClick = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setPath((prev) => [...prev, { id: folderId, name: folderName }]);
  };

  // Back button just removes last folder from path and updates current folder id accordingly
  const handleBack = () => {
    setPath((prev) => {
      if (prev.length > 1) {
        const newPath = prev.slice(0, -1);
        setCurrentFolderId(newPath[newPath.length - 1].id);
        return newPath;
      }
      return prev; // Already at root, no change
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex ">
        <CreateFolder parentId={currentFolderId} />
        <FileUploadComponent parentId={currentFolderId} />
      </div>
      <div>
        <button
          onClick={handleBack}
          disabled={currentFolderId === null}
          className="mb-4 px-3 py-1 border rounded"
        >
          Back
        </button>

        <FileBrowser
          parentId={currentFolderId}
          onFolderClick={handleFolderClick}
        />
      </div>
    </div>
  );
}
