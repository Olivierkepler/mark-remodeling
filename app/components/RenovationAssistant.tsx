"use client";

import { useState } from "react";
import RoomPhotoAnalyzer from "./RoomPhotoAnalyzer";
import TraceAreaOnImage from "./TraceAreaOnImage";
import PixelRuler from "./PixelRuler";
import RoomRedesign from "./RoomRedesign";
import RoomRedesignVision from "./RoomRedesignVision";
import RoomRedesignImage from "./RoomRedesignImage"; // <-- NEW Level 3

import { 
  Ruler, 
  Paintbrush, 
  Wallet, 
  Home, 
  Image as ImageIcon, 
  Pencil,
  Scaling
} from "lucide-react";

type Mode = "measure" | "redesign" | "cost";
type MeasureSubMode = "auto" | "manual" | "calibrated";
type RedesignSubMode = "text" | "vision" | "image"; // <-- UPDATED

export default function RenovationAssistant() {
  const [projectType, setProjectType] = useState<string>("");
  const [mode, setMode] = useState<Mode | null>(null);
  const [measureMode, setMeasureMode] = useState<MeasureSubMode | null>(null);
  const [redesignMode, setRedesignMode] = useState<RedesignSubMode | null>(null);

  const projectOptions = [
    "Bathroom Remodel",
    "Kitchen Renovation",
    "Living Room Redesign",
    "Flooring Replacement",
    "Interior Painting",
    "Basement Finish",
    "Complete Home Renovation",
    "Exterior Upgrade",
    "Custom Project",
  ];

  return (
    <div className="space-y-8">

      {/* Title */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          🏗 Renovation AI Assistant
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us what you're working on so Kepler can personalize your tools.
        </p>
      </div>

      {/* STEP 0 – Project Type */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Home className="w-4 h-4 text-orange-500" />
          What type of project are you planning?
        </label>

        <select
          value={projectType}
          onChange={(e) => {
            setProjectType(e.target.value);
            setMode(null);
            setMeasureMode(null);
            setRedesignMode(null);
          }}
          className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
        >
          <option value="" disabled>Select a project...</option>
          {projectOptions.map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))}
        </select>

        {projectType === "Custom Project" && (
          <input
            type="text"
            placeholder="Describe your custom project..."
            className="w-full border mt-2 border-gray-300 rounded-xl p-3 text-sm"
            onChange={(e) => setProjectType(e.target.value)}
          />
        )}
      </div>

      {/* STEP 1 – Mode Selector */}
      {projectType && (
        <>
          <div className="h-px bg-gray-100" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <ModeCard
              icon={<Ruler className="w-5 h-5" />}
              title="Measure My Room"
              description="Auto, traced or calibrated measurement."
              active={mode === "measure"}
              onClick={() => {
                setMode("measure");
                setMeasureMode(null);
              }}
            />

            <ModeCard
              icon={<Paintbrush className="w-5 h-5" />}
              title="Redesign My Room"
              description="Get personalized design ideas, colors & layouts."
              active={mode === "redesign"}
              onClick={() => {
                setMode("redesign");
                setRedesignMode(null);
              }}
            />

            <ModeCard
              icon={<Wallet className="w-5 h-5" />}
              title="Cost Estimator"
              description="Material & labor cost ranges."
              active={mode === "cost"}
              onClick={() => setMode("cost")}
            />
          </div>
        </>
      )}

      {/* STEP 2 — Measure Sub-Modes */}
      {mode === "measure" && (
        <div className="space-y-4">

          <h3 className="font-medium text-gray-800">Choose Measurement Method</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            <MeasureCard
              icon={<ImageIcon className="w-5 h-5" />}
              title="AI Auto Measurement"
              description="Upload a photo and let AI estimate your room size."
              active={measureMode === "auto"}
              onClick={() => setMeasureMode("auto")}
            />

            <MeasureCard
              icon={<Pencil className="w-5 h-5" />}
              title="Manual Trace Mode"
              description="Draw room shape for precise, cost-free measurement."
              active={measureMode === "manual"}
              onClick={() => setMeasureMode("manual")}
            />

            <MeasureCard
              icon={<Scaling className="w-5 h-5" />}
              title="Calibrated Real Measurement"
              description="Pick two known points, then measure anything."
              active={measureMode === "calibrated"}
              onClick={() => setMeasureMode("calibrated")}
            />

          </div>

          {measureMode === "auto" && <RoomPhotoAnalyzer />}
          {measureMode === "manual" && <TraceAreaOnImage />}
          {measureMode === "calibrated" && <PixelRuler />}

        </div>
      )}

      {/* STEP 3 — Redesign Sub-Modes */}
      {mode === "redesign" && (
        <div className="space-y-4">

          <h3 className="font-medium text-gray-800">Choose Redesign Method</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            <MeasureCard
              icon={<Paintbrush className="w-5 h-5" />}
              title="Describe My Room (Text)"
              description="Tell us about your space and get a full design plan."
              active={redesignMode === "text"}
              onClick={() => setRedesignMode("text")}
            />

            <MeasureCard
              icon={<ImageIcon className="w-5 h-5" />}
              title="Analyze Photo (Vision)"
              description="Upload a room photo; AI analyzes layout & suggests redesign."
              active={redesignMode === "vision"}
              onClick={() => setRedesignMode("vision")}
            />

            <MeasureCard
              icon={<ImageIcon className="w-5 h-5" />}
              title="Generate Before/After Image"
              description="AI transforms your room into a styled redesign."
              active={redesignMode === "image"}
              onClick={() => setRedesignMode("image")}
            />

          </div>

          {redesignMode === "text" && <RoomRedesign />}
          {redesignMode === "vision" && <RoomRedesignVision />}
          {redesignMode === "image" && <RoomRedesignImage />}
        </div>
      )}

      {/* STEP 4 – Cost Mode */}
      {mode === "cost" && (
        <PlaceholderBlock
          title="Cost Estimator (coming soon)"
          text="Enter your project details to get estimated pricing."
        />
      )}

    </div>
  );
}



/* ---------- Shared Card Components ---------- */

function ModeCard({ icon, title, description, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        text-left rounded-xl border p-4 flex flex-col gap-2 transition-all
        ${active ? "border-orange-500 bg-orange-50 shadow-sm" 
                : "border-gray-200 hover:border-orange-300 hover:bg-orange-50/40"}
      `}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <span className={active ? "text-orange-500" : "text-gray-700"}>
          {icon}
        </span>
        <span>{title}</span>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </button>
  );
}

function MeasureCard({ icon, title, description, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        text-left rounded-xl border p-4 flex flex-col gap-2 transition-all
        ${active ? "border-black bg-black/5 shadow-sm" 
                : "border-gray-200 hover:border-black/40 hover:bg-black/5"}
      `}
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
        <span className={active ? "text-black" : "text-gray-700"}>
          {icon}
        </span>
        <span>{title}</span>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </button>
  );
}

function PlaceholderBlock({ title, text }: any) {
  return (
    <div className="w-full mx-auto bg-white/80 backdrop-blur border border-dashed border-gray-200 rounded-xl p-5 text-sm text-gray-700">
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p>{text}</p>
      <p className="mt-2 text-xs text-gray-400">This feature is being built next.</p>
    </div>
  );
}
