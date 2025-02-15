import { useState } from "react";
import { uploadFile } from "../api/api";

interface FileUploadProps {
  parentId: string | null;
  token: string;
  refreshFiles: () => void;
}

const FileUpload = ({ parentId, token, refreshFiles }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("parentId", parentId || "null"); 

    try {
      await uploadFile(formData, token);
      alert("File uploaded successfully!");
      refreshFiles();
      setFile(null); 
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} className="border p-2" />
      <button onClick={handleUpload} className="bg-blue-500 text-white p-2 ml-2">
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
