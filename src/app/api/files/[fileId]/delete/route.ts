// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { eq, and } from "drizzle-orm";
// import { files } from "@/db/schema";
// import { db } from "@/db";
// import imagekit from "@/lib/imagekit";

// async function deleteFileFromImageKit(file: (typeof files)[number]) {
//   let imagekitFileId: string | null = null;

//   if (file.fileUrl) {
//     const urlWithoutQuery = file.fileUrl.split("?")[0];
//     imagekitFileId = urlWithoutQuery.split("/").pop() || null;
//   }

//   if (!imagekitFileId && file.path) {
//     imagekitFileId = file.path.split("/").pop() || null;
//   }

//   if (imagekitFileId) {
//     try {
//       const searchResults = await imagekit.listFiles({
//         name: imagekitFileId,
//         limit: 1,
//       });

//       if (searchResults.length > 0) {
//         await imagekit.deleteFile(searchResults[0].fileId);
//       } else {
//         await imagekit.deleteFile(imagekitFileId);
//       }
//     } catch (err) {
//       console.error("Error deleting file from ImageKit:", err);
//       // fallback to try deleting with extracted ID anyway
//       await imagekit.deleteFile(imagekitFileId);
//     }
//   }
// }

// async function deleteFolderRecursively(folderId: string, userId: string) {
//   const children = await db
//     .select()
//     .from(files)
//     .where(and(eq(files.parentId, folderId), eq(files.userId, userId)));

//   for (const child of children) {
//     if (child.isFolder) {
//       await deleteFolderRecursively(child.id, userId);
//     } else {
//       await deleteFileFromImageKit(child);
//       await db
//         .delete(files)
//         .where(and(eq(files.id, child.id), eq(files.userId, userId)));
//     }
//   }

//   // Delete the folder itself
//   await db
//     .delete(files)
//     .where(and(eq(files.id, folderId), eq(files.userId, userId)));
// }

// export async function DELETE(
//   request: NextRequest,
//   context: { params: { fileId: string } }
// ) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const { fileId } = context.params;
//     if (!fileId) {
//       return NextResponse.json(
//         { error: "File ID is required" },
//         { status: 400 }
//       );
//     }

//     const [file] = await db
//       .select()
//       .from(files)
//       .where(and(eq(files.id, fileId), eq(files.userId, userId)));

//     if (!file) {
//       return NextResponse.json({ error: "File not found" }, { status: 404 });
//     }

//     if (file.isFolder) {
//       // Recursive delete folder + contents
//       await deleteFolderRecursively(fileId, userId);
//     } else {
//       // Delete single file
//       await deleteFileFromImageKit(file);
//       await db
//         .delete(files)
//         .where(and(eq(files.id, fileId), eq(files.userId, userId)));
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Deleted successfully",
//     });
//   } catch (error) {
//     console.error("Error deleting file or folder:", error);
//     return NextResponse.json(
//       { error: "Failed to delete file or folder" },
//       { status: 500 }
//     );
//   }
// }
