import axiosInstance from "@/lib/axios";

export async function fileUpload(file: File, token: string, parentId?: string) {
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

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch files");
  }

  return res.json();
}
