import React, { useState } from "react";
import { motion } from "motion/react";

const StayInTheGame = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Connect to WordPress backend (Contact Form 7 or Mailchimp or Custom Endpoint)
      const API_URL = import.meta.env.VITE_WP_API_URL;

      // Example of a common WP AJAX or REST API subscription endpoint
      // Adjusting to what might have been there:
      const response = await fetch(`${API_URL}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="bg-black text-white py-24 px-6 border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          STAY IN THE GAME
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white/50 text-base md:text-lg mb-12 max-w-2xl"
        >
          Join our community for exclusive benefits, events and early access.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="w-full flex flex-col md:flex-row gap-4 items-center justify-center max-w-3xl"
        >
          <div className="relative w-full md:flex-1">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#111] border border-white/10 px-6 py-5 rounded-none text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full md:w-auto px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-white/90 transition-all disabled:opacity-50"
          >
            {status === "loading" ? "SIGNING UP..." : "SIGN UP NOW"}
          </button>
        </motion.form>

        {status === "success" && (
          <p className="mt-6 text-green-500 font-bold uppercase tracking-widest text-xs">Thank you for joining our community!</p>
        )}
        {status === "error" && (
          <p className="mt-6 text-red-500 font-bold uppercase tracking-widest text-xs">An error occurred. Please try again later.</p>
        )}
      </div>
    </section>
  );
};

export default StayInTheGame;
