import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/7f639b95-226a-422d-926f-c7952b4a8849/files/904fec01-d27f-465e-b101-5da967fc5302.jpg";

const SERVICES = [
  { icon: "Droplets", title: "Full Car Wash", value: "wash", desc: "Exterior wash with clean rags, premium soap, and careful hand technique — every panel spotless.", tag: "Most Popular" },
  { icon: "Snowflake", title: "Driveway Shoveling", value: "shovel", desc: "Winter driveway cleared fast and efficiently. We handle the snow so you don't have to.", tag: "Seasonal" },
  { icon: "Leaf", title: "Leaf Raking & Bagging", value: "leaves", desc: "Full yard leaf cleanup — front, back, with leaf blower available for larger jobs.", tag: "Seasonal" },
];

const PRICING = [
  { title: "Car Wash", price: "$15 – $25", note: "Based on car size & options", icon: "Car", color: "from-cyan-500 to-blue-600", items: ["Hand wash with clean rags", "Premium soap", "All car types including convertibles", "15–20 min turnaround"] },
  { title: "Driveway Shoveling", price: "$15 – $30", note: "Based on driveway size", icon: "Snowflake", color: "from-blue-400 to-indigo-600", items: ["Full driveway cleared", "Winter season only", "Fast & reliable", "Available on holidays (morning only on Thanksgiving & Halloween · closed Christmas)"] },
  { title: "Leaf Raking", price: "$20 – $80", note: "Front/back + leaf blower = upper range", icon: "Leaf", color: "from-emerald-400 to-cyan-600", items: ["Raking & bagging included", "Front or back yard", "Leaf blower available", "Fall season"] },
];

const TEAM = [
  { name: "Gavin", role: "Co-Founder", emoji: "🚗" },
  { name: "Nigel", role: "Co-Founder", emoji: "💦" },
  { name: "Aidan", role: "Co-Founder", emoji: "✨" },
  { name: "Mikail", role: "Co-Founder", emoji: "🧽" },
];

interface HeroSectionsProps {
  scrollTo: (id: string) => void;
  onServiceClick: (value: string) => void;
}

export default function HeroSections({ scrollTo, onServiceClick }: HeroSectionsProps) {
  return (
    <>
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/60 via-[#050A14]/40 to-[#050A14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14]/80 via-transparent to-[#050A14]/40" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 text-cyan-400 text-sm tracking-wide">
              <Icon name="MapPin" size={14} />
              We come to you
            </div>
            <span className="text-white/30 text-sm hidden sm:block">or</span>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white/50 text-sm tracking-wide">
              <Icon name="Navigation" size={14} />
              You can come to us too
            </div>
          </div>
          <h1 className="font-rajdhani font-bold text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-6 uppercase">
            Your Car,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Spotless</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Professional hand car wash delivered right to your driveway. Fast, affordable, and done right — every time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => scrollTo("contact")} className="group flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#050A14] font-rajdhani font-bold text-lg tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]">
              BOOK A WASH <Icon name="ArrowRight" size={18} />
            </button>
            <button onClick={() => scrollTo("services")} className="flex items-center gap-2 border border-white/20 hover:border-cyan-400/50 text-white/70 hover:text-white font-rajdhani font-semibold tracking-widest px-8 py-4 rounded-full transition-all duration-300">
              OUR SERVICES
            </button>
          </div>
          <div className="flex items-center justify-center gap-10 mt-16 text-center">
            {[["$15", "Starting Price"], ["15 min", "Avg. Wash Time"], ["4", "Team Members"]].map(([val, label]) => (
              <div key={label}>
                <div className="font-rajdhani font-bold text-3xl text-cyan-400">{val}</div>
                <div className="text-white/40 text-xs tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-rajdhani font-semibold">What We Do</span>
          <h2 className="font-rajdhani font-bold text-5xl md:text-6xl mt-2 uppercase">Our Services</h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto">Tap a service to go straight to booking.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <button key={s.title} onClick={() => onServiceClick(s.value)} className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-300 text-left cursor-pointer">
              <div className="absolute top-4 right-4">
                <span className="text-xs bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 px-2 py-0.5 rounded-full">{s.tag}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-400/30 transition-all">
                <Icon name={s.icon} size={22} className="text-cyan-400" />
              </div>
              <h3 className="font-rajdhani font-bold text-2xl mb-3">{s.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm mb-4">{s.desc}</p>
              <div className="flex items-center gap-1.5 text-cyan-400 text-sm font-rajdhani font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                Book this service <Icon name="ArrowRight" size={14} />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* GOAL BANNER */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-cyan-500/10 via-blue-600/10 to-cyan-500/10 border border-cyan-400/20 rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-4">
              <Icon name="Target" size={18} />
              <span className="text-sm tracking-widest uppercase font-rajdhani font-semibold">Our Goal</span>
            </div>
            <h3 className="font-rajdhani font-bold text-4xl md:text-5xl mb-4 leading-tight uppercase">
              Upgrading Our <span className="text-cyan-400">Equipment</span>
            </h3>
            <p className="text-white/50 leading-relaxed mb-4">
              Right now we use buckets of soap and clean rags — and we do a great job! But we're saving up to upgrade our setup with two big goals:
            </p>
            <ul className="space-y-2 text-white/50">
              <li className="flex items-start gap-2"><Icon name="Zap" size={15} className="text-cyan-400 mt-0.5 shrink-0" /><span>A <strong className="text-white/80">car-safe pressure washer</strong> — making every wash 2× faster and 2× cleaner</span></li>
              <li className="flex items-start gap-2"><Icon name="ShoppingCart" size={15} className="text-cyan-400 mt-0.5 shrink-0" /><span>A <strong className="text-white/80">wagon</strong> to haul all our gear between jobs — no more lugging buckets by hand</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm tracking-widest uppercase font-rajdhani font-semibold">Transparent Rates</span>
          <h2 className="font-rajdhani font-bold text-5xl md:text-6xl mt-2 uppercase">Pricing</h2>
          <p className="text-white/40 mt-4 max-w-md mx-auto">No surprises. Fair prices based on the size and scope of the job.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {PRICING.map((p) => (
            <div key={p.title} className="group bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-cyan-400/30 transition-all duration-300 flex flex-col">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-6`}>
                <Icon name={p.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-rajdhani font-bold text-2xl mb-1">{p.title}</h3>
              <div className="font-rajdhani font-bold text-4xl text-cyan-400 mb-1">{p.price}</div>
              <p className="text-white/30 text-xs mb-6">{p.note}</p>
              <ul className="space-y-3 mt-auto">
                {p.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-white/60 text-sm">
                    <Icon name="Check" size={14} className="text-cyan-400 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 px-6 md:px-12 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm tracking-widest uppercase font-rajdhani font-semibold">The Crew</span>
            <h2 className="font-rajdhani font-bold text-5xl md:text-6xl mt-2 uppercase">Meet The Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {TEAM.map((m) => (
              <div key={m.name} className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">{m.emoji}</div>
                <h4 className="font-rajdhani font-bold text-2xl">{m.name}</h4>
                <p className="text-white/40 text-sm mt-1">{m.role}</p>
              </div>
            ))}
          </div>
          <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="font-rajdhani font-bold text-3xl mb-4">How We Started</h3>
            <p className="text-white/50 leading-relaxed">
              We came up with this idea at school — just four friends who decided to stop asking our parents for money and start earning our own. We go door-to-door offering our services, and now with this website, we can hand out a business card and let customers reach us whenever they're ready for a wash.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
