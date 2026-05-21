import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/72d86ca5-8649-41e0-a67c-43254b3c1665";
const PAGE_SIZE = 3;

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

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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

  const handleLoadMore = () => fetchReviews(reviews.length, true);

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
  );
}
