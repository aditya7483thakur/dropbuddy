"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useCallback,
} from "react";
import { useAuth } from "@clerk/nextjs";
import { getUserFiles } from "@/app/services/fileService";

interface FolderNode {
  id: string | null;
  name: string;
}

interface FileType {
  id: string;
  name: string;
  type: "file" | "folder";
  fileUrl: string;
  thumbnailUrl: string;
  isStarred: boolean;
  isTrash: boolean;
}

interface FolderContextType {
  path: FolderNode[];
  setPath: Dispatch<SetStateAction<FolderNode[]>>;
  currentFolderId: string | null;
  setCurrentFolderId: Dispatch<SetStateAction<string | null>>;
  files: FileType[];
  setFiles: Dispatch<SetStateAction<FileType[]>>;
  refreshFiles: () => void;
  loading: boolean;
  error: string;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const useFolder = () => {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolder must be used within FolderProvider");
  return ctx;
};

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<FolderNode[]>([{ id: null, name: "Home" }]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const refreshFiles = useCallback(async () => {
    setFiles([]);
    setError("");
    setLoading(true);
    try {
      const token = await getToken();
      const data = await getUserFiles(token!, currentFolderId);
      setFiles(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [currentFolderId, getToken]);

  return (
    <FolderContext.Provider
      value={{
        path,
        setPath,
        currentFolderId,
        setCurrentFolderId,
        files,
        setFiles,
        refreshFiles,
        loading,
        error,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
}
