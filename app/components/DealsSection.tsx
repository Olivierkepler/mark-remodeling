"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/pagination";

export default function RenovationShowcase() {
  const router = useRouter();

  const slides = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  ];

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10 flex flex-col gap-12 ">

      {/* ======================================================== */}
      {/* LEFT SECTION – AI PROMO (FULLY RESPONSIVE LAYOUT)       */}
      {/* ======================================================== */}
      <section className="w-full bg-gradient-to-r from-black to-black/80 rounded-3xl text-white overflow-hidden">

        <div className="flex flex-col gap-10 p-6 md:p-10 lg:flex-row lg:gap-14 lg:items-center lg:justify-between">

          {/* TEXT CONTENT */}
          <div className="flex-1 flex flex-col gap-5">

            <p className="text-xs opacity-70 tracking-wide uppercase">Sponsored</p>

            <div className="flex items-center gap-3">
              <Image src="/images/robot.png" width={42} height={42} alt="Kepler Logo" />
              <span className="text-3xl md:text-4xl font-bold">Kepler</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              SAVE BIG ON YOUR NEXT RENOVATION
              <br className="hidden sm:block" /> WITHOUT COMPROMISING QUALITY
            </h1>

            <p className="text-sm md:text-lg opacity-90 leading-relaxed">
              Unlock contractor-level pricing, premium materials, and intelligent
              renovation planning—powered by next-generation AI technology.
            </p>

            {/* CTA BUTTON */}
            <div className="relative w-fit mt-2 group">
              <button
                onClick={() => router.push("/cmd")}
                className="
                  flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer
                  text-white font-semibold text-sm md:text-base
                  backdrop-blur-xl bg-white/10 border border-white/20
                  transition-all duration-300 transform
                  shadow-[0_0_20px_rgba(255,150,80,0.5)]
                  hover:shadow-[0_0_35px_rgba(255,150,80,0.8)]
                  hover:scale-105 animate-float
                "
              >
                <Image src="/images/robot.png" width={46} height={46} alt="AI Logo" />
                Renovation AI
              </button>

              {/* Tooltip */}
              <span
                className="
                  absolute left-full ml-4 top-1/2 -translate-y-1/2
                  opacity-0 group-hover:opacity-100
                  translate-x-4 group-hover:translate-x-0
                  bg-white/10 backdrop-blur-xl border border-white/20
                  text-white text-xs md:text-sm px-3 py-2 rounded-xl shadow-lg
                  transition-all duration-300 whitespace-nowrap
                "
              >
                Try the AI Assistant →
              </span>
            </div>

            {/* Floating Animation */}
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              .animate-float {
                animation: float 4s ease-in-out infinite;
              }
            `}</style>

          </div>

          {/* CAROUSEL – Fully Responsive Heights */}
          <div
            className="
              w-full flex-1 rounded-xl overflow-hidden
              h-[240px] sm:h-[280px] md:h-[340px] lg:h-[420px] xl:h-[480px]
            "
          >
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              loop
              className="w-full h-full"
            >
              {slides.map((url, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-full">
                    <Image
                      src={url}
                      alt={`Slide ${i}`}
                      fill
                      priority={i === 0}
                      className="object-cover rounded-xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* RIGHT SECTION – HOLIDAY BANNER (IMPROVED RESPONSIVENESS) */}
      {/* ======================================================== */}
      <section
        className="
          w-full rounded-3xl overflow-hidden relative
          h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[550px]
        "
      >
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
          alt="Holiday Decor"
          fill
          className="object-cover"
        />

        <div className="absolute top-8 left-8 md:top-10 md:left-10 text-white drop-shadow-xl max-w-[260px]">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
            START DECKING<br />THE HALLS
          </h2>

          <p className="mt-3 text-sm md:text-lg opacity-90">
            Holiday decor for<br />inside & out
          </p>

          <button className="mt-5 border-b border-white text-sm md:text-base hover:opacity-80">
            Shop Now
          </button>
        </div>

        <button
          className="
            absolute top-5 right-5 md:top-6 md:right-6
            bg-white/80 backdrop-blur-md p-3 rounded-full shadow
            text-black text-xl md:text-2xl
            hover:scale-105 transition-transform
          "
        >
          ▶
        </button>
      </section>
    </div>
  );
}
