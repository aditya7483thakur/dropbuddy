import axiosInstance from "@/lib/axios";
import type { AxiosError } from "axios";

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
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error("Error uploading file:", axiosError?.response?.data);
    throw new Error(
      axiosError?.response?.data?.error || "Failed to upload file"
    );
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
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error("Error fetching files:", axiosError?.response?.data);
    throw new Error(
      axiosError?.response?.data?.error || "Failed to fetch files"
    );
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
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error("Error updating trash status:", axiosError?.response?.data);
    throw new Error(
      axiosError?.response?.data?.error || "Error updating trash status"
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
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error("Error updating star status:", axiosError?.response?.data);
    throw new Error(
      axiosError?.response?.data?.error || "Error updating star status"
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
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error(
      "Error occured , while deleting files",
      axiosError?.response?.data
    );
    throw new Error(
      axiosError?.response?.data?.error || "Error occured while deleting files"
    );
  }
}
