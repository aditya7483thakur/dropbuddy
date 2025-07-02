"use client";
import { useFolder } from "@/context/FolderContext";

export default function FolderBreadCrumb() {
  const { path } = useFolder();
  return (
    <nav aria-label="breadcrumb" className="text-lg font-medium text-gray-700">
      <ol className="flex items-center space-x-2">
        {path.map((folder, idx) => {
          const isLast = idx === path.length - 1;
          return (
            <li key={folder.id} className="flex items-center">
              <span className={isLast ? "font-semibold" : undefined}>
                {folder.name}
              </span>
              {!isLast && <span className="mx-2 text-gray-400">{">"}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
