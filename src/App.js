import React, { useState } from "react";

export default function Transcriber() {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://whisper-api.vercel.app/transcribe", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setTranscript(data.transcript);
    } catch (error) {
      console.error("Ошибка:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Whisper Transcriber</h1>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading}>
        {loading ? "Обрабатываем..." : "Транскрибировать"}
      </button>
      {transcript && <pre>{transcript}</pre>}
    </div>
  );
}
