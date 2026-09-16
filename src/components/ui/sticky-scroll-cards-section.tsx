import React, { useState, useEffect, useRef } from 'react';

export interface CardData {
  subtitle: string;
  title: string;
  description: string;
  detail?: string;
  tagline?: string;
  buttonLabel: string;
  images: string[];
  thumbImage?: string;
}

interface StickyLatestSectionProps {
  creamCard?: CardData;
  darkCard?: CardData;
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

const creamCard = {
  subtitle: "DELHI'S PREMIER PADEL DESTINATION",
  title: "PADEL COURTS EXHIBITION",
  description:
    "The Pad delivers professional-grade padel courts in Gulmohar Park, designed for both competitive edge and casual style.",
  detail:
    "With a focus on urban energy and craftsmanship, each court is built to uphold the highest standards of international play while fostering a vibrant community.",
  tagline: "Delhi's Home for Padel.",
  buttonLabel: "Book Your Court",
  images: [
    "https://images.unsplash.com/photo-1646649851780-d9701b7c3c04?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1646649851800-48dba35edc76?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1646651105426-e8c8ee9badde?q=80&w=2000&auto=format&fit=crop",
  ],
};

const darkCard = {
  subtitle: "SOCIAL & ADDICTIVE",
  title: "PICKLEBALL SOCIALS",
  description:
    "Experience the fastest growing sport in a social environment. Our pickleball sessions are perfect for meeting new people and staying active in the heart of Delhi.",
  buttonLabel: "Join Our Community",
  images: [
    // "https://i.postimg.cc/HW9hBgVC/cr1.jpg",
    "https://i.postimg.cc/wv5b5bCt/Bottom-Banner-Horizontal.jpg",
    // "https://i.postimg.cc/CLRzJvdN/cr4.jpg",
    "https://i.postimg.cc/sxv7fM9k/Bottom-Banner-Horizontal-2.jpg",
    "/assets/cr5.jpeg",
  ],
  thumbImage:
    "https://i.postimg.cc/nhKSWGPL/cr3.jpg",
};

/* ─────────────────────────────────────────────────────────────
   SCROLL-IN HOOK
───────────────────────────────────────────────────────────── */
const useInView = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView] as const;
};

