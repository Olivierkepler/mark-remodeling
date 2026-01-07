"use client";

import { useState } from "react";

export default function RoomRedesign() {
  type RedesignResult = {
    plan?: string;
    suggestions?: string[];
    [key: string]: unknown; // Allows additional properties if present
  };

  const [style, setStyle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RedesignResult | null>(null);

  const styles = [
    "Modern",
    "Minimalist",
    "Scandinavian",
    "Luxury",
    "Industrial",
    "Bohemian",
    "Farmhouse",
    "Traditional",
    "Custom Style"
  ];

  const generateRedesign = async () => {
    if (!description) return;

    setLoading(true);

    const res = await fetch("/api/redesign", {
      method: "POST",
      body: JSON.stringify({ style, description })
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4">

      {/* Style Picker */}
      <div>
        <label className="text-sm font-medium text-gray-700">Select Style</label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full border rounded-xl p-3 mt-1"
        >
          <option value="">Choose a style...</option>
          {styles.map((s) => <option key={s}>{s}</option>)}
        </select>

        {style === "Custom Style" && (
          <input
            className="w-full border rounded-xl p-3 mt-2 text-sm"
            placeholder="Describe your custom style..."
            onChange={(e) => setStyle(e.target.value)}
          />
        )}
      </div>

      {/* Description Input */}
      <textarea
        className="w-full border rounded-xl p-3 text-sm"
        placeholder="Describe your room (size, light, colors, what you want)"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={generateRedesign}
        className="w-full bg-black text-white p-3 rounded-xl"
      >
        {loading ? "Redesigning..." : "Generate Redesign Plan"}
      </button>

      {result && (
        <div className="bg-white border p-4 rounded-xl space-y-3">
          <h3 className="font-semibold text-lg">Your Redesign Plan</h3>

          <pre className="whitespace-pre-wrap text-sm text-gray-700">
            {result.plan}
          </pre>
          {result.suggestions && result.suggestions.length > 0 && (
            <ul className="list-disc list-inside text-sm text-gray-700">
              {result.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
