import { useEffect, useState } from "react";
import { getFolderContents,deleteFile } from "../api/api";

interface FileListProps {
  folderId: string | null;
  token: string;
  navigateToFolder: (id: string | null) => void;
}

const FileList = ({ folderId, token, navigateToFolder }: FileListProps) => {
  const [files, setFiles] = useState<{ _id: string; name: string; isFolder: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    fetchFiles();
  }, [folderId, token]);

  const fetchFiles = async () => {
      try {
        const response = await getFolderContents(folderId, token);
        setFiles(response.data.data);
      } catch (error) {
        console.error("Failed to load files:", error);
      } finally {
        setLoading(false);
      }
    };
  

   const handleDelete = async (fileId: string) => {
    try {
      await deleteFile(fileId, token);
      alert("File deleted successfully!");
      fetchFiles(); 
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };

  if (loading) return <p>Loading files...</p>;

 return (
    <div>
      {files.length === 0 ? (
        <p>No files or folders found.</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file._id} className="p-2 border-b flex justify-between items-center">
              <div>
                {file.isFolder ? (
                  <button onClick={() => navigateToFolder(file._id)} className="text-blue-500">
                    📁 {file.name}
                  </button>
                ) : (
                  <span>📄 {file.name}</span>
                )}
              </div>
              {/* ✅ Delete Button */}
              <button
                onClick={() => handleDelete(file._id)}
                className="bg-red-500 text-white p-1 text-sm rounded"
              >
                ❌ Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileList;