/* ─────────────────────────────────────────────────────────────
   CAROUSEL HOOK
───────────────────────────────────────────────────────────── */
function useCarousel(total: number) {
  const [imgIndex, setImgIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const change = (dir: 1 | -1) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setImgIndex((p) => (p + dir + total) % total);
      setFading(false);
    }, 280);
  };
  return { imgIndex, setImgIndex, fading, change };
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export function StickyLatestSection({
  creamCard: customCream,
  darkCard: customDark
}: StickyLatestSectionProps) {
  const activeCream = customCream || creamCard;
  const activeDark = customDark || darkCard;

  return (
    <section className="py-16 w-full" style={{ background: '#0a0a0a' }}>

      {/* ── BIG "THE LATEST" HEADER ── */}
      <div className="px-6 md:px-12 mb-16">
        <h2
          className="font-heading font-black uppercase leading-none select-none"
          style={{
            fontSize: 'clamp(4rem, 14vw, 13rem)',
            letterSpacing: '-0.02em',
            color: '#f0ece2',
          }}
        >
          LIFE AT <br /> THE PAD
        </h2>
      </div>

      {/* ── STACKING CARDS ── */}
      <div className="relative px-4 md:px-8" style={{ paddingBottom: '10vh' }}>
        {/* <CreamCard card={activeCream} /> */}
        <DarkCard card={activeDark} />
      </div>

    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 1 — CREAM  (text left · image carousel right · sticky index 0)
───────────────────────────────────────────────────────────── */
function CreamCard({ card }: { card: CardData }) {
  const [ref, inView] = useInView();
  const { imgIndex, setImgIndex, fading, change } = useCarousel(card.images.length);

  return (
    <div ref={ref} className="sticky mb-6" style={{ top: '80px' }}>
      <div
        className={`flex flex-col md:flex-row w-full overflow-hidden rounded-xl transition-all duration-700 ease-out min-h-[85vh] md:h-auto md:min-h-[580px]
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{
          boxShadow: '0 24px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* LEFT: cream text panel */}
        <div
          className="flex flex-col justify-center p-8 md:p-12 flex-shrink-0 w-full md:w-[42%] md:min-w-[320px] md:max-w-[500px]"
          style={{ background: '#f0ece2', color: '#111' }}
        >
          {/* Arrows + dots */}
          <div className="flex items-center gap-3">
            <ArrowBtn onClick={() => change(-1)} dir="left" dark />
            <ArrowBtn onClick={() => change(1)} dir="right" dark />
            <Dots total={card.images.length} active={imgIndex} onDot={setImgIndex} dark />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 flex-1 justify-center mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: '#555' }}>
              {card.subtitle}
            </p>
            <h3
              className="font-heading font-black uppercase leading-none"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
                letterSpacing: '-0.02em',
                color: '#0d0d0d',
              }}
            >
              {card.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#444', maxWidth: '340px' }}>
              {card.description}
            </p>
            {card.detail && (
              <p className="text-sm leading-relaxed" style={{ color: '#444', maxWidth: '340px' }}>
                {card.detail}
              </p>
            )}
            {card.tagline && (
              <p className="text-sm italic" style={{ color: '#666' }}>{card.tagline}</p>
            )}
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              if (card.buttonLabel.toLowerCase().includes('book')) {
                window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank");
              } else if (card.buttonLabel.toLowerCase().includes('community')) {
                window.open("https://chat.whatsapp.com/E9XA6ERXJzDEDE8bL9nu6U", "_blank");
              }
            }}
            className="self-start mt-6 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{ background: '#FF6A00', color: '#fff' }}
          >
            {card.buttonLabel}
          </button>
        </div>

        {/* RIGHT: image carousel */}
        <div className="relative flex-1 overflow-hidden min-h-[40vh] md:min-h-0">
          <ImageCarousel
            images={card.images}
            activeIndex={imgIndex}
            fading={fading}
            title={card.title}
          />
          <div
            className="absolute bottom-5 right-5 text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.45)', color: '#fff', backdropFilter: 'blur(8px)' }}
          >
            {imgIndex + 1} / {card.images.length}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CARD 2 — DARK  (portrait image left · text+thumb right · sticky index 1 · 100vh)
───────────────────────────────────────────────────────────── */
function DarkCard({ card }: { card: CardData }) {
  const [ref, inView] = useInView();
  const { imgIndex, setImgIndex, fading, change } = useCarousel(card.images.length);

  return (
    <div ref={ref} className="sticky mb-6" style={{ top: '116px' }}>
      <div
        className={`flex flex-col md:flex-row w-full overflow-hidden rounded-xl transition-all duration-700 ease-out min-h-[100vh] md:h-[100vh]
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{
          boxShadow: '0 32px 100px rgba(0,0,0,0.85)',
          background: '#0b0b0b',
        }}
      >
        {/* LEFT: tall portrait image carousel (~47%) */}
        <div className="relative flex-shrink-0 overflow-hidden w-full md:w-[47%] h-[50vh] md:h-full">
          <ImageCarousel
            images={card.images}
            activeIndex={imgIndex}
            fading={fading}
            title={card.title}
          />
          {/* Arrow controls bottom-left */}
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2">
            <ArrowBtn onClick={() => change(-1)} dir="left" dark={false} />
            <ArrowBtn onClick={() => change(1)} dir="right" dark={false} />
            <Dots total={card.images.length} active={imgIndex} onDot={setImgIndex} dark={false} />
          </div>
        </div>

        {/* RIGHT: split TOP (text) + BOTTOM (thumb image) */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* TOP ~45%: text */}
          <div
            className="flex flex-col justify-center px-6 md:px-14 flex-1 md:flex-none"
            style={{ paddingTop: '2rem', paddingBottom: '1.5rem', flexBasis: '45%' }}
          >
            <h3
              className="font-heading font-black uppercase leading-tight mb-4"
              style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                color: '#f0ece2',
                letterSpacing: '-0.01em',
              }}
            >
              {card.title}
            </h3>
            <p
              className="leading-relaxed mb-6"
              style={{
                fontSize: '0.82rem',
                color: 'rgba(240,236,226,0.55)',
                maxWidth: '360px',
                lineHeight: 1.65,
              }}
            >
              {card.description}
            </p>
            {/* Ghost pill button */}
            <button
              onClick={() => {
                if (card.buttonLabel.toLowerCase().includes('book')) {
                  window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank");
                } else if (card.buttonLabel.toLowerCase().includes('community')) {
                  window.open("https://chat.whatsapp.com/E9XA6ERXJzDEDE8bL9nu6U", "_blank");
                }
              }}
              className="self-start transition-all duration-300"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                color: '#f0ece2',
                border: '1px solid rgba(240,236,226,0.4)',
                borderRadius: '999px',
                padding: '0.45rem 1.1rem',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {card.buttonLabel}
            </button>
          </div>

          {/* BOTTOM ~55%: thumbnail image */}
          <div className="flex-1 overflow-hidden relative">
            <img
              src={card.thumbImage || card.images[0]}
              alt="Court preview"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 40%' }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/900x500/1a1a1a/c8a96e?text=The Pad';
              }}
            />
            {/* fade blending with dark panel above */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{ height: '60px', background: 'linear-gradient(to bottom, #0b0b0b, transparent)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SHARED: IMAGE CAROUSEL
───────────────────────────────────────────────────────────── */
function ImageCarousel({
  images,
  activeIndex,
  fading,
  title,
}: {
  images: string[];
  activeIndex: number;
  fading: boolean;
  title: string;
}) {
  return (
    <>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${title} ${i + 1}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
          style={{
            opacity: i === activeIndex && !fading ? 1 : 0,
            transform: i === activeIndex ? 'scale(1)' : 'scale(1.04)',
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/1200x800/1a1a1a/FF6A00?text=The Pad';
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   SHARED: ARROW BUTTON
───────────────────────────────────────────────────────────── */
function ArrowBtn({
  onClick,
  dir,
  dark,
}: {
  onClick: () => void;
  dir: 'left' | 'right';
  dark: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'left' ? 'Previous image' : 'Next image'}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        border: `1px solid ${dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.35)'}`,
        color: dark ? '#111' : '#fff',
        backdropFilter: 'blur(6px)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = dark
          ? '#000'
          : 'rgba(255,255,255,0.15)';
        if (dark) (e.currentTarget as HTMLButtonElement).style.color = '#fff';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        if (dark) (e.currentTarget as HTMLButtonElement).style.color = '#111';
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {dir === 'left' ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   SHARED: DOTS
───────────────────────────────────────────────────────────── */
function Dots({
  total,
  active,
  onDot,
  dark,
}: {
  total: number;
  active: number;
  onDot: (i: number) => void;
  dark: boolean;
}) {
  return (
    <div className="flex gap-1.5 ml-1">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDot(i)}
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            background:
              i === active
                ? dark ? '#111' : '#fff'
                : dark ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)',
          }}
        />
      ))}
    </div>
  );
}
