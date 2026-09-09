import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Our Story", id: "story", path: "/our-story" },
    { name: "Our Services", id: "services", path: "/services" },
    { name: "Our Clubs", id: "clubs", path: "/clubs" },
    { name: "Contact", id: "contact", path: "/contact" }
  ];

  const location = useLocation();
  const navigate = useNavigate();
  
  const pagesWithHero = ["/", "/contact", "/clubs", "/services", "/our-story"];
  const isTransparentPage = pagesWithHero.includes(location.pathname);

  const handleNavClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
    if (link.id === "services") {
      e.preventDefault();
      if (location.pathname === "/services") {
        window.dispatchEvent(new CustomEvent("open-services-inquiry"));
      } else {
        navigate("/services", { state: { openInquiry: true } });
      }
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    } else {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || !isTransparentPage ? "bg-black/95 backdrop-blur-md py-0" : "bg-transparent py-0"}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Left Section: Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-opacity"
          >
            <img src="/assets/logo.png" alt="The Pad Logo" className="h-20 md:h-28 lg:h-32 w-auto" />
          </Link>
        </div>

        {/* Middle Section: Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-5 xl:gap-10 mx-4 xl:mx-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-[12px] xl:text-[13px] uppercase tracking-[0.2em] xl:tracking-[0.25em] font-black transition-all cursor-pointer whitespace-nowrap ${location.pathname === link.path ? "text-reserve-accent opacity-100" : "text-white/60 hover:text-white hover:opacity-100"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Section: CTA Button */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <button
            onClick={() => window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank")}
            className="hidden lg:block text-[11px] xl:text-[12px] uppercase tracking-[0.25em] xl:tracking-[0.3em] font-black py-3.5 px-7 xl:px-10 rounded-full border border-reserve-accent hover:bg-reserve-accent hover:text-white transition-all text-white whitespace-nowrap"
          >
            Book Your Court
          </button>

          {/* Mobile Toggle inside the right section */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:hidden absolute top-0 left-0 w-full h-screen bg-black z-50 p-8 flex flex-col"
        >
          <div className="flex justify-between items-center mb-12">
            <img src="/assets/logo.png" alt="The Pad Logo" className="h-28 w-auto" />
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => handleNavClick(e, link)}
                className="text-3xl uppercase tracking-widest font-sans font-bold text-left block"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto pb-12">
            <button 
              onClick={() => window.open("https://hudle.in/venues/the-pad-gulmohar-club/267531", "_blank")}
              className="w-full py-5 rounded-full border border-white/20 text-[10px] uppercase tracking-[0.3em] font-bold text-white"
            >
              Book Your Court
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
