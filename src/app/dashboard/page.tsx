"use client";
import { useState } from "react";
import { CreateFolder } from "../components/CreateFolder";
import FileUploadComponent from "../components/FileUpload";
import FileBrowser from "../components/FileBrowser";

export default function Page() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  // Handler when user clicks a folder inside FileBrowser
  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  // Optionally, add a "Back" button to go one level up
  const handleBack = () => {
    // For example, you can track parent folder IDs or simply reset to null
    setCurrentFolderId(null);
  };
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
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
      <CreateFolder />
      <FileUploadComponent />

      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
