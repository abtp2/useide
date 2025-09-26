"use client";
import styles from "./editor.module.css";
import { useState, useEffect } from "react";
import Topbar from "@/components/layout/Topbar";
import Navtabs from "@/components/editor/Navtabs";

export default function Editor() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch("/api/github/tree");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch files");
        setFiles(data.files);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchFiles();
  }, []);

  return (
    <div className={styles.editor}>
      <Topbar />
      <Navtabs />

      <h2>📂 Repo Files</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul style={{ background: "#111", color: "#0f0", padding: "10px", borderRadius: "8px" }}>
        {files.length > 0 ? (
          files.map((file, idx) => <li key={idx}>{file}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}