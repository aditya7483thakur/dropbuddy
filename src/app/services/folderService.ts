// services/folderService.ts

import axiosInstance from "@/lib/axios";

interface CreateFolderPayload {
  name: string;
  parentId: string | null;
}

export async function createFolder(
  payload: CreateFolderPayload,
  token: string
) {
  try {
    const res = await axiosInstance.post("/api/folder/create", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating folder", error);
    throw error;
  }
}
