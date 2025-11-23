"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

export default function RenovationShowcase() {
  const router = useRouter();


  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 mt-10 flex flex-col lg:flex-row gap-8">

      {/* LEFT BLOCK – PROMO SECTION */}
      <div className="w-full lg:w-2/3 bg-gradient-to-r from-black to-black/80 rounded-2xl text-white relative">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-10">

          {/* LEFT – TEXT CONTENT */}
          <div className="w-full lg:w-1/2 pl-10  flex flex-col gap-3">
            <p className="text-xs opacity-80 ">Sponsored</p>

            <div className="flex items-center gap-2">
              <Image
                src="/images/robot.png"
                width={40}
                height={40}
                alt="Kepler Logo"
              />
              <span className="text-2xl md:text-3xl font-bold">Kepler</span>
            </div>

            <h1 className="text-3xl md:text-2xl font-black leading-tight mt-4">
              SAVE BIG ON YOUR NEXT RENOVATION <br /> WITHOUT SACRIFICING QUALITY
            </h1>

            <p className="opacity-90 leading-relaxed text-sm md:text-base mt-2">
              Unlock contractor-level pricing, premium materials, and personalized renovation
              planning—all from one powerful app.
            </p>

            {/* ✨ FUTURISTIC RENOVATION AI BUTTON */}
            <div className="relative group w-fit mt-5">
              <button
                onClick={() => router.push("/cmd")}
                className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_0_25px_rgba(255,150,80,0.4)] hover:shadow-[0_0_45px_rgba(255,150,80,0.7)] rounded-2xl p-2 text-white flex items-center justify-center gap-2 transition-all duration-500 hover:scale-110 hover:-rotate-2 animate-float cursor-pointer"
              >
                <Image
                  src="/images/robot.png"
                  width={50}
                  height={50}
                  alt="Kepler Logo"
                />
                <span className="font-semibold text-sm md:text-base">Renovation AI</span>
              </button>

              {/* Tooltip */}
              <span
                className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs md:text-sm px-3 md:px-4 py-2 rounded-xl shadow-lg whitespace-nowrap transition-all duration-500"
              >
                Open AI Renovation Assistant →
              </span>

              {/* Neon Glow */}
              <div className="absolute inset-0 rounded-2xl -z-10 bg-gradient-to-br from-orange-500/50 to-yellow-400/40 opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500"></div>
            </div>

            <style>{`
              @keyframes float {
                0% { transform: translateY(0); }
                50% { transform: translateY(-6px); }
                100% { transform: translateY(0); }
              }
              .animate-float {
                animation: float 4s ease-in-out infinite;
              }
            `}</style>
          </div>

          {/* RIGHT – IMAGE CAROUSEL */}
          <div className="relative w-full lg:w-1/2 h-[280px] sm:h-[350px] md:h-[420px] lg:h-[450px] rounded-b-2xl lg:rounded-r-2xl overflow-hidden">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-full"
            >
              {[
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
                "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
                "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
                "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
              ].map((url, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-full">
                    <Image
                      src={url}
                      alt={`Renovation Slide ${i}`}
                      fill
                      className="object-cover rounded-b-2xl lg:rounded-r-2xl"
                      priority={i === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* RIGHT BLOCK – STATIC / VIDEO PROMO */}
      <div className="w-full lg:flex-1 rounded-2xl overflow-hidden relative h-[300px] sm:h-[380px] md:h-[450px] lg:h-auto">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Holiday Decor"
          fill
          className="object-cover"
        />

        <div className="absolute top-8 left-8 text-white drop-shadow-xl max-w-[220px]">
          <h2 className="text-2xl md:text-3xl font-black leading-tight">
            START DECKING<br />THE HALLS
          </h2>

          <p className="mt-3 text-sm md:text-base opacity-90">
            Holiday Decor for<br />Inside & Out
          </p>

          <button className="mt-4 border-b border-white text-sm md:text-base hover:opacity-80">
            Shop Now
          </button>
        </div>

        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur p-3 rounded-full shadow text-black text-lg">
          ▶
        </button>
      </div>
    </div>
  );
}
