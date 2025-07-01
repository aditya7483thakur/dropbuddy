"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface FolderNode {
  id: string | null;
  name: string;
}
interface FolderContextType {
  path: FolderNode[];
  setPath: Dispatch<SetStateAction<FolderNode[]>>;
  currentFolderId: string | null;
  setCurrentFolderId: Dispatch<SetStateAction<string | null>>;
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
  return (
    <FolderContext.Provider
      value={{ path, setPath, currentFolderId, setCurrentFolderId }}
    >
      {children}
    </FolderContext.Provider>
  );
}
