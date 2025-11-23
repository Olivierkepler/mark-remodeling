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
    <div className="w-full px-6 lg:px-10 mt-10 flex flex-row gap-8">

      {/* LEFT BLOCK – PROMO SECTION */}
      <div className="w-2/3 bg-gradient-to-r from-black to-black/80 rounded-2xl text-white relative">

        <div className="flex justify-between items-center gap-10">

          {/* LEFT – TEXT CONTENT */}
          <div className="w-1/2 p-8 flex flex-col gap-3">
            <p className="text-xs opacity-80">Sponsored</p>

            <div className="flex items-center gap-2">
              <Image
                src="/images/robot.png"
                width={40}
                height={40}
                alt="Kepler Logo"
              />
              <span className="text-3xl font-bold">Kepler</span>
            </div>

            <h1 className="text-4xl font-black leading-tight mt-4">
              SAVE BIG ON YOUR NEXT RENOVATION <br /> WITHOUT SACRIFICING QUALITY
            </h1>

            <p className="opacity-90 leading-relaxed text-sm mt-2">
              Unlock contractor-level pricing, premium materials, and
              personalized renovation planning—all from one powerful app.
            </p>

            {/* =============================== */}
            {/* ✨ FUTURISTIC RENOVATION AI BUTTON */}
            {/* =============================== */}

            <div className="relative group w-fit mt-5">
              <button
                onClick={() => router.push("/cmd")}
                className="
                  backdrop-blur-xl bg-white/10 
                  border border-white/20 
                  shadow-[0_0_25px_rgba(255,150,80,0.4)]
                  hover:shadow-[0_0_45px_rgba(255,150,80,0.7)]
                  rounded-2xl p-2
                  text-white
                  flex items-center justify-center gap-2
                  transition-all duration-500
                  hover:scale-110 hover:-rotate-2
                  animate-float
                  cursor-pointer
                "
              >
                {/* <Sparkles className="w-6 h-6 text-orange-300 drop-shadow-[0_0_10px_rgba(255,165,100,0.7)] transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" /> */}
                <Image
                  src="/images/robot.png"
                  width={50}
                  height={50}
                  alt="Kepler Logo"
                />
                <span className="font-semibold">Renovation AI</span>
              </button>

              {/* Tooltip */}
              <span
                className="
                  absolute left-full ml-4 top-1/2 -translate-y-1/2
                  opacity-0 group-hover:opacity-100
                  translate-x-4 group-hover:translate-x-0
                  bg-white/10 backdrop-blur-xl
                  border border-white/20
                  text-white text-sm px-4 py-2 rounded-xl
                  shadow-lg whitespace-nowrap
                  transition-all duration-500
                "
              >
                Open AI Renovation Assistant →
              </span>

              {/* Neon Glow */}
              <div
                className="
                  absolute inset-0 rounded-2xl -z-10
                  bg-gradient-to-br from-orange-500/50 to-yellow-400/40
                  opacity-0 group-hover:opacity-60 blur-xl
                  transition-all duration-500
                "
              ></div>
            </div>

            {/* FLOAT ANIMATION KEYFRAMES */}
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

          {/* ====================================================== */}
          {/* RIGHT – IMAGE CAROUSEL */}
          {/* ====================================================== */}
          <div className="relative w-1/2 h-[450px] rounded-r-2xl overflow-hidden">

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
                      className="object-cover rounded-r-2xl"
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
      <div className="flex-1 rounded-2xl overflow-hidden relative">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Holiday Decor"
          fill
          className="object-cover"
        />

        <div className="absolute top-10 left-10 text-white drop-shadow-xl max-w-[220px]">
          <h2 className="text-3xl font-black leading-tight">
            START DECKING<br />THE HALLS
          </h2>

          <p className="mt-3 text-sm opacity-90">
            Holiday Decor for<br />Inside & Out
          </p>

          <button className="mt-4 border-b border-white text-sm hover:opacity-80">
            Shop Now
          </button>
        </div>

        {/* Play button */}
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur p-3 rounded-full shadow text-black">
          ▶
        </button>
      </div>
    </div>
  );
}
