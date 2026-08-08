import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const MeetThePros = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Fade out heading slowly but don't erase it entirely so cards overlap it clearly
  const headingOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  const pros = [
    {
      name: "JUAN MARTÍN DIAZ",
      title: "CHIEF PADEL OFFICER",
      desc: "A padel legend from Argentina who dominated the sport for nearly two decades, holding the World Number 1 ranking for 13 consecutive years.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      bgColor: "#F5F5F5",
      // Each card will have custom start and end triggers for the scroll progress
      scrollRange: [0, 0.3],
    },
    {
      name: "GABI MEANA",
      title: "PADEL DIRECTOR",
      desc: "A former tennis pro from Northern Spain who moved to the US for college tennis, and now leads The Pad as a co-founder and a director.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
      bgColor: "#FFFFFF",
      scrollRange: [0.15, 0.45],
    },
    {
      name: "DIEGO RAMOS",
      title: "ELITE PRO",
      desc: "Diego Ramos, personal coach to Arturo Coello, is now based in Miami and available for private lessons. Ranked No. 1 in Uruguay, he's a former WPT top 30 player and held a No. 4 ranking in A1 Padel.",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=600&auto=format&fit=crop",
      bgColor: "#F5F5F5",
      scrollRange: [0.3, 0.6],
    }
  ];

  return (
    <section ref={sectionRef} className="relative h-[300vh]" style={{ background: '#0a0a0a' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6">

        {/* Animated Heading */}
        <motion.div
          className="absolute top-[15%] text-center flex flex-col items-center w-full z-10"
          style={{ opacity: headingOpacity }}
        >
          <p className="text-[12px] uppercase tracking-[0.35em] mb-2 font-medium text-reserve-accent">THE EXPERTS</p>
          <h2
            className="tracking-tighter font-sans font-black uppercase whitespace-normal md:whitespace-nowrap text-wrap text-center"
            style={{
              color: '#f0ece2',
              lineHeight: 0.9,
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Meet the Pros
          </h2>
        </motion.div>

        {/* Animated Cards Container */}
        <div className="absolute w-full px-6 flex justify-center z-20 h-full pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-14 max-w-[1500px] w-full pt-[20vh] pointer-events-auto">
            {pros.map((pro, index) => {
              // Create a unique Y-axis transform specifically for this card based on its scrollRange
              const cardY = useTransform(scrollYProgress, pro.scrollRange, ["120vh", "0vh"]);

              return (
                <motion.div
                  key={pro.name}
                  className="col-start-1 row-start-1 md:col-auto md:row-auto rounded-xl p-5 md:p-7 flex flex-col text-black shadow-2xl relative"
                  style={{
                    backgroundColor: pro.bgColor,
                    y: cardY,
                    height: 'max-content'
                  }}
                >
                  <h3 className="text-xl md:text-[1.3rem] font-bold tracking-tighter mb-2" style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.05em' }}>
                    {pro.name}
                  </h3>
                  <div className="relative aspect-square overflow-hidden mb-4 rounded bg-black/10 grayscale hover:grayscale-0 transition-all duration-700">
                    <img
                      src={pro.image}
                      alt={pro.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-lg md:text-[1.1rem] font-medium tracking-tight mb-2 uppercase" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {pro.title}
                  </h4>
                  <p className="text-xs md:text-[13px] leading-relaxed font-medium opacity-90" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {pro.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetThePros;
