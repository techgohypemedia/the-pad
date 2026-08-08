import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ParallaxImageSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scale: subtle zoom-out effect
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  // Overlay & Blur: Finish much earlier to bridge the gap with the next section
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.3, 0.3, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.7], ["blur(0px)", "blur(0px)", "blur(12px)"]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, filter: blur }}
          className="absolute inset-0 z-0 h-full w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1646649853517-e2f75cde1908?q=80&w=2070&auto=format&fit=crop"
            alt="The Pad Community"
            className="w-full h-full object-cover opacity-70"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* The Black Blurryness Transition */}
        <motion.div
          className="absolute inset-0 z-10 bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />

        <div className="absolute inset-0 z-30 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-7xl font-heading font-black uppercase text-white tracking-tighter mb-4">
              MORE THAN A COURT.
            </h2>
            <p className="text-lg md:text-2xl font-body font-medium text-reserve-accent uppercase tracking-[0.4em]">
              IT'S A COMMUNITY.
            </p>
          </motion.div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black to-transparent z-20" />
      </div>
    </section>
  );
};

export default ParallaxImageSection;

