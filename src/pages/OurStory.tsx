import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

const OurStory = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="px-6 pt-28 sm:pt-32 md:pt-40 pb-32 md:pb-60 text-center max-w-[1400px] mx-auto transition-all">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-bold uppercase tracking-[-0.04em] leading-[1.0] md:leading-[0.9] mb-4 md:mb-6 flex flex-col items-center text-center">
            <span>India's Premier Padel & Pickleball Destination</span>
          </h1>

          <h3 className="text-lg sm:text-2xl md:text-3xl font-medium tracking-wide text-reserve-accent mb-6 md:mb-8 uppercase">
            More than a court. A new sports culture.
          </h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-4xl mx-auto space-y-4 md:space-y-6"
          >
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-medium">
              The Pad is building India’s next generation of racquet-sport communities, bringing together world-class padel and pickleball courts, players, tournaments, and experiences.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-medium">
              From Delhi and Goa to Indore and the destinations ahead, The Pad is creating spaces where people come to play, compete, connect, and belong.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Scroll-Animated Line Section */}
      <ScrollStatementSection />

      {/* Founder Section */}
      <section className="bg-white text-reserve-black py-12 sm:py-16 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              <div className="space-y-3 md:space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group bg-gray-100">
                  <video
                    src="/assets/Jai Suneja.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-black text-[12px] font-bold uppercase tracking-[0.3em]">Jai Suneja</p>
                  <p className="text-black/40 text-[10px] uppercase tracking-[0.2em] mt-1">Founder</p>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group bg-gray-100">
                  <video
                    src="/assets/Shivam Bajaj.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex flex-col">
                  <p className="text-black text-[12px] font-bold uppercase tracking-[0.3em]">Shivam Bajaj</p>
                  <p className="text-black/40 text-[10px] uppercase tracking-[0.2em] mt-1">Founder</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-black/40 mb-2 md:mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Leadership</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase mb-6 md:mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>About Our Founders</h2>
            <div className="text-base md:text-lg text-black/70 space-y-4 md:space-y-6 leading-relaxed">
              <p>
                Jai Suneja and Shivam Bajaj, visionary athletes and entrepreneurs, have been the driving force
                behind the padel revolution. Their journey began with a shared passion for the sport,
                witnessing first-hand how it unites communities and fosters a unique spirit of competition.
              </p>
              <p>
                Inspired by this vision, they are expanding the world of padel across India,
                sharing this fast-paced, thrilling sport through world-class infrastructure
                and a community-first approach.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 sm:py-16 md:py-32 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase mb-6 md:mb-12" style={{ fontFamily: "'Poppins', sans-serif" }}>"Padel is more than a game; it's a community built on the spirit of competition and the pleasure of style."</h2>
          <div className="w-24 h-px bg-reserve-accent mx-auto" />
        </motion.div>
      </section>
    </div>
  );
};

const ScrollStatementSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 60%"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [15, 0]);

  const opacity2 = useTransform(scrollYProgress, [0.1, 0.45], [0.2, 1]);
  const y2 = useTransform(scrollYProgress, [0.1, 0.45], [15, 0]);

  const opacity3 = useTransform(scrollYProgress, [0.2, 0.6], [0.2, 1]);
  const y3 = useTransform(scrollYProgress, [0.2, 0.6], [15, 0]);

  return (
    <section ref={containerRef} className="relative pt-12 md:pt-24 pb-24 md:pb-44 bg-black">
      <div className="w-full px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto w-full relative pt-6">
          {/* The Growing Line */}
          <motion.div
            className="absolute top-0 left-0 h-[1.5px] bg-white w-full origin-left"
            style={{ scaleX }}
          />

          {/* Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-8">
            <motion.div style={{ opacity: opacity1, y: y1 }} className="flex flex-col">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[-0.04em] leading-[1.0] md:leading-[0.9] text-white">
                THE PAD IS <br className="hidden sm:block" /> THE FUTURE OF PADEL
              </h3>
            </motion.div>

            <motion.div style={{ opacity: opacity2, y: y2 }} className="flex flex-col">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[-0.04em] leading-[1.0] md:leading-[0.9] text-white">
                THE PAD IS <br className="hidden sm:block" /> WHERE PLAYERS BELONG
              </h3>
            </motion.div>

            <motion.div style={{ opacity: opacity3, y: y3 }} className="flex flex-col">
              <Link to="/services" className="group cursor-pointer block">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[-0.04em] leading-[0.9] text-reserve-accent">
                  THE PAD IS <br className="hidden sm:block" />
                  WHERE INDIA PLAYS NEXT
                </h3>
                <div className="mt-1 relative w-20 h-4">
                  <div className="absolute top-1/2 left-0 h-[1.5px] w-full bg-reserve-accent" />
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-reserve-accent" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

