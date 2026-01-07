"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

export default function PixelRuler() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // We keep natural image dimensions so the canvas matches the real pixels
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  const [calibrationPoints, setCalibrationPoints] = useState<Point[]>([]);
  const [measuringPoints, setMeasuringPoints] = useState<Point[]>([]);
  const [realLength, setRealLength] = useState<number>(0); // inches or ft
  const [pixelsPerUnit, setPixelsPerUnit] = useState<number | null>(null);
  const [measurementResult, setMeasurementResult] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Load the selected image and draw it into the canvas (no <img> needed)
  useEffect(() => {
    if (!imageUrl) return;

    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      // Match canvas size to the image's natural pixels
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // Save for UI preview sizing
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Optional: draw existing points if state already has them
      // (kept minimal; you can enhance later with markers/lines)
    };

    img.src = imageUrl;

    return () => {
      // no-op cleanup; object URL cleanup happens on upload/reset
    };
  }, [imageUrl]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    // If replacing an existing image, clean up the old blob URL
    setImageUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });

    setCalibrationPoints([]);
    setMeasuringPoints([]);
    setPixelsPerUnit(null);
    setMeasurementResult(null);
    setRealLength(0);
    setImgSize(null);

    // allow re-uploading the same file
    e.target.value = "";
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();

    // Convert click position (CSS pixels) → canvas pixels
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const point: Point = { x, y };

    // Step 1: Calibration
    if (pixelsPerUnit === null) {
      if (calibrationPoints.length < 2) {
        const newPts = [...calibrationPoints, point];
        setCalibrationPoints(newPts);

        if (newPts.length === 2) calculateCalibration(newPts);
      }
      return;
    }

    // Step 2: Measuring
    if (measuringPoints.length < 2) {
      const newPts = [...measuringPoints, point];
      setMeasuringPoints(newPts);

      if (newPts.length === 2) calculateMeasurement(newPts);
    }
  };

  const distance = (p1: Point, p2: Point) =>
    Math.hypot(p2.x - p1.x, p2.y - p1.y);

  const calculateCalibration = (pts: Point[]) => {
    const pixelDist = distance(pts[0], pts[1]);
    const unitValue = Number(realLength);

    if (!unitValue || unitValue <= 0) {
      alert("Enter a valid real length.");
      return;
    }

    setPixelsPerUnit(pixelDist / unitValue);
  };

  const calculateMeasurement = (pts: Point[]) => {
    if (!pixelsPerUnit) return;

    const pixelDist = distance(pts[0], pts[1]);
    setMeasurementResult(pixelDist / pixelsPerUnit);
  };

  const resetMeasureOnly = () => {
    setMeasuringPoints([]);
    setMeasurementResult(null);

    // Redraw the image to clear any future overlays if you add them
    if (!imageUrl) return;
    const img = new window.Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageUrl;
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer">
        <p className="text-sm text-gray-600">Upload room photo (JPG/PNG)</p>
        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
      </label>

      {/* Preview */}
      {imageUrl && (
        <div className="space-y-3">
          {/* Optional visual preview using next/image (removes no-img warning) */}
          {imgSize && (
            <div className="relative w-full overflow-hidden rounded-xl border">
              <Image
                src={imageUrl}
                alt="Room preview"
                width={imgSize.w}
                height={imgSize.h}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Canvas (this is what you click on) */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="border rounded-xl shadow w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Calibration Input */}
      {imageUrl && pixelsPerUnit === null && (
        <div className="p-4 bg-gray-50 rounded-xl border">
          <h3 className="font-semibold text-gray-700">Step 1 — Calibration</h3>
          <p className="text-xs text-gray-500 mt-1">
            Click two points on a known object (ex: top & bottom of a standard 80” door)
          </p>

          <input
            type="number"
            placeholder="Enter real-world length (in inches)"
            value={realLength}
            onChange={(e) => setRealLength(Number(e.target.value))}
            className="mt-3 w-full p-2 border rounded-lg text-sm"
          />

          <p className="text-xs mt-2 text-gray-500">
            Now click two points on the photo to calibrate.
          </p>
        </div>
      )}

      {/* Measurement */}
      {pixelsPerUnit !== null && (
        <div className="p-4 bg-gray-50 rounded-xl border">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-gray-800">Step 2 — Measure</h3>
              <p className="text-xs text-gray-500">
                Click two points on anything to measure actual length.
              </p>
            </div>

            <button
              type="button"
              onClick={resetMeasureOnly}
              className="text-xs px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              Reset measure
            </button>
          </div>

          {measurementResult !== null && (
            <p className="mt-3 text-sm font-medium">
              📏 Measured: <b>{measurementResult.toFixed(2)}</b> inches
              <br />
              (~{(measurementResult / 12).toFixed(2)} ft)
            </p>
          )}
        </div>
      )}
    </div>
  );
}
