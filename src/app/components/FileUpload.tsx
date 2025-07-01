"use client";
import React, { useState } from "react";
import { fileUpload } from "../services/fileService";
import { useAuth } from "@clerk/nextjs";
import { UploadCloud } from "lucide-react";

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
  const { getToken } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUploadResult(null);

    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = e.target.files[0];

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
      const result = await fileUpload(selectedFile, token!, parentId);
      setUploadResult(result);
      setSelectedFile(null);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 rounded-2xl shadow-lg border border-gray-200 bg-white">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 p-6 rounded-xl cursor-pointer hover:bg-blue-50 transition">
        <UploadCloud className="w-10 h-10 text-blue-500 mb-2" />
        <p className="text-blue-600 font-medium">
          {selectedFile ? selectedFile.name : "Click to choose a file"}
        </p>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadResult && (
        <div className="mt-4 bg-green-50 border border-green-300 p-3 rounded-lg">
          <h4 className="text-green-700 font-semibold mb-1">
            Upload Successful
          </h4>
          <pre className="text-sm text-green-800 overflow-auto">
            {JSON.stringify(uploadResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
