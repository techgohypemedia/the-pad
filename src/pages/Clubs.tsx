import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { useRef } from "react";

/* Animated L-shaped line.
   - align="left":  └────── (vertical grows down, then horizontal grows right)
   - align="right": ──────┐ (horizontal grows left, then vertical grows down) */
const ScrollLine = ({ align = 'left' }: { align?: 'left' | 'right' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.3"]
  });

  // Vertical stub grows first (0→30%), then horizontal bar (30→100%)
  const verticalHeight = useTransform(scrollYProgress, [0, 0.3], [0, 24]);
  const horizontalWidth = useTransform(scrollYProgress, [0.3, 1], [0, 160]);

  return (
    <div
      ref={ref}
      className={`w-full flex ${align === 'right' ? 'justify-end' : 'justify-start'} px-8 md:px-16 lg:px-24`}
      style={{ height: '120px', alignItems: 'flex-end', paddingBottom: '20px' }}
    >
      {align === 'left' ? (
        /* └────── shape */
        <div className="flex items-end">
          <motion.div
            style={{ height: verticalHeight }}
            className="w-[2px] bg-black"
          />
          <motion.div
            style={{ width: horizontalWidth }}
            className="h-[2px] bg-black"
          />
        </div>
      ) : (
        /* ──────┐ shape */
        <div className="flex items-end">
          <motion.div
            style={{ width: horizontalWidth }}
            className="h-[2px] bg-black"
          />
          <motion.div
            style={{ height: verticalHeight }}
            className="w-[2px] bg-black"
          />
        </div>
      )}
    </div>
  );
};

