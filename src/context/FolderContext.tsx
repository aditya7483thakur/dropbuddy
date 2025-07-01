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
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const useFolder = () => {
  const ctx = useContext(FolderContext);
  if (!ctx) throw new Error("useFolder must be used within FolderProvider");
  return ctx;
};

export function FolderProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = useState<FolderNode[]>([{ id: null, name: "Home" }]);

  return (
    <FolderContext.Provider value={{ path, setPath }}>
      {children}
    </FolderContext.Provider>
  );
}
