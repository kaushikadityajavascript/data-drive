import { useState } from "react";
import { createFolder } from "../api/api";

interface CreateFolderProps {
  parentId: string | null;
  token: string;
  refreshFiles: () => void;
}

const CreateFolder = ({ parentId, token, refreshFiles }: CreateFolderProps) => {
  const [folderName, setFolderName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleCreate = async () => {
    if (!folderName.trim()) return;

    try {
      await createFolder(folderName, parentId, token);
      refreshFiles();
      setFolderName("");
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to create folder:", error);
      alert("Could not create folder.");
    }
  };

  return (
    <div>
      <button 
        onClick={() => setIsOpen(true)} 
        className="bg-blue-500 text-white p-2 rounded"
      >
        + New Folder
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">Create Folder</h3>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Folder Name"
              className="border p-2 w-full mt-2"
            />
            <div className="mt-4 flex justify-end">
              <button onClick={() => setIsOpen(false)} className="p-2 mr-2">Cancel</button>
              <button onClick={handleCreate} className="bg-blue-500 text-white p-2">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateFolder;
