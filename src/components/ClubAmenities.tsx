import { useState, useEffect, useRef } from "react";

const ClubAmenities = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [fontSize, setFontSize] = useState(3.5); // Initial rem
  const [stretch, setStretch] = useState(1);
  const [stampProgress, setStampProgress] = useState(0);

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

      // Text stretching logic
      const peak = 0.5;
      const p = progress <= peak ? progress / peak : 1 - (progress - peak) / (1 - peak);

      // Scale from 3.5rem to 6rem
      const minFont = 3.5, maxFont = 6;
      setFontSize(minFont + (maxFont - minFont) * Math.pow(p, 0.6));

      // Optional physical horizontal stretch like the screenshot
      const minStretch = 1, maxStretch = 1.25;
      setStretch(minStretch + (maxStretch - minStretch) * Math.pow(p, 0.6));

      // Horizontal line traversing logic
      // Starts traversing when entering viewport (0.15) and finishes crossing as we hit near the end (0.8)
      const lineP = Math.min(Math.max((progress - 0.15) / 0.65, 0), 1);
      setStampProgress(lineP * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const amenities = [
    { text: "Padel\nCourts" },
    { text: "Pickleball\nCourts" },
    { text: "Gulmohar Park\nSetting" },
    { text: "Professional\nCoaching" },
    { text: "Friendly\nLeagues" },
    { text: "Community\nLeagues" },
  ];

  return (
    <section ref={sectionRef} className="py-32 px-6" style={{ background: '#0a0a0a' }}>
      <div className="max-w-[1400px] w-[94%] mx-auto">
        <div className="text-center mb-16 md:mb-32 flex flex-col items-center" style={{ overflow: 'hidden' }}>
          <h2
            className="font-black uppercase transition-none select-none text-wrap md:whitespace-nowrap"
            style={{
              color: '#f0ece2',
              lineHeight: 1,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: '-0.05em',
              fontSize: `clamp(2rem, ${fontSize}vw, 6rem)`,
              willChange: 'font-size, transform',
              transform: `scaleX(${stretch})`,
              marginBottom: '1.5rem'
            }}
          >
            OUR CLUB
          </h2>
          <p className="max-w-4xl text-center leading-relaxed font-medium" style={{ color: 'rgba(240,236,226,0.65)', fontSize: '1.05rem', fontFamily: 'sans-serif' }}>
            The Pad is a place to play, move and belong. Bringing together pickleball and padel in a premium, covered setting, it combines world-class court infrastructure, on-court support and a relaxed café and lounge. Whether you’re here to compete, play your first game or unwind with friends, The Pad makes every visit feel effortless.
          </p>
        </div>

        {/* Icons and Horizontal Line Container */}
        <div className="relative w-full">
          {/* Horizontal line placed at the top with scroll tracking progress */}
          <div className="absolute top-0 left-0 w-full z-10 pointer-events-none hidden md:block" style={{ height: '1px', backgroundColor: 'rgba(240,236,226,0.1)' }}>
            {/* The active progress line */}
            <div className="absolute top-0 left-0 h-full bg-[#f0ece2] opacity-60" style={{ width: `${stampProgress}%` }} />
            {/* The vertical tracking tick mark */}
            <div className="absolute top-[-5px] w-[1px] h-[11px] bg-[#f0ece2]" style={{ left: `${stampProgress}%`, transform: 'translateX(-50%)' }} />
          </div>

          <div className="relative z-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 justify-items-center w-full pt-8 md:pt-16">
            {amenities.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-32">
                <div
                  className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] mb-4 md:mb-8 text-[#f0ece2] flex items-center justify-center rounded-full bg-transparent opacity-90"
                >
                  <svg
                    width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="0.75"
                    className="animate-[spin_20s_linear_infinite]"
                  >
                    {/* Outer Circle (common to all) */}
                    <circle cx="32" cy="32" r="31" />

                    {/* Unique Inner Patterns based on index */}
                    {index === 0 && ( // New Equipment
                      <>
                        <circle cx="32" cy="32" r="10" />
                        <line x1="32" y1="1" x2="32" y2="63" />
                        <line x1="1" y1="32" x2="32" y2="32" />
                        <path d="M32 32 A 31 31 0 0 1 63 32" stroke="currentColor" />
                      </>
                    )}
                    {index === 1 && ( // Showers
                      <>
                        <circle cx="32" cy="32" r="22" />
                        <circle cx="32" cy="32" r="10" />
                        <line x1="1" y1="32" x2="63" y2="32" />
                      </>
                    )}
                    {index === 2 && ( // Coffee
                      <>
                        <circle cx="32" cy="32" r="14" />
                        <line x1="1" y1="22" x2="63" y2="22" />
                        <line x1="1" y1="42" x2="63" y2="42" />
                      </>
                    )}
                    {index === 3 && ( // Juice Bar
                      <>
                        <circle cx="32" cy="32" r="12" />
                        <line x1="32" y1="1" x2="32" y2="63" />
                        <line x1="1" y1="32" x2="63" y2="32" />
                        <path d="M32 1 A 31 31 0 0 1 63 32" />
                      </>
                    )}
                    {index === 4 && ( // Cold Plunge
                      <>
                        <circle cx="32" cy="32" r="18" />
                        <circle cx="32" cy="32" r="8" />
                        <line x1="32" y1="1" x2="32" y2="63" />
                        <line x1="1" y1="32" x2="63" y2="32" />
                      </>
                    )}
                    {index === 5 && ( // Sauna
                      <>
                        <circle cx="32" cy="32" r="12" />
                        <line x1="20" y1="5" x2="20" y2="59" />
                        <line x1="44" y1="5" x2="44" y2="59" />
                        <line x1="5" y1="20" x2="59" y2="20" />
                        <line x1="5" y1="44" x2="59" y2="44" />
                      </>
                    )}
                  </svg>
                </div>
                <div className="text-center whitespace-pre-line text-[11px] md:text-[12px] font-bold tracking-wide uppercase" style={{ color: '#FF6A00', lineHeight: 1.4, fontFamily: 'sans-serif' }}>
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubAmenities;
