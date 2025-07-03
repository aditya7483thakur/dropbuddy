"use client";
import React from "react";
import {
  Search,
  Settings,
  Link,
  Plus,
  User,
  Home,
  CheckSquare,
  Users,
  Code,
  CreditCard,
  HelpCircle,
  Star,
  Share2,
  Filter,
  MoreHorizontal,
  FileText,
  File,
  Folder,
  Image,
  Globe,
  Eye,
  Edit3,
  MessageSquare,
  Trash2,
  TrendingUp,
} from "lucide-react";

const FileManagerPage = () => {
  const recentFiles = [
    { name: "filename.txt", type: "text", icon: FileText },
    {
      name: "2028-19-88_do-not-...",
      type: "special",
      icon: File,
      highlighted: true,
    },
    { name: "SecretFolder", type: "folder", icon: Folder },
    { name: "accounts.txt", type: "text", icon: FileText },
  ];

  const publicFiles = [
    {
      name: "Berserk Vol 32.pdf",
      size: "25 MB",
      modified: "2025/18/16",
      permission: "Editor",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      name: "Invoice Dec 23.doc",
      size: "44 GB",
      modified: "2025/18/16",
      permission: "View Only",
      icon: FileText,
      color: "text-green-600",
    },
    {
      name: "Screenshot 22.jpg",
      size: "798 TB",
      modified: "2025/18/16",
      permission: "Editor",
      icon: Image,
      color: "text-blue-600",
    },
    {
      name: "React Component.tsx",
      size: "155 KB",
      modified: "2025/18/16",
      permission: "Administrator",
      icon: Code,
      color: "text-purple-600",
    },
    {
      name: "Landing Page.html",
      size: "187 KB",
      modified: "2025/18/16",
      permission: "Administrator",
      icon: Globe,
      color: "text-orange-600",
    },
    {
      name: "Website Styles.css",
      size: "",
      modified: "",
      permission: "",
      icon: File,
      color: "text-blue-600",
    },
  ];

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case "Editor":
        return "text-green-600 bg-green-50";
      case "View Only":
        return "text-gray-600 bg-gray-50";
      case "Administrator":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-purple-600 text-white flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 p-4 border-b border-purple-500">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg">slothui</span>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-indigo-300" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-indigo-500 bg-opacity-50 border border-indigo-400 rounded-lg pl-10 pr-4 py-2 text-sm placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-indigo-500 bg-opacity-50">
            <Home className="w-5 h-5" />
            <span>Home</span>
            <span className="ml-auto bg-white text-purple-600 text-xs px-2 py-1 rounded-full">
              10
            </span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:bg-opacity-50 transition-colors">
            <CheckSquare className="w-5 h-5" />
            <span>Tasks</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:bg-opacity-50 transition-colors">
            <Users className="w-5 h-5" />
            <span>Users</span>
            <span className="ml-auto bg-white text-purple-600 text-xs px-2 py-1 rounded-full">
              2
            </span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:bg-opacity-50 transition-colors">
            <Code className="w-5 h-5" />
            <span>APIs</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:bg-opacity-50 transition-colors">
            <CreditCard className="w-5 h-5" />
            <span>Subscription</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:bg-opacity-50 transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-500 hover:bg-opacity-50 transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Help & Support</span>
          </div>
        </nav>

        {/* Upgrade Banner */}
        <div className="mx-4 mb-4 p-4 bg-indigo-500 bg-opacity-50 rounded-lg relative">
          <button className="absolute top-2 right-2 text-white hover:bg-indigo-400 rounded p-1">
            <span className="text-lg">×</span>
          </button>
          <div className="mb-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center mb-2">
              <span className="text-yellow-800">⚠</span>
            </div>
            <p className="text-sm text-indigo-100 mb-2">
              Enjoy unlimited access to our app with only a small price monthly.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs text-indigo-200 hover:text-white">
              Dismiss
            </button>
            <button className="text-xs bg-white text-purple-600 px-3 py-1 rounded font-medium hover:bg-indigo-50">
              Go Pro
            </button>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-indigo-500">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">Azunyan U. Wu</div>
              <div className="text-xs text-indigo-200">Basic Member</div>
            </div>
            <button className="text-indigo-200 hover:text-white">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold text-gray-900">
                My Files
              </span>
              <span className="text-gray-400"></span>
              <span className="text-xl font-semibold text-gray-900">
                Secret Folder
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Star className="w-4 h-4" />
                Go Pro
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Files Section */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Search Bar */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search files and folders..."
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Link className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Plus className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            {/* Recent Files */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Files
                </h2>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Newest First ↓
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentFiles.map((file, index) => {
                  const IconComponent = file.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer ${
                        file.highlighted
                          ? "border-indigo-300 bg-indigo-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center mb-2 ${
                            file.type === "folder"
                              ? "text-blue-500"
                              : file.highlighted
                              ? "text-purple-600"
                              : "text-gray-500"
                          }`}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-medium text-gray-900 truncate w-full">
                          {file.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Public Files */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Public Files
                  </h2>
                  <span className="text-sm text-gray-500">81 Total</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-gray-900">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-indigo-700">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Files Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Name ↑
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Modified ↓
                        </th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          File Permission ↑
                        </th>
                        <th className="w-8"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {publicFiles.map((file, index) => {
                        const IconComponent = file.icon;
                        return (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <IconComponent
                                  className={`w-5 h-5 ${file.color}`}
                                />
                                <div>
                                  <div className="font-medium text-gray-900">
                                    {file.name}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {file.size}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {file.modified}
                            </td>
                            <td className="px-6 py-4">
                              {file.permission && (
                                <span
                                  className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPermissionColor(
                                    file.permission
                                  )}`}
                                >
                                  {file.permission}
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-auto">
            {/* File Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                File Details
              </h3>
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <div className="font-medium text-gray-900">accounts.txt</div>
                <div className="text-sm text-gray-500">Modified 2026/02/15</div>
                <div className="text-xs text-gray-400 mt-1">Editor</div>
              </div>
            </div>

            {/* File Overview */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                File Overview
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Total Views</span>
                  </div>
                  <span className="font-medium">198</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Edits</span>
                  </div>
                  <span className="font-medium">16</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Comments</span>
                  </div>
                  <span className="font-medium">11</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Share</span>
                  </div>
                  <span className="font-medium">87</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Deletes</span>
                  </div>
                  <span className="font-medium">77</span>
                </div>
              </div>
            </div>

            {/* File Insights */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                File Insights
              </h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  6,712
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>100% last week</span>
                </div>
              </div>
              <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                See All Insights
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManagerPage;
