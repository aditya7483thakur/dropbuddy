import { NextResponse } from "next/server";
import imagekit from "@/lib/imagekit"; // your initialized ImageKit instance
import { auth } from "@clerk/nextjs/server"; // ensure user is authenticated

export async function GET() {
  try {
    // Check authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get authentication parameters from ImageKit
    const authParams = imagekit.getAuthenticationParameters();

    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error generating ImageKit auth params:", error);
    return NextResponse.json(
      { error: "Failed to generate authentication parameters" },
      { status: 500 }
    );
  }
}
