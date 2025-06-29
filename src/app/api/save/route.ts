import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import { files } from "@/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      url,
      filePath,
      size,
      fileType,
      thumbnailUrl = null,
      parentId = null,
      bodyUserId,
    } = body;

    if (!name || !url) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    const fileData = {
      id: uuidv4(),
      name: name.trim(),
      path: filePath || `/files/${userId}/${name}`,
      size: size || 0,
      type: fileType || "image",
      fileUrl: url,
      thumbnailUrl,
      userId,
      parentId,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    const [newFile] = await db.insert(files).values(fileData).returning();

    return NextResponse.json({ success: true, file: newFile });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
