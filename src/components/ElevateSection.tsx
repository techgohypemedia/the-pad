import { useState, useEffect, useRef } from "react";

const DiscoverPrograms = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [fontSize, setFontSize] = useState(5); // rem units
  const [activeTab, setActiveTab] = useState("DELHI");

  const tabs = ["DELHI"];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // progress: 0 when section top hits bottom of viewport, 1 when section bottom hits top
      const total = rect.height + windowH;
      const elapsed = windowH - rect.top;
      const progress = Math.min(Math.max(elapsed / total, 0), 1);

      // Font grows from 2rem to ~3.5rem as requested
      const peak = 0.5;
      const p = progress <= peak ? progress / peak : 1 - (progress - peak) / (1 - peak);
      const min = 2, max = 3.5;
      setFontSize(min + (max - min) * Math.pow(p, 0.6));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const programsData: Record<string, { title: string; desc: string; price: string; }[]> = {
    "DELHI": [
      { title: "PADEL CLINICS", desc: "Professional grade courts designed for competitive and casual players. Perfect for newcomers and those looking to refine their foundational skills.", price: "INQUIRY REQUIRED" },
      { title: "PICKLEBALL SOCIALS", desc: "Fast, social and addictive — pickleball courts built for everyone. Join our vibrant community for weekly social matches.", price: "INQUIRY REQUIRED" },
      { title: "MIXED INTERMEDIATE", desc: "Experience match play with coach guidance to apply your skills in real-game scenarios. Learn to make strategic decisions and enhance your overall court presence.", price: "INQUIRY REQUIRED" },
      { title: "LEAGUES & TOURNAMENTS", desc: "Join leagues, tournaments and social matches hosted weekly at Gulmohar Park. The Pad is more than a court — it’s a community.", price: "INQUIRY REQUIRED" }
    ]
  };

  return (
    <section
      ref={sectionRef}
      className="pb-32 px-6 pt-0 mt-[-6vh] relative z-20"
      style={{ background: '#0a0a0a' }}
    >
      <div className="w-[94%] max-w-[1400px] mx-auto">

        {/* ── ANIMATED HEADING ── */}
        <div className="text-center mb-6" style={{ overflow: 'hidden' }}>
          <h2
            className="font-heading font-black uppercase leading-none transition-none select-none text-wrap md:whitespace-nowrap"
            style={{
              fontSize: `clamp(1.5rem, ${fontSize}vw, 3.5rem)`,
              color: '#f0ece2',
              letterSpacing: '-0.05em', // Tighter spacing to match screenshot
              lineHeight: 1,
              willChange: 'font-size',
            }}
          >
            DISCOVER OUR PROGRAMS
          </h2>
        </div>

        {/* ── DESCRIPTION ── */}
        <p
          className="text-center mx-auto mb-14 leading-relaxed"
          style={{
            color: 'rgba(240,236,226,0.65)',
            fontSize: '1rem',
            maxWidth: '640px',
            lineHeight: 1.75,
          }}
        >
          At The Pad, we offer a variety of dynamic and engaging padel clinics tailored to suit
          players of all levels. Our programs are designed to enhance your padel skills, whether
          you're a beginner or a seasoned player.
        </p>

        {/* ── LOCATION TABS ── */}
        <div className="flex justify-center gap-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative pb-3 transition-all duration-300"
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                fontWeight: 700,
                color: activeTab === tab ? '#f0ece2' : 'rgba(240,236,226,0.35)',
                textTransform: 'uppercase',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tab}
              {/* underline indicator */}
              <span
                className="absolute bottom-0 left-0 right-0 transition-all duration-300"
                style={{
                  height: '1px',
                  background: activeTab === tab ? '#f0ece2' : 'transparent',
                }}
              />
            </button>
          ))}
        </div>

        {/* ── PROGRAM LIST ── */}
        <div className="mt-14">
          {activeTab === "HUDSON YARDS" ? (
            <div className="text-center py-20">
              <h3 className="text-4xl md:text-5xl tracking-wide text-[#f0ece2]" style={{ fontFamily: 'sans-serif', fontWeight: 300 }}>
                MEMBERS-ONLY
              </h3>
            </div>
          ) : (
            <div className="flex flex-col">
              {programsData[activeTab]?.map((prog, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-8 justify-between py-12"
                  style={{ borderBottom: i !== programsData[activeTab].length - 1 ? '1px solid rgba(240,236,226,0.1)' : 'none' }}
                >
                  {/* Left: Title & Desc */}
                  <div className="flex-1 md:max-w-[70%] pr-8">
                    <h4 className="text-2xl md:text-[1.75rem] tracking-tight font-medium mb-3" style={{ color: '#f0ece2' }}>
                      {prog.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,236,226,0.65)' }}>
                      {prog.desc}
                    </p>
                  </div>

                  {/* Right: Price & Button */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:w-[35%]">
                    <div className="text-[12px] tracking-widest font-semibold text-[#f0ece2]">
                      {prog.price}
                    </div>
                    <button
                      className="px-8 py-2.5 rounded-full text-[11px] tracking-wide transition-all text-[#f0ece2] border border-[rgba(240,236,226,0.25)] hover:bg-[#f0ece2] hover:text-black"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

const ElevateSection = () => <DiscoverPrograms />;

export default ElevateSection;
