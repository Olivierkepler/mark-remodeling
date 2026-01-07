"use client";

import { useState } from "react";
import Image from "next/image";

type AnalysisResult = {
  measurements?: {
    width_ft: number;
    length_ft: number;
    area_sq_ft: number;
    confidence: number;
  };
  description?: string;
  renovation_tips?: string[];
};

export default function RoomPhotoAnalyzer() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError("");
  };

  const analyzePhoto = async () => {
    if (!image) return;

    console.log("📸 Starting photo analysis, file:", { name: image.name, type: image.type, size: image.size });

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setError("");
    setResult(null);

    try {
      console.log("📡 Sending request to /api/photo-analyze");
      const res = await fetch("/api/photo-analyze", {
        method: "POST",
        body: formData,
      });
      console.log("📡 Response received, status:", res.status, res.statusText);

      // Check if response is ok before trying to parse JSON
      if (!res.ok) {
        let errorMessage = "Failed to analyze the image.";
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            console.error("API error details:", errorData.details);
          }
        } catch {
          // If response isn't JSON, use status text
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();

      if (!data.analysis) {
        throw new Error("Invalid response from server.");
      }

      setResult(data.analysis);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Analysis error:", err);
        setError(err.message || "Failed to analyze the image. Please try again.");
      } else if (typeof err === "string") {
        console.error("Analysis error:", err);
        setError(err || "Failed to analyze the image. Please try again.");
      } else {
        console.error("Analysis error:", err);
        setError("Failed to analyze the image. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const m = result?.measurements;

  return (
    <div className="w-full mx-auto bg-white/80 backdrop-blur-lg rounded-xl border border-gray-200 shadow-md p-5">
      
      {/* HEADER */}
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        📸 Auto-Measure Your Room
      </h2>
      <p className="text-sm text-gray-500 mb-3">
        Upload a clear photo showing the floor + at least one wall.
      </p>

      {/* UPLOAD BOX */}
      <label className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center block cursor-pointer hover:bg-gray-100 transition group">
        <p className="text-gray-500 group-hover:text-gray-700">
          Click to upload a room photo (JPG, PNG)
        </p>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {/* IMAGE PREVIEW */}
      {preview && (
        <div className="mt-4">
          <Image
            src={preview}
            alt="Room preview"
            className="w-full h-64 object-cover rounded-xl shadow-md"
            width={1024}
            height={1024}
          />
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={analyzePhoto}
        disabled={!image || loading}
        className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold 
          hover:bg-orange-600 disabled:opacity-40 transition"
      >
        {loading ? "Analyzing..." : "Estimate Floor Size"}
      </button>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="mt-3 text-sm text-red-500 text-center">
          {error}
        </p>
      )}

      {/* RESULTS */}
      {loading && (
        <div className="mt-6 animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4 animate-fadeIn">
          
          {/* --- MEASUREMENTS BLOCK --- */}
          {m && (
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="font-semibold text-gray-800">
                📏 Estimated Floor Measurements
              </h3>

              <p className="text-sm text-gray-700 mt-2">
                <b>Width:</b> {m.width_ft.toFixed(1)} ft
              </p>
              <p className="text-sm text-gray-700">
                <b>Length:</b> {m.length_ft.toFixed(1)} ft
              </p>
              <p className="text-sm text-gray-700">
                <b>Area:</b> {m.area_sq_ft.toFixed(1)} sq ft
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Confidence: {(m.confidence * 100).toFixed(0)}%
                {" "} (visual estimate)
              </p>
            </div>
          )}

          {/* --- AI DESCRIPTION --- */}
          {result.description && (
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="font-semibold text-gray-800">
                🧠 AI Room Analysis
              </h3>
              <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                {result.description}
              </p>
            </div>
          )}

          {/* --- TIPS --- */}
          {result.renovation_tips && (
            <div className="p-4 bg-gray-50 rounded-xl border">
              <h3 className="font-semibold text-gray-800">
                🛠 Renovation Suggestions
              </h3>
              <ul className="mt-2 text-sm text-gray-700 list-disc pl-5 space-y-1">
                {result.renovation_tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
