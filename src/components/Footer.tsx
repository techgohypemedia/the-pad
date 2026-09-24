import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-black text-white pt-32 pb-16 px-6 md:px-12 border-t border-white/10 overflow-hidden">
      {/* Background Image Layer - Restored to original shade/color */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/footer-bg.png"
          alt="Footer Background"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Subtle gradient to ensure text remains readable without washing out the image colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24 mb-24">

          {/* Left Section: Logo */}
          <div className="flex flex-col items-start">
            <Link
              to="/"
              className="inline-block transition-transform duration-500 hover:scale-[1.05]"
            >
              <img
                src="/assets/logo.png"
                alt="The Pad Logo"
                className="h-28 md:h-36 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Middle Section: Locations */}
          <div className="flex flex-col gap-12">
            <div>
              <h4 className="text-[11px] uppercase tracking-[0.45em] font-black mb-10 text-white/60" style={{ fontFamily: "'Poppins', sans-serif" }}>Our Locations</h4>
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-base font-bold uppercase tracking-widest text-reserve-accent">Gulmohar Park <br />New Delhi
                    Delhi</span>
                  <p className="text-[13px] text-white/90 leading-relaxed uppercase tracking-widest font-medium">

                    <a href="mailto:info@thepad.in" className="hover:text-reserve-accent transition-colors">info@thepad.in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Links */}
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <ul className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.35em] font-bold text-white/80" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <li className="text-white/40 mb-2">Explore</li>
              <li><Link to="/services" className="hover:text-reserve-accent cursor-pointer transition-colors block">Our Services</Link></li>
              {/* <li><Link to="/clubs" className="hover:text-reserve-accent cursor-pointer transition-colors block">Our Clubs</Link></li> */}
              <li><Link to="/our-story" className="hover:text-reserve-accent cursor-pointer transition-colors block">Our Story</Link></li>
              <li 
                onClick={() => window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank")}
                className="hover:text-reserve-accent cursor-pointer transition-colors"
              >
                Book a Court
              </li>
            </ul>
            <ul className="flex flex-col gap-5 text-[11px] uppercase tracking-[0.35em] font-bold text-white/80" style={{ fontFamily: "'Poppins', sans-serif" }}>
              <li className="text-white/40 mb-2">Social</li>
              <li><a href="https://www.instagram.com/thepad.in?igsh=MTZhNGlmMG5uMWRxbA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-reserve-accent transition-colors">Instagram</a></li>
              <li className="hover:text-reserve-accent cursor-pointer transition-colors">LinkedIn</li>
              <li 
                onClick={() => window.open("https://chat.whatsapp.com/E9XA6ERXJzDEDE8bL9nu6U", "_blank")}
                className="hover:text-reserve-accent cursor-pointer transition-colors"
              >
                WhatsApp
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row gap-6 md:gap-0 justify-between items-center text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-white/50 text-center md:text-left">
          <span className="font-medium">© 2025 The Pad. All Rights Reserved.</span>
          <div className="flex gap-10">
            <span className="hover:text-white cursor-pointer transition-all">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-all">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
