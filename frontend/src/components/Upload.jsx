import axios from "axios";
import { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    await axios.post("http://localhost:5000/api/upload", formData);

    setLoading(false);
    alert("✅ Bill Uploaded!");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📤 Upload Bill</h2>

      <input
        type="file"
        className="mb-4 block w-full text-sm"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all"
      >
        {loading ? "Processing..." : "Upload"}
      </button>
    </div>
  );
}
