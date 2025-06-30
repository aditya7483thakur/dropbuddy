"use client";

import * as React from "react";
import Link from "next/link";
import { Folder, Star, Trash2, UploadCloud } from "lucide-react";

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

// Define sidebar links
const sidebarItems = [
  {
    title: "Home",
    href: "/dashboard",
    icon: <Folder className="w-4 h-4" />,
  },
  {
    title: "Starred",
    href: "/dashboard/starred",
    icon: <Star className="w-4 h-4" />,
  },
  {
    title: "Trash",
    href: "/dashboard/trash",
    icon: <Trash2 className="w-4 h-4" />,
  },
  // {
  //   title: "Upload File",
  //   href: "/dashboard/upload",
  //   icon: <UploadCloud className="w-4 h-4 text-blue-600" />,
  //   highlight: true,
  // },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex justify-center">
        <h1 className="text-2xl font-bold h-10 pl-4">📂 DropBuddy</h1>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem
              key={item.href}
              className=" h-12 px-4 py-0.5 text-4xl "
            >
              <SidebarMenuButton asChild className="h-12 pl-4">
                <Link href={item.href}>
                  <div
                    className={`flex items-center gap-2 font-medium text-lg`}
                  >
                    {item.icon}
                    {item.title}
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SignOutButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
