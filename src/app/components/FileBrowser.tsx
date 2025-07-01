"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getUserFiles } from "../services/fileService";

interface FileType {
  id: string;
  name: string;
  type: "file" | "folder";
  url?: string;
}

interface FileBrowserProps {
  parentId?: string | null;
  onFolderClick?: (folderId: string) => void;
}

export default function FileBrowser({
  parentId = null,
  onFolderClick,
}: FileBrowserProps) {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const fetchFiles = async () => {
    setLoading(true);
    setError("");

    try {
      const token = await getToken();
      const data = await getUserFiles(token!, parentId);
      setFiles(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [parentId]);

  return (
    <div className="p-4">
      <p>Current Folder ID: {parentId ?? "Root"}</p>
      {loading && <p>Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="border rounded-lg p-3 shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              if (file.type === "folder" && onFolderClick) {
                onFolderClick(file.id);
              }
            }}
          >
            <p className="font-semibold">{file.name}</p>
            <p className="text-sm text-gray-600">{file.type}</p>
            {file.type === "file" && file.url && (
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm underline"
                onClick={(e) => e.stopPropagation()} // prevent folder click on file link click
              >
                View File
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