/* Green CTA section with scroll-animated diagonal lines */
const GreenCTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.2"]
  });

  const horizontalReveal = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: {
      clipPath: "inset(0 0 0 0)",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Each line grows at a staggered pace
  const line1H = useTransform(scrollYProgress, [0, 0.5], [0, 800]);
  const line2H = useTransform(scrollYProgress, [0.05, 0.55], [0, 900]);
  const line3H = useTransform(scrollYProgress, [0.1, 0.6], [0, 800]);
  const line4H = useTransform(scrollYProgress, [0.15, 0.65], [0, 900]);

  return (
    <section ref={sectionRef} className="bg-[#1a4d2e] text-white py-28 md:py-36 px-6 relative overflow-hidden">
      {/* Staggered diagonal lines */}
      <motion.div
        className="absolute bg-white/80"
        style={{
          width: '4px',
          height: line1H,
          top: '-200px',
          right: '18%',
          transform: 'rotate(-30deg)',
          transformOrigin: 'top center'
        }}
      />
      <motion.div
        className="absolute bg-black/35"
        style={{
          width: '5px',
          height: line2H,
          top: '-100px',
          left: '-5%',
          transform: 'rotate(25deg)',
          transformOrigin: 'top center'
        }}
      />
      <motion.div
        className="absolute bg-black/35"
        style={{
          width: '5px',
          height: line3H,
          bottom: '-200px',
          right: '2%',
          transform: 'rotate(-50deg)',
          transformOrigin: 'bottom center'
        }}
      />
      <motion.div
        className="absolute bg-black/25"
        style={{
          width: '4px',
          height: line4H,
          bottom: '-250px',
          left: '6%',
          transform: 'rotate(35deg)',
          transformOrigin: 'bottom center'
        }}
      />

      <motion.div
        variants={horizontalReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center relative z-10"
      >
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter uppercase italic"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          The Original Social Net-Work
        </h2>
        <p className="text-xs md:text-sm text-white/70 mb-10 max-w-lg mx-auto leading-relaxed">
          Our love for padel and the people who play it runs deep. This isn't just ordinary membership, it's an invitation to become part of the very fabric of the club.
        </p>
        <div className="relative inline-block">
          <span className="absolute -top-3 -left-3 bg-[#FF6A00] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider transform -rotate-3 shadow-md z-20">
            Coming Soon
          </span>
          <button
            className="inline-block px-10 py-4 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.25em] transition-colors cursor-default"
            onClick={(e) => e.preventDefault()}
          >
            Become A Member
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const Services = () => {
  const horizontalReveal = {
    hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    visible: {
      clipPath: "inset(0 0 0 0)",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-black font-sans bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative w-full min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 md:pt-36 pb-12">
        <img
          src="https://images.unsplash.com/photo-1646649853517-e2f75cde1908?q=80&w=2070&auto=format&fit=crop"
          alt="Padel Club"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          variants={horizontalReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 text-center text-white px-6 mt-16 md:mt-24"
        >
          <h1
            className="text-7xl md:text-9xl lg:text-[14rem] font-black leading-[0.8] tracking-tighter uppercase italic"
            style={{
              color: '#f0ece2',
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.04em'
            }}
          >
            Our<br />Clubs
          </h1>
        </motion.div>
      </section>

      {/* Intro Text */}
      <section className="bg-white px-6 py-16 md:py-20 text-center">
        <motion.p
          variants={horizontalReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-base md:text-lg text-black/80 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Each of our venues are built around a sense of community.
          Where everyone from die-hard players to first timers are
          welcome to experience our premier club services.
        </motion.p>
      </section>

      {/* Club Sections */}
      <section className="bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
          <motion.div
            variants={horizontalReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex items-center justify-center p-6 h-[380px] md:h-auto order-2 md:order-1"
          >
            <img
              src="https://i.postimg.cc/CLRzJvdN/cr4.jpg"
              alt="Mondo Turf At The Pad"
              className="w-[85%] h-[85%] md:w-[80%] md:h-[80%] object-cover rounded-xl shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="flex items-center px-8 py-12 md:px-16 lg:px-24 order-1 md:order-2">
            <motion.div
              variants={horizontalReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-md"
            >
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tighter uppercase italic" style={{ fontFamily: "'Inter', sans-serif" }}>Mondo Turf At The Pad</h2>
              <h3 className="text-reserve-accent text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 font-black">Professional Grade Turf.</h3>
              <p className="text-sm text-black/60 mb-8 leading-relaxed">
                Professional grade Mondo turf designed for both competitive and casual players, providing perfect grip, shock absorption and ball bounce consistency.
              </p>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => window.open("https://www.instagram.com/thepad.in?igsh=MTZhNGlmMG5uMWRxbA%3D%3D&utm_source=qr", "_blank")}
                  className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-reserve-accent transition-colors"
                >
                  View Club
                </button>
                <button 
                  onClick={() => window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank")}
                  className="px-8 py-3 bg-transparent border border-black/20 text-black rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:border-black transition-colors"
                >
                  Book Court
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        <ScrollLine align="right" />
      </section>

      <section className="bg-white">
        <ScrollLine align="left" />
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
          <div className="flex items-center px-8 py-12 md:px-16 lg:px-24">
            <motion.div
              variants={horizontalReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-md"
            >
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tighter uppercase italic" style={{ fontFamily: "'Inter', sans-serif" }}>Pickle At The Pad</h2>
              <h3 className="text-reserve-accent text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 font-black">Fast, Social & Addictive.</h3>
              <p className="text-sm text-black/60 mb-8 leading-relaxed">
                Fast, social and addictive — pickleball courts built for everyone. Join our vibrant community for weekly social matches.
              </p>
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => window.open("https://www.instagram.com/thepad.in?igsh=MTZhNGlmMG5uMWRxbA%3D%3D&utm_source=qr", "_blank")}
                  className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-reserve-accent transition-colors"
                >
                  View Club
                </button>
                <button 
                  onClick={() => window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank")}
                  className="px-8 py-3 bg-transparent border border-black/20 text-black rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:border-black transition-colors"
                >
                  Book Court
                </button>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={horizontalReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex items-center justify-center p-6 h-[380px] md:h-auto"
          >
            <img
              src="https://i.postimg.cc/nhKSWGPL/cr3.jpg"
              alt="Pickle At The Pad"
              className="w-[85%] h-[85%] md:w-[80%] md:h-[80%] object-cover rounded-xl shadow-2xl transition-all duration-500 hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* <GreenCTASection /> */}
    </div>
  );
};

export default Services;