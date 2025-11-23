"use client";

import { useRouter } from "next/navigation";
import RenovationAssistant from "@/app/components/RenovationAssistant";

export default function CommandModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-6">
      {/* Modal window */}
      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl overflow-hidden animate-fadeIn">
        {/* Top bar */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold">🏗 Renovation Assistant</h2>

          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-800 transition text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-auto p-5">
          <RenovationAssistant />
        </div>
      </div>
    </div>
  );
}
