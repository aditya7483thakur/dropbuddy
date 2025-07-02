import { NextResponse } from "next/server";
import imagekit from "@/lib/imagekit";

export async function DELETE() {
  const hardcodedFileId = "6862ede55c7cd75eb8101ed3"; // Replace with your actual fileId to test

  try {
    const deleteResponse = await imagekit.deleteFile(hardcodedFileId);
    console.log("Delete response:", deleteResponse);

    return NextResponse.json({
      success: true,
      message: `File with ID ${hardcodedFileId} deleted successfully.`,
      data: deleteResponse,
    });
  } catch (error) {
    console.error("Delete failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete file",
        details: error,
      },
      { status: 500 }
    );
  }
}
