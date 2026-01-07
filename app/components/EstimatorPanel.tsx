"use client";

import { useMemo, useState } from "react";
import { X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { generateEstimatePDF } from "@/utils/generatePDF"; // ← ADDED

type ServiceType = "kitchen" | "bathroom" | "flooring";
type MaterialLevel = "basic" | "standard" | "premium";
type Step = 1 | 2 | 3 | 4 | 5;

type ExtrasKey = "demolition" | "plumbing" | "electrical";
type ExtrasState = Record<ExtrasKey, boolean>;

type EstimatorPanelProps = {
  open: boolean;
  onClose: () => void;
  onSendToChat: (markdown: string) => void;
  isDark: boolean;
};

const serviceLabels: Record<ServiceType, string> = {
  kitchen: "Kitchen Remodel",
  bathroom: "Bathroom Remodel",
  flooring: "Flooring Installation",
};

const materialLabels: Record<MaterialLevel, string> = {
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
};

// Realistic contractor pricing formulas
const baseMinCost: Record<ServiceType, number> = {
  kitchen: 8000,
  bathroom: 6000,
  flooring: 1200,
};

const costPerSqFt: Record<ServiceType, number> = {
  kitchen: 160,
  bathroom: 140,
  flooring: 8,
};

const materialMultipliers: Record<ServiceType, Record<MaterialLevel, number>> = {
  kitchen: {
    basic: 1.0,
    standard: 1.3,
    premium: 1.6,
  },
  bathroom: {
    basic: 1.0,
    standard: 1.25,
    premium: 1.5,
  },
  flooring: {
    basic: 1.0,
    standard: 1.4,
    premium: 1.8,
  },
};

// Helper: keep step typed without `any`
function clampStep(n: number): Step {
  if (n <= 1) return 1;
  if (n >= 5) return 5;
  return n as Step;
}

export default function EstimatorPanel({
  open,
  onClose,
  onSendToChat,
  isDark,
}: EstimatorPanelProps) {
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<ServiceType | null>(null);
  const [roomSize, setRoomSize] = useState<string>("");
  const [material, setMaterial] = useState<MaterialLevel>("standard");
  const [extras, setExtras] = useState<ExtrasState>({
    demolition: false,
    plumbing: false,
    electrical: false,
  });

  const parsedSqFt = useMemo(() => {
    const n = Number(roomSize);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [roomSize]);

  const estimate = useMemo(() => {
    if (!service || !parsedSqFt) return null;

    const base = baseMinCost[service];
    const perSq = costPerSqFt[service];
    const mult = materialMultipliers[service][material];

    let total = Math.max(base, perSq * parsedSqFt * mult);
    const breakdown: string[] = [];

    breakdown.push(
      `Base & size-adjusted cost: approx. $${(perSq * parsedSqFt * mult).toFixed(
        0
      )}`
    );

    // Extras
    if (extras.demolition) {
      if (service === "flooring") {
        const demo = parsedSqFt * 1.75;
        total += demo;
        breakdown.push(`Existing floor tear-out: approx. $${demo.toFixed(0)}`);
      } else {
        total += 700;
        breakdown.push("Demolition / tear-out: approx. $700");
      }
    }

    if (extras.plumbing && (service === "kitchen" || service === "bathroom")) {
      const plumbing = service === "bathroom" ? 900 : 750;
      total += plumbing;
      breakdown.push(
        `Plumbing adjustments (${serviceLabels[service]}): approx. $${plumbing}`
      );
    }

    if (extras.electrical) {
      const electrical = service === "kitchen" ? 950 : 600;
      total += electrical;
      breakdown.push(`Electrical updates: approx. $${electrical}`);
    }

    const low = total * 0.9;
    const high = total * 1.15;

    return {
      total,
      low,
      high,
      breakdown,
    };
  }, [service, parsedSqFt, material, extras]);

  const canNext = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!parsedSqFt;
    if (step === 3) return !!material;
    return true;
  };

  const next = () => {
    if (!canNext()) return;
    setStep((prev) => clampStep(prev + 1));
  };

  const back = () => {
    setStep((prev) => clampStep(prev - 1));
  };

  const reset = () => {
    setStep(1);
    setService(null);
    setRoomSize("");
    setMaterial("standard");
    setExtras({
      demolition: false,
      plumbing: false,
      electrical: false,
    });
  };

  // SEND TO CHAT
  const handleSendToChat = () => {
    if (!service || !parsedSqFt || !estimate) return;

    const { low, high, breakdown } = estimate;

    const selectedExtras = Object.entries(extras)
      .filter(([, v]) => v)
      .map(([k]) => k.replace(/([A-Z])/g, " $1").toLowerCase());

    const markdown = [
      `### 🧮 Estimate Summary – ${serviceLabels[service]}`,
      "",
      `- **Project:** ${serviceLabels[service]}`,
      `- **Room Size:** ${parsedSqFt} sq ft`,
      `- **Materials:** ${materialLabels[material]}`,
      selectedExtras.length
        ? `- **Extras:** ${selectedExtras.join(", ")}`
        : `- **Extras:** None`,
      "",
      `**Estimated Range:** $${low.toFixed(0)} – $${high.toFixed(0)}`,
      "",
      breakdown.length
        ? `**Breakdown:**\n${breakdown.map((b) => `- ${b}`).join("\n")}`
        : "",
      "",
      "> Ballpark estimate. Final pricing confirmed after on-site inspection.",
    ]
      .filter(Boolean)
      .join("\n");

    onSendToChat(markdown);
    onClose();
    reset();
  };

  // PDF EXPORT — ADDED
  const handleDownloadPDF = () => {
    if (!service || !parsedSqFt || !estimate) return;

    generateEstimatePDF({
      roomType: serviceLabels[service],
      sqft: parsedSqFt,
      material: materialLabels[material],
      laborCost: estimate.total * 0.55,
      materialCost: estimate.total * 0.45,
      total: estimate.total,
    });
  };

  const containerBase = `
    h-full flex flex-col rounded-2xl border shadow-lg overflow-hidden
    ${
      isDark
        ? "bg-slate-900/90 border-slate-700 text-slate-50"
        : "bg-white/90 border-white/60 text-gray-900"
    }
  `;

  const stepLabel = (s: Step) => {
    switch (s) {
      case 1:
        return "Project Type";
      case 2:
        return "Room Size";
      case 3:
        return "Materials";
      case 4:
        return "Extras";
      case 5:
        return "Summary";
      default:
        return "";
    }
  };

  return (
    <div
      className={`
        h-full transition-all duration-300 ease-out
        ${
          open
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4 pointer-events-none"
        }
      `}
    >
      <div className={containerBase}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/10">
          <div>
            <div className="text-xs uppercase tracking-wide text-orange-500 font-semibold">
              Estimation Wizard
            </div>
            <div className="text-sm font-semibold">
              Step {step} of 5 — {stepLabel(step)}
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
            }}
            className="
              inline-flex items-center justify-center w-7 h-7
              rounded-full border border-black/10 dark:border-white/30
              text-xs hover:bg-black/5 dark:hover:bg-white/10
            "
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-4 pt-3">
          <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-4 py-3 space-y-4 overflow-y-auto text-sm">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                What type of project are you looking to estimate?
              </p>
              <div className="grid grid-cols-1 gap-2">
                {(["kitchen", "bathroom", "flooring"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    className={`
                      text-left px-3 py-2 rounded-xl border text-xs md:text-sm
                      ${
                        service === s
                          ? "border-orange-500/80 bg-orange-50 text-orange-900 dark:bg-orange-500/10 dark:text-orange-100"
                          : "border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    <div className="font-medium">{serviceLabels[s]}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Approximate room size in square feet.
              </p>
              <input
                type="number"
                min={1}
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                className={`
                  w-full px-3 py-2 rounded-xl border text-sm
                  focus:outline-none focus:ring-2 focus:ring-orange-400
                  ${
                    isDark
                      ? "bg-slate-800 border-slate-600 text-slate-50"
                      : "bg-white border-gray-300 text-gray-900"
                  }
                `}
                placeholder="e.g. 120"
              />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                What level of finishes are you considering?
              </p>
              <div className="grid grid-cols-1 gap-2">
                {(["basic", "standard", "premium"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setMaterial(lvl)}
                    className={`
                      text-left px-3 py-2 rounded-xl border text-xs md:text-sm
                      ${
                        material === lvl
                          ? "border-orange-500/80 bg-orange-50 text-orange-900 dark:bg-orange-500/10 dark:text-orange-100"
                          : "border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    <div className="font-medium">{materialLabels[lvl]}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Any extras you expect may be needed?
              </p>

              <div className="space-y-2 text-xs md:text-sm">
                {(
                  [
                    { key: "demolition", label: "Demolition / tear-out" },
                    { key: "plumbing", label: "Plumbing adjustments" },
                    { key: "electrical", label: "Electrical updates" },
                  ] as const
                ).map((opt) => (
                  <label
                    key={opt.key}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={extras[opt.key]}
                      onChange={(e) =>
                        setExtras((prev) => ({
                          ...prev,
                          [opt.key]: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Here’s a preview of your estimate based on your inputs.
              </p>

              <div
                className={`
                  rounded-xl border px-3 py-3 text-xs md:text-sm space-y-1
                  ${
                    isDark
                      ? "border-white/10 bg-white/5"
                      : "border-black/5 bg-black/5"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">
                    {service ? serviceLabels[service] : "Project"}
                  </span>
                </div>

                <div>
                  <span className="font-medium">Room size:</span>{" "}
                  {parsedSqFt ? `${parsedSqFt} sq ft` : "Not set"}
                </div>
                <div>
                  <span className="font-medium">Materials:</span>{" "}
                  {materialLabels[material]}
                </div>
                <div>
                  <span className="font-medium">Extras:</span>{" "}
                  {Object.values(extras).some(Boolean)
                    ? (Object.entries(extras) as Array<[ExtrasKey, boolean]>)
                        .filter(([, v]) => v)
                        .map(([k]) =>
                          k.replace(/([A-Z])/g, " $1").toLowerCase()
                        )
                        .join(", ")
                    : "None"}
                </div>

                <div className="mt-2 pt-2 border-t border-black/5 dark:border-white/10">
                  <div className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Estimated range
                  </div>
                  {estimate && parsedSqFt && service ? (
                    <div className="text-base font-semibold">
                      ${estimate.low.toFixed(0)} – ${estimate.high.toFixed(0)}
                    </div>
                  ) : (
                    <div className="text-[11px] text-red-500">
                      Missing data for calculation.
                    </div>
                  )}
                </div>
              </div>

              {/* PDF BUTTON — ADDED */}
              <button
                onClick={handleDownloadPDF}
                className="
                  w-full mt-3 py-2 rounded-xl text-sm font-semibold
                  bg-orange-600 text-white hover:bg-orange-700
                  transition
                "
              >
                Download PDF Estimate
              </button>
            </div>
          )}
        </div>

        {/* Footer Controls */}
        <div className="px-4 py-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
          <button
            type="button"
            onClick={step === 1 ? onClose : back}
            className="
              inline-flex items-center gap-1 px-3 py-1.5 rounded-full border
              border-black/10 dark:border-white/20
              hover:bg-black/5 dark:hover:bg-white/10
            "
          >
            {step === 1 ? (
              <>
                <X className="w-3 h-3" /> Close
              </>
            ) : (
              <>
                <ChevronLeft className="w-3 h-3" /> Back
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="
                hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px]
                border-black/10 dark:border-white/20
                hover:bg-black/5 dark:hover:bg-white/10
              "
            >
              Reset
            </button>

            {step < 5 && (
              <button
                type="button"
                disabled={!canNext()}
                onClick={next}
                className={`
                  inline-flex items-center gap-1 px-3 py-1.5 rounded-full
                  ${
                    canNext()
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                Next <ChevronRight className="w-3 h-3" />
              </button>
            )}

            {step === 5 && (
              <button
                type="button"
                disabled={!estimate || !service || !parsedSqFt}
                onClick={handleSendToChat}
                className={`
                  inline-flex items-center gap-1 px-3 py-1.5 rounded-full
                  ${
                    estimate && service && parsedSqFt
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                Send estimate to chat
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
