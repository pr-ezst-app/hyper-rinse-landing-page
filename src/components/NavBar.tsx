import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = ["Home", "Services", "Pricing", "Team", "Reviews", "FAQ", "Contact"];

interface NavBarProps {
  scrollTo: (id: string) => void;
}

export default function NavBar({ scrollTo }: NavBarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (l: string) => {
    setMenuOpen(false);
    scrollTo(l.toLowerCase());
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#050A14]/80 backdrop-blur-md border-b border-white/5">
        <span className="font-rajdhani font-bold text-2xl tracking-widest text-white">
          HYPER<span className="text-cyan-400">RINSE</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => handleNav(l)} className="text-sm text-white/60 hover:text-cyan-400 transition-colors duration-200 tracking-wide">
              {l}
            </button>
          ))}
        </div>
        <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050A14]/98 flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => handleNav(l)} className="font-rajdhani text-3xl font-bold text-white/80 hover:text-cyan-400 transition-colors">
              {l}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
