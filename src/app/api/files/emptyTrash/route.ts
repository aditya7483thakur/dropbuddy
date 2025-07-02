import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import imagekit from "@/lib/imagekit";
import { eq, and, inArray } from "drizzle-orm";
import { files } from "@/db/schema";

type ImageKitFile = {
  fileId: string;
  name: string;
  url: string;
};

// Recursive function to get all descendants of a folder (files and folders)
async function getAllDescendants(folderId: string) {
  const children = await db
    .select()
    .from(files)
    .where(eq(files.parentId, folderId));
  let allDescendants = [...children];

  for (const child of children) {
    if (child.isFolder) {
      const subDescendants = await getAllDescendants(child.id);
      allDescendants = allDescendants.concat(subDescendants);
    }
  }
  return allDescendants;
}

export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get all trashed files and folders for user
    const trashedItems = await db
      .select()
      .from(files)
      .where(and(eq(files.userId, userId), eq(files.isTrash, true)));

    if (trashedItems.length === 0) {
      return NextResponse.json(
        { message: "No files or folders in trash" },
        { status: 200 }
      );
    }

    // Prepare list of all files/folders to delete (including folder descendants)
    let allToDelete = [...trashedItems];

    // For each trashed folder, get all descendants regardless of isTrash flag
    for (const item of trashedItems) {
      if (item.isFolder) {
        const descendants = await getAllDescendants(item.id);
        allToDelete = allToDelete.concat(descendants);
      }
    }

    // Separate files and folders
    const filesToDelete = allToDelete.filter((item) => !item.isFolder);
    const foldersToDelete = allToDelete.filter((item) => item.isFolder);

    // Delete files from ImageKit
    const deleteFromImageKit = filesToDelete.map(async (file) => {
      try {
        if (!file.fileUrl) return;

        const urlWithoutQuery = file.fileUrl.split("?")[0];
        const filename = urlWithoutQuery.split("/").pop(); // e.g., "abc.jpg"
        if (!filename) return;

        // ✅ Search by filename and extract actual fileId
        const searchResults = (await imagekit.listFiles({
          name: filename,
          limit: 1,
        })) as ImageKitFile[];

        if (searchResults?.length > 0 && searchResults[0].fileId) {
          const fileId = searchResults[0].fileId;
          console.log("✅ Deleting ImageKit file with fileId:", fileId);
          await imagekit.deleteFile(fileId);
        } else {
          console.warn(`⚠️ No ImageKit file found for name: ${filename}`);
        }
      } catch (e) {
        console.error(`❌ Failed to delete ImageKit file for ${file.id}`, e);
      }
    });

    await Promise.allSettled(deleteFromImageKit);

    // Delete files from DB
    if (filesToDelete.length > 0) {
      const fileIds = filesToDelete.map((f) => f.id);
      await db.delete(files).where(inArray(files.id, fileIds));
    }

    // Delete folders from DB
    if (foldersToDelete.length > 0) {
      const folderIds = foldersToDelete.map((f) => f.id);
      await db.delete(files).where(inArray(files.id, folderIds));
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${filesToDelete.length} files and ${foldersToDelete.length} folders from trash`,
    });
  } catch (error) {
    console.error("Error emptying trash:", error);
    return NextResponse.json(
      { error: "Failed to empty trash" },
      { status: 500 }
    );
  }
}
