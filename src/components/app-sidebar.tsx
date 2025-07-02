"use client";

import { Home, LogOutIcon } from "lucide-react";

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
import { useClerk } from "@clerk/nextjs";
import { useFolder } from "@/context/FolderContext";
import { CreateFolder } from "./custom/CreateFolder";
import FileUploadComponent from "./custom/FileUpload";
import { EmptyTrash } from "./custom/EmptyTrash";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

// Define sidebar links

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { currentFolderId } = useFolder();
  const { signOut } = useClerk();

  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      toast.success("Signed out successfully.");
    } catch (error) {
      toast.error("Sign out failed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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

          <SidebarMenuItem className=" h-12 px-4 py-0.5 text-4xl cursor-pointer">
            <SidebarMenuButton asChild className="h-12 pl-4">
              <div className={`flex items-center gap-2 font-medium text-lg`}>
                <EmptyTrash />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* <SignOutButton /> */}
        <Button
          onClick={handleSignOut}
          disabled={loading}
          className="bg-indigo-900 rounded hover:cursor-pointer text-white flex items-center gap-2"
        >
          <LogOutIcon className="w-4 h-4" />
          {loading ? "Signing out..." : "Sign Out"}
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
