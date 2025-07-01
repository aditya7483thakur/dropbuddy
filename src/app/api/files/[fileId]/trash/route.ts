import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { files } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await params;

    const file = await db
      .select()
      .from(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));

    if (!file.length) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const currentTrashStatus = file[0].isTrash;

    const [updated] = await db
      .update(files)
      .set({ isTrash: !currentTrashStatus })
      .where(and(eq(files.id, fileId), eq(files.userId, userId)))
      .returning();

    return NextResponse.json({ success: true, file: updated });
  } catch (error) {
    console.error("Error updating trash status:", error);
    return NextResponse.json(
      { error: "Failed to update trash status" },
      { status: 500 }
    );
  }
}
