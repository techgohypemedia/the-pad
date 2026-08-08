import { motion, useScroll, useTransform } from "motion/react";

import { useState, useEffect } from "react";

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
      {/* Background Layer: Single Video (Plays immediately) */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          src="/Website Horizontal_SlowMo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale brightness-75 scale-105"
        />

        {/* Deep bottom gradient to blend into next section */}
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black via-black/20 to-transparent z-30" />
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-40 text-center px-6 mt-24 md:mt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-reserve-accent text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4 font-bold"
        >
          India's premier Padel and Pickleball Destination
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="text-7xl md:text-9xl lg:text-[14rem] font-black leading-[0.8] tracking-tighter mb-16 uppercase italic"
          style={{
            color: '#f0ece2',
            textShadow: '0 20px 40px rgba(0,0,0,0.5)',
            letterSpacing: '-0.04em',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          The Pad
        </motion.h1>

        {/* The Pill-Shaped Button Group */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-flex flex-col md:flex-row items-center border border-white/20 rounded-[50px] p-1.5 backdrop-blur-md bg-white/5"
        >
          <button
            onClick={() => window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank")}
            className="px-12 py-3.5 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-reserve-accent transition-all rounded-[40px] duration-500 whitespace-nowrap"
          >
            Book a Court
          </button>

          {/* Dividers: Vertical for Desktop, Horizontal for Mobile */}
          <div className="w-px h-5 bg-white/20 hidden md:block mx-1" />
          <div className="w-full h-px bg-white/20 md:hidden my-1" />

          <div className="relative inline-block">
            <span className="absolute -top-2.5 -right-1 bg-[#FF6A00] text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider transform rotate-3 shadow-md z-20">
              Coming Soon
            </span>
            <button
              className="px-12 py-3.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white hover:bg-reserve-accent/50 transition-all rounded-[40px] duration-500 whitespace-nowrap cursor-default"
              onClick={(e) => e.preventDefault()}
            >
              Become a Member
            </button>
          </div>
        </motion.div>
      </div>

      {/* Down arrow indicator scroll trigger anim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4 opacity-30 group"
      >
        <div className="w-px h-16 bg-gradient-to-b from-white to-transparent overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-white"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
