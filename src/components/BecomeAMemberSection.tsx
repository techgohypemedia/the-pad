import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const BecomeAMemberSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background text: Initially sharp, fades slightly as card approaches
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15]);

  // The Card slides UP from the bottom to overlap the background text
  const cardY = useTransform(scrollYProgress, [0.1, 1], ["100vh", "0vh"]);
  const cardScale = useTransform(scrollYProgress, [0.1, 1], [0.85, 1]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Sticky Content - Handles the text and the card overlap */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Background "Become a Member" Text layer */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="text-center w-full select-none pointer-events-none mb-20"
        >
          <h2
            className="font-serif leading-[0.85] tracking-tighter"
            style={{
              color: '#f0ece2',
              fontSize: 'clamp(3.5rem, 18vw, 25rem)',
              textRendering: 'optimizeLegibility'
            }}
          >
            JOIN <br /> THE CLUB
          </h2>
        </motion.div>

        {/* The Overlapping Footer Card (COME PLAY!) */}
        <motion.div
          className="absolute w-[90%] max-w-[520px] aspect-square rounded-[40px] p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-[0_40px_80px_rgba(0,0,0,0.3)] overflow-hidden"
          style={{
            y: cardY,
            scale: cardScale,
            zIndex: 30,
            backgroundColor: '#2D6A3E',
          }}
        >
          <h2 className="relative z-10 text-4xl md:text-5xl font-heading font-black uppercase mb-6 text-black tracking-tighter leading-none">
            COMING SOON
          </h2>
          <p className="relative z-10 text-base md:text-xl text-black font-body font-medium leading-tight mb-10 max-w-[380px]">
            Built for a community of people that embrace a life of athletic elegance; the spirit of competition and the pleasure of style.
          </p>

          <button
            onClick={() => navigate("/services")}
            className="group relative flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Outer "Pill" Border */}
            <div className="absolute inset-[-10px] border border-black/20 rounded-full" />
            
            {/* Inner "Pill" Button */}
            <div className="relative z-10 px-10 py-4 bg-black rounded-full text-white uppercase tracking-[0.15em] text-[10px] font-bold shadow-xl">
              COMING SOON
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BecomeAMemberSection;
