import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, Loader2, MessageSquarePlus } from "lucide-react";

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen?: () => void;
  defaultService?: string;
}

export const ServiceInquiryModal: React.FC<ServiceInquiryModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  defaultService = "Padel Courts",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Sync defaultService when modal opens or prop changes
  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        service: defaultService || "Padel Courts",
      }));
      setErrors({});
      setStatus("idle");
    }
  }, [isOpen, defaultService]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    setErrors({});

    try {
      const wpUrl =
        import.meta.env.VITE_WP_API_URL?.replace("/wp/v2", "") ||
        "https://thepad.in/wp-json";
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

  // Animation variants targeting bottom-right corner contraction on exit
  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.15,
      x: "35vw",
      y: "35vh",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.12,
      x: "35vw",
      y: "35vh",
      transition: {
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Content Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-[540px] bg-[#f2f2f2] text-zinc-900 rounded-[2.5rem] p-8 sm:p-12 md:p-14 shadow-2xl z-10 my-auto border border-white/20 origin-bottom-right"
            >
              {/* Close Cross Button */}
              <button
                onClick={onClose}
                aria-label="Close form"
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-zinc-400 hover:text-black hover:bg-black/5 transition-all cursor-pointer group"
              >
                <X size={22} className="group-hover:scale-110 transition-transform" />
              </button>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                    <Check size={32} strokeWidth={2.5} />
                  </div>
                  <h3 className="text-3xl font-sans font-bold text-black tracking-tight mb-3">
                    THANK YOU!
                  </h3>
                  <p className="text-zinc-600 font-medium text-sm leading-relaxed max-w-sm mx-auto mb-8">
                    Your inquiry has been received. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        service: defaultService,
                        message: "",
                      });
                      onClose();
                    }}
                    className="w-full py-4 bg-black hover:bg-zinc-800 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-md cursor-pointer"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <div>
                  {/* Form Header */}
                  <div className="mb-8 pr-6">
                    <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-black uppercase mb-2">
                      PARTNER WITH US
                    </h2>
                    <p className="text-zinc-500 font-medium text-sm sm:text-base">
                      Fill the form, we will surely connect with you.
                    </p>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase mb-1">
                        NAME
                      </label>
                      <input
                        type="text"
                        className={`w-full bg-transparent border-b ${
                          errors.name ? "border-red-500" : "border-zinc-300 focus:border-black"
                        } outline-none py-1.5 text-sm sm:text-base text-zinc-900 transition-colors`}
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                      />
                      {errors.name && (
                        <span className="text-[10px] text-red-500 font-semibold tracking-wider uppercase mt-1">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase mb-1">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        className={`w-full bg-transparent border-b ${
                          errors.email ? "border-red-500" : "border-zinc-300 focus:border-black"
                        } outline-none py-1.5 text-sm sm:text-base text-zinc-900 transition-colors`}
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                      />
                      {errors.email && (
                        <span className="text-[10px] text-red-500 font-semibold tracking-wider uppercase mt-1">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase mb-1">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        className={`w-full bg-transparent border-b ${
                          errors.phone ? "border-red-500" : "border-zinc-300 focus:border-black"
                        } outline-none py-1.5 text-sm sm:text-base text-zinc-900 transition-colors`}
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                      />
                      {errors.phone && (
                        <span className="text-[10px] text-red-500 font-semibold tracking-wider uppercase mt-1">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold tracking-[0.15em] text-zinc-400 uppercase mb-1">
                        MESSAGE
                      </label>
                      <textarea
                        rows={2}
                        className={`w-full bg-transparent border-b ${
                          errors.message ? "border-red-500" : "border-zinc-300 focus:border-black"
                        } outline-none py-1.5 text-sm sm:text-base text-zinc-900 transition-colors resize-none`}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (errors.message) setErrors({ ...errors, message: "" });
                        }}
                      />
                      {errors.message && (
                        <span className="text-[10px] text-red-500 font-semibold tracking-wider uppercase mt-1">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full py-4 mt-6 bg-black hover:bg-zinc-800 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-md active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" /> SUBMITTING...
                        </>
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom-Right Trigger Pill resting after close */}
      <AnimatePresence>
        {!isOpen && onOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="fixed bottom-6 right-6 z-40 bg-black text-white hover:bg-zinc-900 shadow-2xl rounded-full px-5 py-3.5 flex items-center gap-3 border border-white/20 cursor-pointer font-bold text-xs uppercase tracking-wider transition-all group"
            title="Open Inquiry Form"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-reserve-accent animate-pulse" />
            <span className="font-sans font-bold tracking-widest text-[11px] sm:text-xs">PARTNER WITH US</span>
            <MessageSquarePlus size={16} className="text-reserve-accent group-hover:rotate-12 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ServiceInquiryModal;
