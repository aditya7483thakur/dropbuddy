// services/folderService.ts
import axios from "axios";
interface CreateFolderPayload {
  name: string;
  parentId?: string;
}

// CLIENT SIDE example
export async function createFolder(
  payload: CreateFolderPayload,
  token: string
) {
  try {
    const res = await axios.post("/api/folder/create", payload, {
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
