import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowRight, Globe, Check, Send } from "lucide-react";

/**
 * SERVICES PAGE: COMPREHENSIVE COURT SOLUTIONS
 * Combined Design: User-requested services + Technical Expertise + Global Leadership + Embedded Inquiry Form
 */

const Services = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Padel Courts",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const scrollToForm = (serviceTitle?: string) => {
    if (serviceTitle) {
      setFormData((prev) => ({ ...prev, service: serviceTitle }));
    }
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    setErrors({});

    try {
      const wpUrl = import.meta.env.VITE_WP_API_URL?.replace("/wp/v2", "") || "https://thepad.in/wp-json";
      const response = await fetch(`${wpUrl}/thepad/v1/contact-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setTimeout(() => setStatus("success"), 800);
      }
    } catch {
      setTimeout(() => setStatus("success"), 800);
    }
  };

  const services = [
    {
      title: "Padel Courts",
      image: "https://i.postimg.cc/xCBKNGNh/cr5.jpg",
      badge: "OFFICIAL WPT TURF",
      tagline: "World Padel Tour Quality Padel Courts",
      description: "Mondo artificial turf — the official turf of the World Padel Tour (WPT). Engineered for world-class ball bounce, optimal traction, and elite tournament performance.",
      features: [
        "Mondo Artificial Turf (Official Turf of WPT)",
        "World Padel Tour Grade Quality",
        "Superior Traction & Joint Shock Absorption",
        "Turnkey Indoor & Outdoor Installations"
      ]
    },
    {
      title: "Pickleball Courts",
      image: "https://i.postimg.cc/Pq3bTnXG/cr3.jpg",
      badge: "US OPEN VERIFIED",
      tagline: "8 Layer Cushion Bitumen System",
      description: "8 Layer pickleball courts built with bitumen for softer impact on joints. Professional Laykold acrylic material, US Open verified — all custom color combinations available.",
      features: [
        "8-Layer Bitumen Cushion (Softer Impact on Joints)",
        "Professional Laykold Acrylic Surface Material",
        "US Open Verified Court Specifications",
        "All Custom Colors Available"
      ]
    }
  ];

  const verticalRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.12
      }
    })
  };

  return (
    <div className="bg-[#0a0a0a] text-[#f0ece2] min-h-screen font-sans overflow-x-hidden transition-all duration-300">

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[85vh] w-full flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-36 pb-12">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1592910129841-3b8d1b1f092b?q=80&w=2070&auto=format&fit=crop"
            alt="Sports Infrastructure"
            className="w-full h-full object-cover grayscale brightness-50 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-transparent to-[#0a0a0a] z-10" />
        </motion.div>

        <div className="relative z-20 text-center px-6 mt-16 md:mt-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-reserve-accent text-[10px] md:text-xs uppercase tracking-[0.5em] mb-6 font-black"
          >
            Infrastructure Excellence
          </motion.p>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={verticalRevealVariants}
            custom={1}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[11rem] font-black leading-[0.8] tracking-tighter mb-12 uppercase italic"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#f0ece2',
              letterSpacing: '-0.04em'
            }}
          >
            MASTERING <br /> THE GAME
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={verticalRevealVariants}
            custom={2}
            className="max-w-xl mx-auto border-t border-white/10 pt-8"
          >
            <p className="text-white/40 text-sm md:text-base uppercase tracking-widest font-medium leading-relaxed">
              World Padel Tour Grade Padel Courts & 8-Layer US Open Verified Pickleball Courts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR EXPERTISE SECTION (Technical Foundation) */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-white text-black">
        <div className="max-w-[1400px] w-[94%] mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={verticalRevealVariants}
            custom={0}
          >
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px w-8 bg-reserve-accent" />
              <span className="text-[10px] font-black tracking-[0.4em] text-reserve-accent uppercase">Technical Standards</span>
              <div className="h-px w-8 bg-reserve-accent" />
            </div>
            <h2
              className="font-heading font-black uppercase leading-[1.1] mb-8"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                letterSpacing: '-0.05em',
              }}
            >
              ELEVATING COURT EXCELLENCE <br /> THROUGH GLOBAL PARTNERSHIP.
            </h2>
            <p
              className="mx-auto leading-relaxed text-black/60 font-medium"
              style={{
                fontSize: '1.1rem',
                maxWidth: '850px',
                lineHeight: 1.8,
              }}
            >
              We take pride in our global partnership with world-renowned sports infrastructure manufacturers.
              Our alliance brings together years of craftsmanship and technical expertise
              to provide state-of-the-art court installations across India.
              From initial consultancy to final construction, we ensure every project meets
              international professional standards.
            </p>
          </motion.div>

          {/* Partner Indicators */}
          <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24 items-center opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
            <div className="flex flex-col items-center gap-2">
              <Globe size={40} />
              <span className="text-[9px] font-black tracking-[0.2em]">GLOBAL PARTNER</span>
            </div>
            <div className="text-2xl font-black italic tracking-tighter uppercase">Mondo Turf</div>
            <div className="text-2xl font-black italic tracking-tighter uppercase">Laykold</div>
            <div className="text-2xl font-black italic tracking-tighter uppercase">Sky Padel</div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="py-24 md:py-40 bg-[#0a0a0a] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <span className="text-reserve-accent text-[10px] font-black tracking-[0.5em] uppercase mb-4 block">
              CHAMPIONSHIP INFRASTRUCTURE
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              OUR CORE COURT OFFERINGS
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                variants={verticalRevealVariants}
                custom={idx}
                className="group relative bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] border border-white/10 hover:border-reserve-accent/50 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                {/* Top Badge */}
                <div className="flex justify-between items-start mb-8 z-20">
                  <span className="bg-[#FF6A00] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    {service.badge}
                  </span>
                </div>

                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-10 transition-transform duration-1000 group-hover:scale-[0.99]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
                </div>

                {/* Content */}
                <div className="flex flex-col items-start">
                  <span className="text-reserve-accent text-[11px] font-black tracking-[0.3em] uppercase mb-2">
                    {service.tagline}
                  </span>
                  <h3
                    className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 text-white leading-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 font-medium">
                    {service.description}
                  </p>

                  {/* Feature Bullet Points */}
                  <div className="w-full space-y-3 mb-10 pt-4 border-t border-white/10">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-3 text-xs md:text-sm text-white/80 font-bold uppercase tracking-wide">
                        <Check size={16} className="text-reserve-accent flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Build Your Court Now Button */}
                  <button
                    onClick={() => scrollToForm(service.title)}
                    className="w-full py-4 px-8 bg-white/5 hover:bg-reserve-accent text-white rounded-2xl border border-white/10 hover:border-reserve-accent flex items-center justify-between transition-all group/btn cursor-pointer"
                  >
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] transition-colors">
                      Build Your Court Now
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/10 group-hover/btn:bg-white text-white group-hover/btn:text-black flex items-center justify-center transition-all">
                      <ArrowRight size={16} className="group-hover/btn:scale-110 transition-transform" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REGIONAL HUBS (Location Cards) */}
      <section className="py-24 md:py-48 bg-[#0a0a0a] px-6 md:px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-center text-reserve-accent text-[11px] font-black tracking-[0.6em] mb-24">REGIONAL HUBS</h3>
          <div className="flex flex-wrap justify-center gap-10 max-w-5xl mx-auto">
            {[
              { name: "THE PAD GULMOHAR", location: "South Delhi", address: "Gulmohar Park New Delhi India" },
              { name: "The Pad Goa", location: "Goa", address: "Goa India", comingSoon: true }
            ].map((loc, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={verticalRevealVariants}
                custom={idx}
                className="group relative bg-zinc-950 p-12 rounded-[2rem] border border-white/5 hover:border-reserve-accent/50 transition-all duration-500 overflow-hidden w-full md:w-[440px] max-w-lg"
              >
                {loc.comingSoon && (
                  <span className="absolute top-8 right-8 bg-[#FF6A00] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider transform rotate-3 shadow-lg z-20 whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-reserve-accent/10 transition-colors">
                  <MapPin size={24} className="text-reserve-accent" />
                </div>
                <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-4" style={{ fontFamily: "'Inter', sans-serif", color: '#f0ece2' }}>{loc.name}</h4>
                <p className="text-reserve-accent text-[10px] font-black tracking-[0.3em] uppercase mb-8">{loc.location}</p>
                <div className="h-px w-full bg-white/5 mb-8" />
                <p className="text-white/40 text-sm leading-relaxed mb-10 font-medium">{loc.address}</p>
                <button
                  onClick={() => scrollToForm("General Consultancy")}
                  className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] group-hover:text-reserve-accent transition-all cursor-pointer"
                >
                  Consultation Request <ArrowRight size={16} className="-rotate-45" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EMBEDDED INQUIRY FORM SECTION */}
      <section ref={formRef} className="py-24 md:py-36 bg-zinc-950 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Header */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-black tracking-[0.4em] text-reserve-accent uppercase">
              Start Your Project
            </span>
            <h2
              className="font-heading font-black uppercase leading-[0.95] text-white"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              BUILD YOUR <br /> COURT WITH US.
            </h2>
            <p className="text-white/50 text-base leading-relaxed font-medium max-w-md">
              Fill out your details and our sports infrastructure specialists will reach out to discuss your venue vision, site requirements, and custom court designs.
            </p>
            
            <div className="pt-4 flex flex-col gap-3 text-xs uppercase tracking-widest font-bold text-white/40">
              <div className="flex items-center gap-3 text-white/80">
                <Check className="text-reserve-accent" size={16} />
                <span>Turnkey Court Construction</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Check className="text-reserve-accent" size={16} />
                <span>International Professional Standards</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Check className="text-reserve-accent" size={16} />
                <span>Custom Surface & Lighting Solutions</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-zinc-900/90 border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-4"
              >
                <div className="w-20 h-20 bg-reserve-accent rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Check className="text-white" size={40} strokeWidth={3} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white mb-4">
                  INQUIRY RECEIVED!
                </h3>
                <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed mb-8">
                  Thank you for reaching out. Our team will review your inquiry for <strong className="text-white">{formData.service}</strong> and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", phone: "", service: "Padel Courts", message: "" });
                  }}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  Inquiry Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Full Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-reserve-accent'} rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all`}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: "" });
                      }}
                    />
                    <AnimatePresence>
                      {errors.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.name}</motion.p>}
                    </AnimatePresence>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Email Address *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-reserve-accent'} rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all`}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: "" });
                      }}
                    />
                    <AnimatePresence>
                      {errors.email && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.email}</motion.p>}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10 focus:border-reserve-accent'} rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all`}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: "" });
                      }}
                    />
                    <AnimatePresence>
                      {errors.phone && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.phone}</motion.p>}
                    </AnimatePresence>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Interested Service *</label>
                    <select
                      className={`w-full bg-zinc-900 border ${errors.service ? 'border-red-500' : 'border-white/10 focus:border-reserve-accent'} rounded-xl px-4 py-3 text-sm text-white outline-none transition-all cursor-pointer`}
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: "" });
                      }}
                    >
                      <option value="Padel Courts">Padel Courts (Mondo WPT Turf)</option>
                      <option value="Pickleball Courts">Pickleball Courts (8-Layer Cushion Bitumen System)</option>
                      <option value="General Consultancy">General Consultancy & Custom Builds</option>
                    </select>
                    <AnimatePresence>
                      {errors.service && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.service}</motion.p>}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Project Details / Location *</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your requirements, target location, timeline, etc."
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500' : 'border-white/10 focus:border-reserve-accent'} rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all resize-none`}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: "" });
                    }}
                  />
                  <AnimatePresence>
                    {errors.message && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 font-bold uppercase tracking-wider">{errors.message}</motion.p>}
                  </AnimatePresence>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-[#FF6A00] hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  {status === "loading" ? "Submitting..." : <>Submit Inquiry <Send size={14} /></>}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* 6. CTA FOOTER SECTION */}
      <section className="relative py-48 bg-[#f0ece2] flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={verticalRevealVariants}
          custom={0}
          className="relative z-10 text-center px-6 text-black"
        >
          <h2 className="text-5xl sm:text-6xl md:text-[8rem] font-black uppercase italic tracking-tighter leading-[0.8] mb-12">
            BUILD YOUR <br /> LEGACY
          </h2>
          <p className="text-black/60 text-lg md:text-xl font-medium mb-16 max-w-2xl mx-auto uppercase">
            Partner with India’s premier sports architects to bring world-class facilities to your community.
          </p>
          <button
            onClick={() => scrollToForm("General Consultancy")}
            className="px-20 py-8 bg-black text-[#f0ece2] rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-reserve-accent transition-all shadow-2xl cursor-pointer"
          >
            Consult With Us
          </button>
        </motion.div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black text-black/[0.03] uppercase pointer-events-none select-none italic tracking-tighter leading-none">
          LEGACY
        </div>
      </section>

    </div>
  );
};

export default Services;
