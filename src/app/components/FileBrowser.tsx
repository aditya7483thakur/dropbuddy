"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getUserFiles, starFiles, trashFiles } from "../services/fileService";
import {
  DownloadIcon,
  FileIcon,
  FileTextIcon,
  Star,
  Trash2,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import Loader from "./Loader";

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
  filter: "all" | "starred" | "trash";
}

export default function FileBrowser({
  parentId = null,
  onFolderClick,
  filter,
}: FileBrowserProps) {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { getToken } = useAuth();
  console.log(files);
  const [isTrashLoading, setIsTrashLoading] = useState(false);
  const [isStarLoading, setIsStarLoading] = useState(false);
  const [view, setView] = useState<"all" | "starred" | "trash">("all");

  const handleStarToggle = async (fileId: string) => {
    setIsStarLoading(true);
    try {
      const token = await getToken();
      const response = await starFiles(token!, fileId);
      fetchFiles();
    } catch (err) {
      console.error("Failed to update star status", err);
    } finally {
      setIsStarLoading(false);
    }
  };

  const handleTrashToggle = async (fileId: string) => {
    setIsTrashLoading(true);
    try {
      const token = await getToken();
      const response = await trashFiles(token!, fileId);
      fetchFiles();
      console.log("Res", response);
    } catch (error) {
      console.error("Failed to update trash status");
    } finally {
      setIsTrashLoading(false);
    }
  };

  const visibleFiles = files
    .filter((file) => {
      if (filter === "starred") return file.isStarred;
      if (filter === "trash") return file.isTrash;
      return file;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const fetchFiles = async () => {
    setFiles([]);
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
      {loading && (
        <div className="flex justify-center items-center h-44">
          <Loader size={50} />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
        {visibleFiles.map((file) => (
          <div
            key={file.id}
            className="relative flex flex-col border rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer transition"
            onClick={() => {
              if (file.type === "folder" && onFolderClick) {
                onFolderClick(file.id, file.name);
              }
            }}
          >
            {/* Thumbnail or folder icon */}

            <div className="mb-3 flex justify-center items-center h-28 rounded-md overflow-hidden">
              {file.type === "folder" ? (
                <div className="h-20 w-20 text-6xl flex items-center justify-center">
                  🗂️
                </div>
              ) : (
                <div className="relative group aspect-video w-full rounded-md overflow-hidden flex justify-center items-center">
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
                      <img src="pdf.png" className=" h-16 w-16" alt="" />
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
                  handleStarToggle(file.id);
                }}
                disabled={isStarLoading}
                aria-label={file.isStarred ? "Unstar" : "Star"}
                className={`transition rounded-full p-1 border hover:cursor-pointer ${
                  file.isStarred
                    ? "text-yellow-400 border-yellow-400 hover:bg-yellow-100"
                    : "text-yellow-400 border-yellow-400 hover:bg-yellow-50"
                } ${isStarLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Star
                  size={20}
                  fill={file.isStarred ? "currentColor" : "none"}
                  stroke="currentColor"
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
                  handleTrashToggle(file.id);
                }}
                disabled={isTrashLoading}
                aria-label="Mark as Trash"
                className={`p-1 rounded-full border transition hover:cursor-pointer ${
                  file.isTrash
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    : "text-red-500 border-red-500 hover:bg-red-100"
                }`}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
