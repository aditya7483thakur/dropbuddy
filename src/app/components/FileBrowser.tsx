"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getUserFiles } from "../services/fileService";
import {
  DownloadIcon,
  FileIcon,
  FileTextIcon,
  Star,
  Trash2,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";

interface FileType {
  id: string;
  name: string;
  type: "file" | "folder";
  fileUrl: string;
  thumbnailUrl: string;
  isStarred: boolean;
  isTrash: boolean;
}

interface FileBrowserProps {
  parentId?: string | null;
  onFolderClick?: (folderId: string, folderName: string) => void;
}

export default function FileBrowser({
  parentId = null,
  onFolderClick,
}: FileBrowserProps) {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  console.log(files);
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

  const handleDownloadFile = async (file: FileType) => {
    try {
      // Show loading toast
      toast("Preparing Download", {
        description: `Getting "${file.name}" ready for download...`,
      });

      let downloadUrl = file.fileUrl;

      if (
        file.type.startsWith("image/") &&
        process.env.IMAGE_KIT_URL_END_POINT &&
        file.fileUrl
      ) {
        downloadUrl = `${process.env.IMAGE_KIT_URL_END_POINT}/tr:q-100,orig-true/${file.fileUrl}`;
      }

      const response = await fetch(downloadUrl);
      if (!response.ok)
        throw new Error(`Failed to download file: ${response.statusText}`);

      const blob = await response.blob();

      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = file.name;
      document.body.appendChild(link);

      toast("Download Ready", {
        description: `"${file.name}" is ready to download.`,
        action: {
          label: "Open",
          onClick: () => window.open(blobUrl, "_blank"),
        },
      });

      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
      toast("Download Failed", {
        description: "We couldn't download the file. Please try again later.",
      });
    }
  };

  return (
    <div className="p-4">
      {loading && <p>Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative flex flex-col border rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition"
            onClick={() => {
              if (file.type === "folder" && onFolderClick) {
                onFolderClick(file.id, file.name);
              }
            }}
          >
            {/* Thumbnail or folder icon */}

            <div className="mb-3 flex justify-center items-center h-28 bg-gray-100 rounded-md overflow-hidden">
              {file.type === "folder" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7a2 2 0 012-2h5l2 2h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
                  />
                </svg>
              ) : (
                <div className="relative group aspect-video w-full rounded-md overflow-hidden border shadow-sm flex justify-center items-center">
                  {file.thumbnailUrl ? (
                    // Show image thumbnail
                    <img
                      src={file.thumbnailUrl}
                      alt={file.name}
                      className="object-cover h-full w-full cursor-pointer"
                      onClick={() => window.open(file.fileUrl, "_blank")}
                    />
                  ) : file.fileUrl?.endsWith(".pdf") ? (
                    // PDF file fallback icon
                    <div
                      className="cursor-pointer inline-block"
                      onClick={() => window.open(file.fileUrl, "_blank")}
                      title="Open PDF"
                    >
                      <FileTextIcon className="h-10 w-10 text-red-500" />
                    </div>
                  ) : (
                    // Generic file fallback
                    <FileIcon className="h-10 w-10 text-gray-400" />
                  )}
                </div>
              )}
            </div>

            {/* File/folder name */}
            <p className="font-semibold truncate" title={file.name}>
              {file.name}
            </p>

            {/* Type label */}
            <p className="text-xs text-gray-500 mb-3">{file.type}</p>

            {/* Action icons: Star & Trash */}
            <div className="flex justify-between items-center mt-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // onToggleStar && onToggleStar(file.id);
                }}
                aria-label={file.isStarred ? "Unstar" : "Star"}
                className="text-yellow-400 hover:text-yellow-500 transition"
              >
                <Star
                  size={20}
                  fill={file.isStarred ? "currentColor" : "none"}
                  stroke={file.isStarred ? "currentColor" : "currentColor"}
                />
              </button>

              {file.type !== "folder" && (
                <>
                  <DownloadIcon
                    className="h-4 w-4 text-gray-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadFile(file);
                    }}
                  />
                </>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // onDelete && onDelete(file.id);
                }}
                aria-label="Delete"
                className="text-red-500 hover:text-red-600 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
