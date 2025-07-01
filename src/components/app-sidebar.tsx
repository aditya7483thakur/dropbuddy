"use client";

import * as React from "react";
import Link from "next/link";
import { Folder, Home, Star, Trash2, UploadCloud } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";
import { SignOutButton } from "@clerk/nextjs";
import { useFolder } from "@/context/FolderContext";
import { CreateFolder } from "./custom/CreateFolder";
import FileUploadComponent from "./custom/FileUpload";

// Define sidebar links

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentFolderId } = useFolder();
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex justify-center">
        <h1 className="text-2xl font-bold h-10 pl-4">📂 DropBuddy</h1>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className=" h-12 px-4 py-0.5 text-4xl ">
            <SidebarMenuButton asChild className="h-12 pl-4">
              <a href="/dashboard">
                <div className={`flex items-center gap-2 font-medium text-lg`}>
                  <Home className="w-4 h-4" />
                  Home
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className=" h-12 px-4 py-0.5 text-4xl cursor-pointer">
            <SidebarMenuButton asChild className="h-12 pl-4">
              <div className={`flex items-center gap-2 font-medium text-lg`}>
                <CreateFolder parentId={currentFolderId} />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem className=" h-12 px-4 py-0.5 text-4xl cursor-pointer">
            <SidebarMenuButton asChild className="h-12 pl-4">
              <div className={`flex items-center gap-2 font-medium text-lg`}>
                <FileUploadComponent parentId={currentFolderId} />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
