"use client";

import { useState, useRef } from "react";
import { Stage, Layer, Image as KonvaImage, Line } from "react-konva";
import useImage from "use-image";
import { Ruler } from "lucide-react";
import type Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";

export default function TraceAreaOnImage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [points, setPoints] = useState<number[]>([]);
  const [isClosed, setIsClosed] = useState(false);
  const [referenceFeet, setReferenceFeet] = useState("");
  const [referencePixels, setReferencePixels] = useState("");
  const [areaFt, setAreaFt] = useState<number | null>(null);

  const stageRef = useRef<Konva.Stage | null>(null);
  const [img] = useImage(imageUrl ?? "");

  // Handle file upload
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUrl(URL.createObjectURL(file));
    setPoints([]);
    setIsClosed(false);
    setAreaFt(null);

    // allow selecting the same file again
    e.target.value = "";
  };

  // Add point on click
  const handleClick = (_evt: KonvaEventObject<MouseEvent>) => {
    if (isClosed) return;

    const stage = stageRef.current;
    if (!stage) return;

    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    setPoints((prev) => [...prev, pointer.x, pointer.y]);
  };

  // Close polygon
  const closePolygon = () => {
    if (points.length < 6) return; // must be at least 3 points
    setIsClosed(true);
  };

  // Compute area in pixels using the shoelace formula
  const computePixelArea = () => {
    let area = 0;
    const n = points.length / 2;

    for (let i = 0; i < n; i++) {
      const x1 = points[2 * i];
      const y1 = points[2 * i + 1];
      const x2 = points[2 * ((i + 1) % n)];
      const y2 = points[2 * ((i + 1) % n) + 1];

      area += x1 * y2 - x2 * y1;
    }

    return Math.abs(area) / 2;
  };

  // Convert pixel area → real-world ft²
  const calculateArea = () => {
    const refFt = Number(referenceFeet);
    const refPx = Number(referencePixels);

    if (!Number.isFinite(refFt) || !Number.isFinite(refPx)) return;
    if (refFt <= 0 || refPx <= 0) return;

    const pixelArea = computePixelArea();

    // Conversion factor: (real feet / pixel length)^2
    const scaleFactor = Math.pow(refFt / refPx, 2);
    const realArea = pixelArea * scaleFactor;

    setAreaFt(realArea);
  };

  return (
    <div className="space-y-6">
      {/* Upload Image */}
      <div>
        <label className="block font-medium mb-1">📸 Upload Room Image</label>
        <input type="file" accept="image/*" onChange={handleUpload} />
      </div>

      {imageUrl && (
        <>
          {/* Drawing Canvas */}
          <div className="border rounded-xl overflow-hidden shadow max-w-full">
            <Stage
              width={600}
              height={400}
              ref={stageRef}
              onClick={handleClick}
              className="cursor-crosshair bg-black"
            >
              <Layer>
                <KonvaImage image={img ?? undefined} width={600} height={400} />

                {/* Polygon */}
                <Line
                  points={points}
                  stroke="orange"
                  strokeWidth={3}
                  closed={isClosed}
                  fill={isClosed ? "rgba(255,165,0,0.2)" : undefined}
                />
              </Layer>
            </Stage>
          </div>

          {/* Polygon Controls */}
          {!isClosed && points.length >= 6 && (
            <button
              type="button"
              onClick={closePolygon}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              Close Shape
            </button>
          )}

          {/* Reference Measurement Inputs */}
          {isClosed && (
            <div className="space-y-3 p-4 border rounded-xl bg-gray-50">
              <h3 className="font-semibold flex items-center gap-2">
                <Ruler className="w-4 h-4 text-orange-500" />
                Enter Reference Measurement
              </h3>

              <p className="text-sm text-gray-600">
                Pick something in the image with a known size (door width, tile
                size, window height).
              </p>

              <input
                type="number"
                placeholder="Real-world length (feet)"
                value={referenceFeet}
                onChange={(e) => setReferenceFeet(e.target.value)}
                className="border p-2 rounded w-full"
              />

              <input
                type="number"
                placeholder="Pixel length of reference"
                value={referencePixels}
                onChange={(e) => setReferencePixels(e.target.value)}
                className="border p-2 rounded w-full"
              />

              <button
                type="button"
                onClick={calculateArea}
                className="px-4 py-2 bg-black text-white rounded-lg w-full"
              >
                Calculate Area
              </button>
            </div>
          )}

          {/* Output */}
          {areaFt !== null && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-300">
              <h3 className="font-semibold text-green-700">📏 Estimated Area</h3>
              <p className="text-lg font-bold mt-1">{areaFt.toFixed(2)} ft²</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
