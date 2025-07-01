"use client";
import { useState } from "react";

import { useFolder } from "@/context/FolderContext";
import { ArrowLeft, Star, Trash2 } from "lucide-react";
import FileBrowser from "@/components/custom/FileBrowser";

export default function Page() {
  const { setPath, currentFolderId, setCurrentFolderId } = useFolder();
  const [filter, setFilter] = useState<"all" | "starred" | "trash">("all");
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
      <div>
        <div className="flex justify-between">
          <div>
            <button
              onClick={handleBack}
              disabled={currentFolderId === null}
              className={`mb-4 px-3 py-1 bg-black text-white rounded hover:cursor-pointer ${
                currentFolderId === null ? " opacity-70" : ""
              }`}
              style={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex justify-center items-center">
                {" "}
                <ArrowLeft size={20} className="pr-1" /> Back
              </div>
            </button>
          </div>
          <div className="space-x-2 flex items-center ">
            <button
              onClick={() => {
                console.log("all");
                setFilter("all");
              }}
              className={`mb-4 px-3 py-1 bg-blue-500 text-white rounded  hover:bg-blue-600 hover:cursor-pointer`}
              style={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex justify-center items-center">All</div>
            </button>
            <button
              onClick={() => {
                console.log("starred");
                setFilter("starred");
              }}
              className={`mb-4 px-3 py-1 bg-yellow-400 text-black rounded  hover:bg-yellow-500 hover:cursor-pointer ${
                currentFolderId === null ? " opacity-70" : ""
              }`}
              style={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex justify-center items-center">
                {" "}
                <Star size={20} className="pr-1" /> Starred
              </div>
            </button>
            <button
              onClick={() => {
                console.log("trash");
                setFilter("trash");
              }}
              className={`mb-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 hover:cursor-pointer`}
              style={{ boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)" }}
            >
              <div className="flex justify-center items-center">
                {" "}
                <Trash2 size={20} className="pr-1" /> Trash
              </div>
            </button>
          </div>
        </div>
        <FileBrowser
          parentId={currentFolderId}
          onFolderClick={handleFolderClick}
          filter={filter}
        />
      </div>
    </div>
  );
}
