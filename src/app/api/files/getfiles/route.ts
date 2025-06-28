import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { eq, and, isNull } from "drizzle-orm";
import { files } from "@/db/schema";
import { db } from "@/db";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get("parentId");

    const conditions = [
      eq(files.userId, userId),
      eq(files.isTrash, false),
      parentId ? eq(files.parentId, parentId) : isNull(files.parentId),
    ];

    const userFiles = await db
      .select()
      .from(files)
      .where(and(...conditions));

    return NextResponse.json(userFiles);
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
