"use client";

import { useRef, useState } from "react";

type Point = { x: number; y: number };

export default function PixelRuler() {
  const [image, setImage] = useState<string | null>(null);
  const [calibrationPoints, setCalibrationPoints] = useState<Point[]>([]);
  const [measuringPoints, setMeasuringPoints] = useState<Point[]>([]);
  const [realLength, setRealLength] = useState<number>(0); // inches or ft
  const [pixelsPerUnit, setPixelsPerUnit] = useState<number | null>(null);
  const [measurementResult, setMeasurementResult] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));
    setCalibrationPoints([]);
    setMeasuringPoints([]);
    setPixelsPerUnit(null);
    setMeasurementResult(null);
  };

  const handleCanvasClick = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const point = { x, y };

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

  const distance = (p1: Point, p2: Point) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  };

  const calculateCalibration = (pts: Point[]) => {
    const pixelDist = distance(pts[0], pts[1]);
    const unitValue = Number(realLength);

    if (!unitValue || unitValue <= 0) return alert("Enter a valid real length.");

    const ratio = pixelDist / unitValue;
    setPixelsPerUnit(ratio);
  };

  const calculateMeasurement = (pts: Point[]) => {
    if (!pixelsPerUnit) return;

    const pixelDist = distance(pts[0], pts[1]);
    const result = pixelDist / pixelsPerUnit;

    setMeasurementResult(result);
  };

  return (
    <div className="space-y-6">
      {/* Upload */}
      <label className="block border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer">
        <p className="text-sm text-gray-600">Upload room photo (JPG/PNG)</p>
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>

      {/* Preview */}
      {image && (
        <div className="relative">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="border rounded-xl shadow w-full"
          />
          <img
            src={image}
            alt="Room"
            className="hidden"
            onLoad={(e: any) => {
              const canvas = canvasRef.current;
              const ctx = canvas?.getContext("2d");
              if (!canvas || !ctx) return;

              canvas.width = e.target.width;
              canvas.height = e.target.height;
              ctx.drawImage(e.target, 0, 0);
            }}
          />
        </div>
      )}

      {/* Calibration Input */}
      {image && pixelsPerUnit === null && (
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
          <h3 className="font-semibold text-gray-800">Step 2 — Measure</h3>
          <p className="text-xs text-gray-500">
            Click two points on anything to measure actual length.
          </p>

          {measurementResult && (
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
