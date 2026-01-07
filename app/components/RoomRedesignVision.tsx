"use client";

import { useState } from "react";

export default function RoomRedesignVision() {
  type RedesignVisionResult = {
    output: string;
  } | null;

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RedesignVisionResult>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    const res = await fetch("/api/redesign-vision", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4">

      <label className="font-medium text-gray-700 text-sm">
        Upload a photo of your room
      </label>

      <input
        type="file"
        accept="image/*"
        className="w-full border rounded-xl p-3"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        disabled={!file}
        onClick={handleUpload}
        className="w-full bg-black text-white p-3 rounded-xl disabled:opacity-40"
      >
        {loading ? "Analyzing room..." : "Analyze & Redesign"}
      </button>

      {result && (
        <div className="bg-white border p-4 rounded-xl space-y-3">
          <h3 className="font-semibold text-lg">AI Redesign Suggestions</h3>

          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {result.output}
          </pre>
        </div>
      )}

    </div>
  );
}
