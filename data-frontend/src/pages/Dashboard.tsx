import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import FileList from "../components/FileList";
import FileUpload from "../components/FileUpload";
import CreateFolder from "../components/CreateFolder";
import { useNavigate } from "react-router-dom";
import { getFolderContents } from "../api/api";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [files, setFiles] = useState<{ _id: string; name: string; isFolder: boolean }[]>([]);

  if (!auth?.token) {
    navigate("/login");
    return null;
  }

  useEffect(() => {
    fetchFiles(currentFolderId);
  }, [currentFolderId]);

  const fetchFiles = async (folderId: string | null) => {
    try {
      setCurrentFolderId(folderId); // Set current folder
      const response = await getFolderContents(folderId, auth.token);
      setFiles(response.data || []);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">My Drive</h2>

      
      <div className="flex gap-4">
        <CreateFolder parentId={currentFolderId} token={auth.token} refreshFiles={() => fetchFiles(currentFolderId)} />
        <FileUpload parentId={currentFolderId} token={auth.token} refreshFiles={() => fetchFiles(currentFolderId)} />
      </div>

      <FileList parentId={currentFolderId} token={auth.token} navigateToFolder={setCurrentFolderId} />

      {currentFolderId && (
        <button onClick={() => setCurrentFolderId(null)} className="mt-4 bg-gray-500 text-white p-2">
          Go Back
        </button>
      )}
    </div>
  );
};

export default Dashboard;
