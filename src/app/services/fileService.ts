import axiosInstance from "@/lib/axios";

export async function fileUpload(
  file: File,
  token: string,
  parentId: string | null
) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (parentId) formData.append("parentId", parentId);

    const res = await axiosInstance.post("/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Error creating folder", error);
    throw error;
  }
}

export async function getUserFiles(
  token: string,
  parentId: string | null = null
) {
  const url = parentId
    ? `/api/files/getfiles?parentId=${parentId}`
    : `/api/files/getfiles`;
  try {
    const res = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data; // ✅ Axios returns the response body here
  } catch (error: any) {
    console.error("Error fetching files:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch files");
  }
}

export async function trashFiles(token: string, fileId: string) {
  try {
    const response = await axiosInstance.post(`/api/files/${fileId}/trash`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating trash status:",
      error?.response?.data || error.message
    );
  }
}

export async function starFiles(token: string, fileId: string) {
  try {
    const response = await axiosInstance.post(`/api/files/${fileId}/star`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating start status:",
      error?.response?.data || error.message
    );
  }
}

export async function emptyTrash(token: string) {
  try {
    const response = await axiosInstance.delete("/api/files/emptyTrash", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating start status:",
      error?.response?.data || error.message
    );
  }
}
