"use client";

import {
  Folder,
  Star,
  Trash2,
  UploadCloud,
  FileImage,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 border-r p-4">
        <h1 className="text-xl font-bold mb-6">📁 BudgetBox</h1>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Folder className="w-5 h-5" /> Home
          </Link>
          <Link href="/dashboard/starred" className="flex items-center gap-2">
            <Star className="w-5 h-5" /> Starred
          </Link>
          <Link href="/dashboard/trash" className="flex items-center gap-2">
            <Trash2 className="w-5 h-5" /> Trash
          </Link>
          <Link
            href="/dashboard/upload"
            className="flex items-center gap-2 mt-6 text-blue-600 font-medium"
          >
            <UploadCloud className="w-5 h-5" /> Upload File
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <header className="h-16 border-b px-6 flex items-center justify-between bg-white">
          <div className="text-gray-500 text-sm">Home / Files</div>
          <div className="flex items-center gap-3">
            {/* Placeholder for user avatar */}
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
          </div>
        </header>

        {/* Files Section */}
        <main className="p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Your Files & Folders</h2>

          <div className="grid grid-cols-4 gap-4">
            {/* Folder Card */}
            <div className="p-4 bg-white shadow rounded border hover:shadow-md cursor-pointer">
              <Folder className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="text-sm font-medium truncate">Screenshots</p>
            </div>

            {/* File Card - Image */}
            <div className="p-4 bg-white shadow rounded border hover:shadow-md cursor-pointer">
              <FileImage className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-sm font-medium truncate">Logo.png</p>
            </div>

            {/* File Card - PDF */}
            <div className="p-4 bg-white shadow rounded border hover:shadow-md cursor-pointer">
              <FileText className="w-6 h-6 text-red-500 mb-2" />
              <p className="text-sm font-medium truncate">Resume.pdf</p>
            </div>

            {/* Folder Card */}
            <div className="p-4 bg-white shadow rounded border hover:shadow-md cursor-pointer">
              <Folder className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="text-sm font-medium truncate">Projects</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
