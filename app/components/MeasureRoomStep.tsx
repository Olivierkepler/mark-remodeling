"use client";

import { useState } from "react";
import RoomPhotoAnalyzer from "./RoomPhotoAnalyzer";

export default function MeasureRoomStep() {
  const [method, setMethod] = useState<"photo" | "manual" | null>(null);

  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");

  // Computed area
  const area =
    width && length ? (parseFloat(width) * parseFloat(length)).toFixed(1) : null;

  return (
    <div className="space-y-6 mt-4">

      {/* Select Method */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setMethod("photo")}
          className={`p-4 rounded-xl border text-left transition ${
            method === "photo"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 hover:border-orange-400 hover:bg-orange-50/40"
          }`}
        >
          <p className="font-semibold text-gray-900">📸 Upload a Room Photo</p>
          <p className="text-xs text-gray-500 mt-1">
            AI detects dimensions automatically.
          </p>
        </button>

        <button
          onClick={() => setMethod("manual")}
          className={`p-4 rounded-xl border text-left transition ${
            method === "manual"
              ? "border-orange-500 bg-orange-50"
              : "border-gray-200 hover:border-orange-400 hover:bg-orange-50/40"
          }`}
        >
          <p className="font-semibold text-gray-900">✏️ Enter Measurements</p>
          <p className="text-xs text-gray-500 mt-1">
            Provide your own width & length.
          </p>
        </button>
      </div>

      {/* PHOTO MODE */}
      {method === "photo" && (
        <div className="mt-4">
          <RoomPhotoAnalyzer />
        </div>
      )}

      {/* MANUAL INPUT MODE */}
      {method === "manual" && (
        <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            ✏️ Manual Room Measurements
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Width (ft)</label>
              <input
                type="number"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full p-2 mt-1 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="e.g., 12.5"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Length (ft)</label>
              <input
                type="number"
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full p-2 mt-1 border rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="e.g., 15.0"
              />
            </div>
          </div>

          {area && (
            <div className="mt-4 p-3 bg-white rounded-xl border text-sm">
              <p className="text-gray-700">
                <b>Calculated Area:</b> {area} sq ft
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
