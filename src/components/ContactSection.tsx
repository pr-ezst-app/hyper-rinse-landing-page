import { useState } from "react";
import Icon from "@/components/ui/icon";

const FAQS = [
  { q: "How much does a car wash cost?", a: "$15–$25 depending on the size of the car and what services you need." },
  { q: "How long does it take?", a: "Usually 15–20 minutes for a standard wash." },
  { q: "Do you clean all types of cars?", a: "Yes — including convertibles! We dust the hood and lightly wipe it down to keep it safe." },
  { q: "What are your hours?", a: "Weekdays: 3pm – 6pm. Weekends: 10am – 5pm. Hours may vary around family events." },
  { q: "Do you work on holidays?", a: "We work early on Christmas, Thanksgiving, and Halloween — morning hours only on those days. All other holidays we work our regular hours." },
  { q: "What area do you serve?", a: "We currently serve the North York and East York areas only. If you're unsure whether we cover your street, feel free to reach out and ask!" },
  { q: "What other services do you offer?", a: "We also shovel driveways ($15–$30) in winter and rake/bag leaves ($20–$80) in fall." },
];

interface ContactSectionProps {
  selectedService: string;
  setSelectedService: (v: string) => void;
}

export default function ContactSection({ selectedService, setSelectedService }: ContactSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* FAQ */}
      <section id="faq" className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-rajdhani font-semibold">Common Questions</span>
          <h2 className="font-rajdhani font-bold text-5xl md:text-6xl mt-2 uppercase">FAQ</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-cyan-400/20 transition-colors">
              <button className="w-full flex items-center justify-between px-6 py-5 text-left gap-4" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span className="font-rajdhani font-semibold text-lg text-white">{faq.q}</span>
                <Icon name={openFaq === i ? "Minus" : "Plus"} size={18} className={`shrink-0 transition-colors ${openFaq === i ? "text-cyan-400" : "text-white/40"}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-white/50 leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* HOURS + AREA BANNER */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="Clock" size={20} className="text-cyan-400" />
              </div>
              <div>
                <p className="font-rajdhani font-bold text-lg text-white">Weekdays</p>
                <p className="text-cyan-400 font-rajdhani font-bold text-2xl">3:00 PM – 6:00 PM</p>
                <p className="text-white/40 text-xs mt-1">Mon – Fri (after school)</p>
              </div>
            </div>
            <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="Sun" size={20} className="text-cyan-400" />
              </div>
              <div>
                <p className="font-rajdhani font-bold text-lg text-white">Weekends</p>
                <p className="text-cyan-400 font-rajdhani font-bold text-2xl">10:00 AM – 5:00 PM</p>
                <p className="text-white/40 text-xs mt-1">Sat & Sun · Early mornings on holidays</p>
              </div>
            </div>
            <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-2xl p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/20 flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="MapPin" size={20} className="text-cyan-400" />
              </div>
              <div>
                <p className="font-rajdhani font-bold text-lg text-white">Service Area</p>
                <p className="text-cyan-400 font-rajdhani font-bold text-2xl">North & East York</p>
                <p className="text-white/40 text-xs mt-1">Toronto, ON · Not sure? Just ask us!</p>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-3">
            <Icon name="Info" size={16} className="text-white/40 shrink-0" />
            <p className="text-white/40 text-sm">
              <span className="text-white/70 font-semibold">Holiday hours:</span> We work <span className="text-white/70">morning only</span> on Christmas, Thanksgiving, and Halloween — but we're off later in the day on those holidays. All other holidays: regular hours.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-12 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-rajdhani font-semibold">Get In Touch</span>
          <h2 className="font-rajdhani font-bold text-5xl md:text-6xl mt-2 mb-4 uppercase">Book A Wash</h2>
          <p className="text-white/40 mb-10">Send us a message and we'll get back to you to schedule your wash. We come right to your door!</p>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10 text-left">
            <div className="space-y-4">
              <div>
                <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Your Name</label>
                <input type="text" placeholder="John Smith" className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors" />
              </div>
              <div>
                <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Phone or Email</label>
                <input type="text" placeholder="(555) 000-0000 or email@example.com" className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors" />
              </div>
              <div>
                <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Service Needed</label>
                <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-cyan-400/50 transition-colors">
                  <option value="">Select a service...</option>
                  <option value="wash">Car Wash ($15–$25)</option>
                  <option value="shovel">Driveway Shoveling ($15–$30)</option>
                  <option value="leaves">Leaf Raking & Bagging ($20–$80)</option>
                </select>
                {selectedService && (
                  <p className="text-cyan-400/70 text-xs mt-1.5 flex items-center gap-1">
                    <Icon name="CheckCircle" size={12} /> Pre-selected from your service choice
                  </p>
                )}
              </div>
              <div>
                <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Do you have a hose?</label>
                <select className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-cyan-400/50 transition-colors">
                  <option value="">Select...</option>
                  <option value="yes">Yes, I have a hose</option>
                  <option value="no">No, I don't have a hose</option>
                </select>
                <p className="text-white/25 text-xs mt-1.5">Helps us plan — we bring our own water either way!</p>
              </div>
              <div>
                <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Message (optional)</label>
                <textarea rows={3} placeholder="Any details about your car or job..." className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none" />
              </div>
              <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-[#050A14] font-rajdhani font-bold text-lg tracking-widest py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] mt-2">
                SEND MESSAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-rajdhani font-bold text-xl tracking-widest">HYPER<span className="text-cyan-400">RINSE</span></span>
          <p className="text-white/20 text-sm text-center">© 2025 HyperRinse · Door-to-door car washing · All rights reserved</p>
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <Icon name="Sparkles" size={14} className="text-cyan-400" />
            Student-run business
          </div>
        </div>
      </footer>
    </>
  );
}
