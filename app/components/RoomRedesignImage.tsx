"use client";

import { useState } from "react";

const STYLES = [
  "Modern Minimalist",
  "Warm Scandinavian",
  "Luxury Hotel",
  "Cozy Bohemian",
  "Japandi",
  "Industrial Loft",
  "Soft Neutral",
  "Bold Color Pop",
  "Custom Style",
];

export default function RoomRedesignImage() {
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState<string>("");
  const [customStyle, setCustomStyle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const activeStyle = style === "Custom Style" && customStyle ? customStyle : style;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setResultUrl(null);
    setError("");
  };

  const handleGenerate = async () => {
    if (!file) {
      setError("Please upload a room photo first.");
      return;
    }
    if (!activeStyle) {
      setError("Please choose a design style.");
      return;
    }

    setLoading(true);
    setError("");
    setResultUrl(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("style", activeStyle);

    try {
      const res = await fetch("/api/redesign-image", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate redesign.");
      }

      const data = await res.json();
      setResultUrl(data.imageUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Style Picker */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-800">
          Choose a design style
        </label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <option value="">Select a style...</option>
          {STYLES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {style === "Custom Style" && (
          <input
            type="text"
            placeholder="Describe your custom style (e.g. 'earthy Mediterranean with terracotta and arches')"
            className="w-full border rounded-xl p-3 text-sm mt-2 focus:ring-2 focus:ring-orange-400 outline-none"
            value={customStyle}
            onChange={(e) => setCustomStyle(e.target.value)}
          />
        )}
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-800">
          Upload your room photo
        </label>
        <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-gray-50 transition">
          <p className="text-xs text-gray-500">
            Click to upload a JPG/PNG of your room
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {file && (
          <p className="text-xs text-gray-500">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-black/90 disabled:opacity-40 transition"
      >
        {loading ? "Generating redesigned image..." : "Generate AI Redesign Image"}
      </button>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}

      {/* Before / After */}
      {(file || resultUrl) && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BEFORE */}
          {file && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Before
              </h3>
              <div className="rounded-xl overflow-hidden border bg-gray-50">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Original room"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          )}

          {/* AFTER */}
          {resultUrl && (
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                After – {activeStyle}
              </h3>
              <div className="rounded-xl overflow-hidden border bg-gray-50">
                <img
                  src={resultUrl}
                  alt="Redesigned room"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
