"use client";
import React, { useState } from "react";
import { fileUpload } from "../services/fileService";
import { useAuth } from "@clerk/nextjs";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function FileUploadComponent({
  parentId,
}: {
  parentId: string | null;
}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  console.log("FileUpload", parentId);
  const { getToken } = useAuth();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUploadResult(null);

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = e.target.files[0];

    console.log(file);
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File size must be less than ${MAX_FILE_SIZE_MB} MB`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    setUploadResult(null);

    try {
      const token = await getToken();
      console.log("HIII before");
      const result = await fileUpload(selectedFile, token!, parentId);
      console.log("HII after");
      setUploadResult(result);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleUpload} disabled={loading || !selectedFile}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadResult && (
        <div>
          <h4>Upload Success</h4>
          <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
