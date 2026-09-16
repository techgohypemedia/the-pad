import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useSpring } from "motion/react";
import { Mail, MapPin, ArrowRight, Instagram, Linkedin, Phone, X, ChevronLeft, ChevronRight, Star, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * CONTACT PAGE
 * Hero -> Combined Info/Form -> Looping Drag Slider -> Full Width Banner
 */
const Contact = () => {
  const formSectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Dragging Implementation
  const location = useLocation();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill service from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [location]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);
  const [isHoveringSlider, setIsHoveringSlider] = useState(false);

  // Smooth Cursor using useSpring for better performance
  const cursorX = useSpring(0, { damping: 20, stiffness: 150 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 150 });

  // Collage Images from local assets
  const baseImages = [
    "/assets/cr1.jpeg",
    "/assets/cr2.jpeg",
    "/assets/cr3.jpeg",
    "/assets/cr4.jpeg",
    "/assets/cr5.jpeg",
    "/assets/cr6.jpeg",
    "/assets/cr7.jpeg"
  ];

  // Tripled array for infinite seamless loop
  const images = [...baseImages, ...baseImages, ...baseImages];

  useEffect(() => {
    // Start slider in the middle set of images
    if (sliderRef.current) {
      const singleSetWidth = sliderRef.current.scrollWidth / 3;
      sliderRef.current.scrollLeft = singleSetWidth;
    }

    // Robust Cursor Tracking (Fixes lightbox disappearance)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      setIsHoveringSlider(isInside);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    window.addEventListener("scroll", () => {
      // Redetect on scroll to ensure circle hides if element moves away
      const rect = sliderRef.current?.getBoundingClientRect();
      if (rect) {
        const isInside = (
          cursorX.get() >= rect.left &&
          cursorX.get() <= rect.right &&
          cursorY.get() >= rect.top &&
          cursorY.get() <= rect.bottom
        );
        setIsHoveringSlider(isInside);
      }
    });

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  // Infinite Loop Logic
  const handleScroll = () => {
    if (!sliderRef.current || isDragging) return;
    const { scrollLeft, scrollWidth } = sliderRef.current;
    const singleSetWidth = scrollWidth / 3;

    // Reset loop if near boundaries
    if (scrollLeft < 50) {
      sliderRef.current.scrollLeft = singleSetWidth + scrollLeft;
    } else if (scrollLeft > (singleSetWidth * 2) - 50) {
      sliderRef.current.scrollLeft = scrollLeft - singleSetWidth;
    }
  };

  const startDragging = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const moveSlider = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    // Loop check during drag
    const { scrollLeft: sLeft, scrollWidth } = sliderRef.current;
    const singleSetWidth = scrollWidth / 3;
    if (sLeft < 10) {
      sliderRef.current.scrollLeft = singleSetWidth + sLeft;
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    } else if (sLeft > (singleSetWidth * 2) - 10) {
      sliderRef.current.scrollLeft = sLeft - singleSetWidth;
      setStartX(e.pageX - sliderRef.current.offsetLeft);
      setScrollLeft(sliderRef.current.scrollLeft);
    }
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex + 1) % baseImages.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImgIndex !== null) {
      setSelectedImgIndex((selectedImgIndex - 1 + baseImages.length) % baseImages.length);
    }
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
      const wpUrl = import.meta.env.VITE_WP_API_URL.replace('/wp/v2', '');
      const response = await fetch(`${wpUrl}/thepad/v1/contact-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col overflow-x-hidden relative">
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 md:pt-36 pb-12">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src="https://images.unsplash.com/photo-1657704358775-ed705c7388d2?q=80&w=2070&auto=format&fit=crop"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center mt-16 md:mt-24"
        >
          <h1 className="text-[18vw] md:text-[15vw] font-black uppercase tracking-tighter leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
            CONTACT
          </h1>
        </motion.div>
      </section>

      {/* 2. COMBINED: GET IN TOUCH + FORM SECTION */}
      <section ref={formSectionRef} className="py-24 md:py-40 px-6 md:px-12 bg-white text-black">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

          {/* LEFT: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]" style={{ fontFamily: "'Inter', sans-serif" }}>
              GET IN <br /> TOUCH
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              <div className="space-y-1">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Our HQ</h4>
                <p className="text-lg md:text-xl font-medium leading-tight">
                  Ek Om House New Delhi - 17 <br />
                  Block E Saket
                </p>
                <a href="#" className="inline-block text-[10px] border-b border-black/30 pb-0.5 mt-0.5 hover:border-black transition-all">Get Directions</a>
              </div>

              <div className="space-y-1">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Email</h4>
                <a href="mailto:info@thepad.in" className="text-lg md:text-xl font-medium underline block hover:opacity-70 transition-opacity">
                  info@thepad.in
                </a>
              </div>

              <div className="space-y-1">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">Phone</h4>
                <a href="tel:+919899230333" className="text-lg md:text-xl font-medium underline block hover:opacity-70 transition-opacity">
                  +91 9899230333
                </a>
              </div>

              <div className="space-y-1">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-black/40">WhatsApp</h4>
                <div className="flex flex-col gap-0.5">
                  <a href="https://wa.me/918447232791" target="_blank" rel="noopener noreferrer" className="text-lg font-medium underline hover:opacity-70 transition-opacity">Chat with us</a>
                  {/* <a href="#" className="text-lg font-medium underline hover:opacity-70 transition-opacity">Chat with Movement</a> */}
                </div>
              </div>
            </div>

            <div className="pt-8 flex gap-8">
              <a href="https://www.instagram.com/thepad.in?igsh=MTZhNGlmMG5uMWRxbA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity"><Instagram size={24} /></a>
              <a href="https://wa.me/918447232791" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a href="tel:+919899230333" className="hover:opacity-50 transition-opacity"><Phone size={24} /></a>
            </div>
          </motion.div>

          {/* RIGHT: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/5 p-8 md:p-14 lg:p-20 rounded-3xl"
          >
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Stay in the loop</h3>
              <p className="text-black/50 text-base md:text-lg">Sign up to receive news and updates.</p>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-[#0a0a0a] text-white p-16 rounded-[2.5rem] text-center border border-white/5 relative overflow-hidden shadow-2xl"
              >
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-reserve-accent/10 blur-[80px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-reserve-accent rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(234,88,12,0.3)]"
                  >
                    <Check className="text-white" size={48} strokeWidth={3} />
                  </motion.div>

                  <h3 className="text-5xl font-black uppercase italic tracking-tighter mb-6 leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                    THANK YOU <br /> FOR REACHING OUT
                  </h3>

                  <p className="text-white/40 mb-12 uppercase tracking-[0.2em] text-xs font-semibold max-w-xs mx-auto leading-relaxed">
                    YOUR INQUIRY HAS BEEN LOGGED. OUR TEAM WILL BE IN TOUCH WITHIN 24 HOURS.
                  </p>

                  <div className="flex flex-col items-center gap-6">
                    <button
                      onClick={() => navigate("/")}
                      className="px-12 py-4 bg-white text-black rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-reserve-accent hover:text-white transition-all w-full sm:w-auto cursor-pointer"
                    >
                      Return Home
                    </button>

                    <button
                      onClick={() => setStatus("idle")}
                      className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-reserve-accent transition-all border-b border-transparent hover:border-reserve-accent pb-1 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1">
                    <div className={`border-b-[1px] transition-all text-black ${errors.name ? 'border-red-500' : 'border-black/20 focus-within:border-black'}`}>
                      <input
                        type="text"
                        placeholder="NAME"
                        className="w-full bg-transparent pt-4 pb-1 px-0 outline-none text-base font-bold placeholder:text-black/20 placeholder:uppercase placeholder:tracking-widest"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.name}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-1">
                    <div className={`border-b-[1px] transition-all text-black ${errors.email ? 'border-red-500' : 'border-black/20 focus-within:border-black'}`}>
                      <input
                        type="email"
                        placeholder="EMAIL"
                        className="w-full bg-transparent pt-4 pb-1 px-0 outline-none text-base font-bold placeholder:text-black/20 placeholder:uppercase placeholder:tracking-widest"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.email}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-1">
                    <div className={`border-b-[1px] transition-all text-black ${errors.phone ? 'border-red-500' : 'border-black/20 focus-within:border-black'}`}>
                      <input
                        type="tel"
                        placeholder="PHONE"
                        className="w-full bg-transparent pt-4 pb-1 px-0 outline-none text-base font-bold placeholder:text-black/20 placeholder:uppercase placeholder:tracking-widest"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                      />
                    </div>
                    <AnimatePresence>
                      {errors.phone && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.phone}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="space-y-1">
                    <div className={`border-b-[1px] transition-all text-black ${errors.service ? 'border-red-500' : 'border-black/20 focus-within:border-black'}`}>
                      <select
                        className="w-full bg-transparent pt-4 pb-1 px-0 outline-none text-base font-bold text-black/40 placeholder:uppercase placeholder:tracking-widest appearance-none cursor-pointer"
                        value={formData.service}
                        onChange={(e) => {
                          setFormData({ ...formData, service: e.target.value });
                          if (errors.service) setErrors({ ...errors, service: '' });
                        }}
                      >
                        <option value="" disabled>SELECT SERVICE</option>
                        <option value="Padel Courts">Padel Courts</option>
                        <option value="Pickleball Courts">Pickleball Courts</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                    <AnimatePresence>
                      {errors.service && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.service}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-1 mt-6">
                  <div className={`border-b-[1px] transition-all text-black ${errors.message ? 'border-red-500' : 'border-black/20 focus-within:border-black'}`}>
                    <textarea
                      rows={2}
                      placeholder="MESSAGE"
                      className="w-full bg-transparent pt-4 pb-1 px-0 outline-none text-base font-bold placeholder:text-black/20 placeholder:uppercase placeholder:tracking-widest resize-none"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[9px] text-red-500 font-bold uppercase tracking-widest">{errors.message}</motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-12 py-5 bg-black text-white rounded-full text-xs font-black uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Processing..." : "Submit Inquiry"}
                  </button>
                </div>

                {status === "error" && (
                  <p className="text-red-500 font-bold text-center uppercase tracking-widest text-xs">Something went wrong. Try again.</p>
                )}
              </form>
            )}
          </motion.div>

        </div>
      </section>

      {/* 3. COLLAGE SLIDER SECTION */}
      <section className="bg-white py-12 relative overflow-hidden">
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={moveSlider}
          className={`flex gap-4 overflow-x-auto no-scrollbar px-6 md:px-12 py-8 select-none transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              className="flex-shrink-0 w-[300px] md:w-[450px] aspect-[3/4] overflow-hidden rounded-xl shadow-lg pointer-events-auto"
              onClick={() => {
                if (!isDragging) setSelectedImgIndex(idx % baseImages.length);
              }}
            >
              <img
                src={src}
                alt={`Collage ${idx}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          ))}
        </div>

        {/* Custom Cursor Circle */}
        <AnimatePresence mode="wait">
          {isHoveringSlider && !isDragging && selectedImgIndex === null && (
            <motion.div
              key="custom-cursor"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed z-[60] pointer-events-none w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-black/10 mix-blend-difference"
              style={{
                left: cursorX,
                top: cursorY,
                translateX: '-50%',
                translateY: '-50%'
              }}
            >
              <div className="flex gap-2">
                <ChevronLeft size={20} className="text-black" />
                <ChevronRight size={20} className="text-black" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 4. LIGHTBOX / MODAL */}
      <AnimatePresence>
        {selectedImgIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImgIndex(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImgIndex(null)}
            >
              <X size={40} />
            </button>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 md:left-8 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-[110]"
              onClick={nextImage}
            >
              <ChevronLeft size={32} />
            </button>
            <button
              className="absolute right-4 md:right-8 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors z-[110]"
              onClick={prevImage}
            >
              <ChevronRight size={32} />
            </button>

            {/* Main Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="max-w-5xl max-h-full aspect-[4/5] md:aspect-auto overflow-hidden rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={baseImages[selectedImgIndex]}
                alt="Enlarged view"
                className="w-full h-full object-contain md:object-cover"
              />
            </motion.div>

            {/* Index Display */}
            <div className="absolute bottom-8 text-[11px] uppercase tracking-[0.5em] font-black opacity-40">
              {selectedImgIndex + 1} / {baseImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. FULL WIDTH BANNER */}
      <section className="relative h-[80vh] w-full group overflow-hidden bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-full w-full overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1612534847738-b3af9bc31f0c?q=80&w=2070&auto=format&fit=crop"
            alt="Padel Action"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700" />

          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8 max-w-2xl">
              READY TO STEP <br /> UP YOUR GAME?
            </h3>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mb-12 font-medium">
              The Pad is a place to play, move and belong. Bringing together pickleball and padel in a premium, covered setting, it combines world-class court infrastructure, on-court support and a relaxed café and lounge. Whether you’re here to compete, play your first game or unwind with friends, The Pad makes every visit feel effortless.
            </p>
            <button
              onClick={scrollToForm}
              className="px-16 py-6 bg-white text-black rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all flex items-center gap-3 shadow-2xl"
            >
              Learn More <ArrowRight className="w-5 h-5 -rotate-45" />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Contact;
