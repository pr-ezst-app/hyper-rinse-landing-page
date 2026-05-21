import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.ezst.app/projects/7f639b95-226a-422d-926f-c7952b4a8849/files/904fec01-d27f-465e-b101-5da967fc5302.jpg";
const API = "https://functions.poehali.dev/72d86ca5-8649-41e0-a67c-43254b3c1665";
const PAGE_SIZE = 3;

const NAV_LINKS = ["Home", "Services", "Pricing", "Team", "Reviews", "FAQ", "Contact"];

const SERVICES = [
  { icon: "Droplets", title: "Full Car Wash", value: "wash", desc: "Exterior wash with clean rags, premium soap, and careful hand technique — every panel spotless.", tag: "Most Popular" },
  { icon: "Snowflake", title: "Driveway Shoveling", value: "shovel", desc: "Winter driveway cleared fast and efficiently. We handle the snow so you don't have to.", tag: "Seasonal" },
  { icon: "Leaf", title: "Leaf Raking & Bagging", value: "leaves", desc: "Full yard leaf cleanup — front, back, with leaf blower available for larger jobs.", tag: "Seasonal" },
];

const PRICING = [
  { title: "Car Wash", price: "$15 – $25", note: "Based on car size & options", icon: "Car", color: "from-cyan-500 to-blue-600", items: ["Hand wash with clean rags", "Premium soap", "All car types including convertibles", "15–20 min turnaround"] },
  { title: "Driveway Shoveling", price: "$15 – $30", note: "Based on driveway size", icon: "Snowflake", color: "from-blue-400 to-indigo-600", items: ["Full driveway cleared", "Winter season only", "Fast & reliable", "Available holidays"] },
  { title: "Leaf Raking", price: "$20 – $80", note: "Front/back + leaf blower = upper range", icon: "Leaf", color: "from-emerald-400 to-cyan-600", items: ["Raking & bagging included", "Front or back yard", "Leaf blower available", "Fall season"] },
];

const TEAM = [
  { name: "Gavin", role: "Co-Founder", emoji: "🚗" },
  { name: "Nigel", role: "Co-Founder", emoji: "💦" },
  { name: "Aidan", role: "Co-Founder", emoji: "✨" },
  { name: "Mikail", role: "Co-Founder", emoji: "🧽" },
];

const FAQS = [
  { q: "How much does a car wash cost?", a: "$15–$25 depending on the size of the car and what services you need." },
  { q: "How long does it take?", a: "Usually 15–20 minutes for a standard wash." },
  { q: "Do you clean all types of cars?", a: "Yes — including convertibles! We dust the hood and lightly wipe it down to keep it safe." },
  { q: "What are your hours?", a: "Weekdays: 3pm – 6pm. Weekends: 10am – 5pm. Hours may vary around family events." },
  { q: "Do you work on holidays?", a: "We work early on Christmas, Thanksgiving, and Halloween — morning hours only on those days. All other holidays we work our regular hours." },
  { q: "What area do you serve?", a: "We currently serve the North York and East York areas only. If you're unsure whether we cover your street, feel free to reach out and ask!" },
  { q: "What other services do you offer?", a: "We also shovel driveways ($15–$30) in winter and rake/bag leaves ($20–$80) in fall." },
];

type Review = { id: number; name: string; stars: number; service: string; text: string; date: string };

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)} onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} className="text-2xl transition-transform hover:scale-125">
          <span className={(hover || value) >= n ? "text-cyan-400" : "text-white/20"}>★</span>
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-cyan-400/20 transition-all duration-300 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} className={`text-lg ${n <= review.stars ? "text-cyan-400" : "text-white/15"}`}>★</span>
          ))}
        </div>
        <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{review.service}</span>
      </div>
      <p className="text-white/60 text-sm leading-relaxed italic">"{review.text}"</p>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <span className="font-rajdhani font-semibold text-white/80">{review.name}</span>
        <span className="text-white/25 text-xs">{review.date}</span>
      </div>
    </div>
  );
}

