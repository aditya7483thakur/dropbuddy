import { AppSidebar } from "@/components/app-sidebar";
import FolderBreadCrumb from "@/components/FolderBreadCrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { FolderProvider } from "@/context/FolderContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FolderProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-50 bg-white ">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <FolderBreadCrumb />
              </header>

              {children}
            </SidebarInset>
          </SidebarProvider>
        </FolderProvider>
      </body>
    </html>
  );
}