export default function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Submit form state
  const [newStars, setNewStars] = useState(0);
  const [newName, setNewName] = useState("");
  const [newService, setNewService] = useState("");
  const [newText, setNewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchReviews = useCallback(async (offset: number, append = false) => {
    if (offset === 0) setInitialLoading(true);
    else setLoadingMore(true);
    const res = await fetch(`${API}?offset=${offset}&limit=${PAGE_SIZE}`);
    const data = await res.json();
    setTotal(data.total);
    setAvg(data.avg);
    setReviews((prev) => append ? [...prev, ...data.reviews] : data.reviews);
    setInitialLoading(false);
    setLoadingMore(false);
  }, []);

  useEffect(() => { fetchReviews(0); }, [fetchReviews]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleServiceClick = (value: string) => {
    setSelectedService(value);
    scrollTo("contact");
  };

  const handleLoadMore = () => {
    fetchReviews(reviews.length, true);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStars || !newName.trim() || !newText.trim()) return;
    setSubmitting(true);
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName.trim(), stars: newStars, service: newService || "General", text: newText.trim() }),
    });
    setSubmitting(false);
    setNewStars(0);
    setNewName("");
    setNewService("");
    setNewText("");
    setSubmitted(true);
    fetchReviews(0);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const hasMore = reviews.length < total;

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-dm overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#050A14]/80 backdrop-blur-md border-b border-white/5">
        <span className="font-rajdhani font-bold text-2xl tracking-widest text-white">
          HYPER<span className="text-cyan-400">RINSE</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="text-sm text-white/60 hover:text-cyan-400 transition-colors duration-200 tracking-wide">
              {l}
            </button>
          ))}
        </div>
        <button className="md:hidden text-white/60 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050A14]/98 flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="font-rajdhani text-3xl font-bold text-white/80 hover:text-cyan-400 transition-colors">{l}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${HERO_IMG})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/60 via-[#050A14]/40 to-[#050A14]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050A14]/80 via-transparent to-[#050A14]/40" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-4 py-1.5 mb-6 text-cyan-400 text-sm tracking-wide">
            <Icon name="MapPin" size={14} />
            Door-to-door service — we come to you
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
            <button key={s.title} onClick={() => handleServiceClick(s.value)} className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-300 text-left cursor-pointer">
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
              Saving Up For A <span className="text-cyan-400">Pressure Washer</span>
            </h3>
            <p className="text-white/50 leading-relaxed">
              Right now we use buckets of soap and clean rags — and we do a great job! But our goal is to get a car-safe pressure washer, which will make every wash <strong className="text-white/80">2× faster and 2× cleaner</strong>. Once we hit that milestone, we'll expand our services even further.
            </p>
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

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm tracking-widest uppercase font-rajdhani font-semibold">Customer Feedback</span>
            <h2 className="font-rajdhani font-bold text-5xl md:text-6xl mt-2 uppercase">Reviews</h2>
            {total > 0 && (
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((n) => (
                    <span key={n} className={`text-xl ${n <= Math.round(avg) ? "text-cyan-400" : "text-white/15"}`}>★</span>
                  ))}
                </div>
                <span className="font-rajdhani font-bold text-2xl text-cyan-400">{avg.toFixed(1)}</span>
                <span className="text-white/30 text-sm">({total} {total === 1 ? "review" : "reviews"})</span>
              </div>
            )}
          </div>

          {/* Review cards */}
          {initialLoading ? (
            <div className="grid md:grid-cols-3 gap-6 mb-14">
              {[1,2,3].map((i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 h-44 animate-pulse" />
              ))}
            </div>
          ) : reviews.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
              {hasMore && (
                <div className="flex justify-center mb-14">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="flex items-center gap-2 border border-white/20 hover:border-cyan-400/50 text-white/60 hover:text-cyan-400 font-rajdhani font-semibold tracking-widest px-8 py-3 rounded-full transition-all duration-300 disabled:opacity-40"
                  >
                    {loadingMore ? (
                      <><Icon name="Loader" size={16} className="animate-spin" /> Loading...</>
                    ) : (
                      <><Icon name="ChevronDown" size={16} /> View More Reviews ({total - reviews.length} remaining)</>
                    )}
                  </button>
                </div>
              )}
              {!hasMore && reviews.length > PAGE_SIZE && (
                <p className="text-center text-white/20 text-sm mb-14">You've seen all {total} reviews</p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 mb-14 border border-dashed border-white/10 rounded-2xl gap-4 text-center">
              <div className="text-5xl">💬</div>
              <p className="font-rajdhani font-bold text-xl text-white/50">No reviews yet</p>
              <p className="text-white/25 text-sm max-w-xs">Be the first to share your experience with HyperRinse!</p>
            </div>
          )}

          {/* Leave a review form */}
          <div className="max-w-2xl mx-auto bg-white/[0.03] border border-white/10 rounded-2xl p-8 md:p-10">
            <h3 className="font-rajdhani font-bold text-2xl mb-1">Leave a Review</h3>
            <p className="text-white/40 text-sm mb-6">Worked with us? We'd love to hear what you think.</p>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
                <div className="text-5xl">🎉</div>
                <p className="font-rajdhani font-bold text-xl text-cyan-400">Thanks for your review!</p>
                <p className="text-white/40 text-sm">Your feedback means a lot to us.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Your Rating</label>
                  <StarPicker value={newStars} onChange={setNewStars} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Your Name</label>
                    <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Jane D." className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Service Used</label>
                    <select value={newService} onChange={(e) => setNewService(e.target.value)} className="w-full bg-[#050A14] border border-white/10 rounded-xl px-4 py-3 text-white/60 focus:outline-none focus:border-cyan-400/50 transition-colors">
                      <option value="">Select...</option>
                      <option value="Car Wash">Car Wash</option>
                      <option value="Driveway Shoveling">Driveway Shoveling</option>
                      <option value="Leaf Raking">Leaf Raking</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Your Review</label>
                  <textarea rows={3} value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Tell us about your experience..." className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={!newStars || !newName.trim() || !newText.trim() || submitting} className="w-full bg-cyan-400 hover:bg-cyan-300 disabled:opacity-30 disabled:cursor-not-allowed text-[#050A14] font-rajdhani font-bold text-lg tracking-widest py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2">
                  {submitting ? <><Icon name="Loader" size={18} className="animate-spin" /> Submitting...</> : "SUBMIT REVIEW"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

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
            {/* Weekday hours */}
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
            {/* Weekend hours */}
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
            {/* Service area */}
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

          {/* Holiday notice */}
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
    </div>
  );
}