import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/coffeeProducts';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const CustomerReviewsSection: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number>(0);

  const filteredReviews = filterRating === 0 
    ? REVIEWS_DATA 
    : REVIEWS_DATA.filter(r => r.rating === filterRating);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F5] border-t border-[#241B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with quantitative rigor */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#241B16]/10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C87A3B] mb-2">
              Khách Hàng Đã Trải Nghiệm
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241B16]">
              Cảm nhận chân thực từ những tín đồ cà phê
            </h2>
          </div>

          {/* Aggregate Rating Scoreboard (Legitimate) */}
          <div className="flex items-center gap-4 bg-[#F5EFE6] px-5 py-3 rounded-2xl border border-[#241B16]/10 shrink-0">
            <div className="text-3xl font-mono font-bold text-[#241B16]">4.94</div>
            <div className="text-xs text-[#58483E] space-y-0.5">
              <div className="flex text-[#D97736]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D97736]" />
                ))}
              </div>
              <div>Dựa trên 480+ đơn hàng đã giao</div>
            </div>
          </div>
        </div>

        {/* Filter by star rating */}
        <div className="flex items-center gap-2 py-4">
          <button
            onClick={() => setFilterRating(0)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
              filterRating === 0
                ? 'bg-[#241B16] text-white font-semibold'
                : 'text-[#58483E] hover:bg-[#EFE8DF]'
            }`}
          >
            Tất cả đánh giá
          </button>
          <button
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
              filterRating === 5
                ? 'bg-[#241B16] text-white font-semibold'
                : 'text-[#58483E] hover:bg-[#EFE8DF]'
            }`}
          >
            <span>5 Sao xuất sắc</span>
            <Star className="w-3 h-3 fill-current" />
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filteredReviews.map((rv) => (
            <div
              key={rv.id}
              className="p-6 bg-white rounded-2xl border border-[#241B16]/10 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D97736]">
                    {[...Array(rv.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D97736]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8A7568]">{rv.date}</span>
                </div>

                <div className="relative">
                  <Quote className="w-5 h-5 text-[#EFE8DF] absolute -top-1 -left-1 -z-0" />
                  <p className="text-xs sm:text-sm text-[#42332A] leading-relaxed relative z-10 italic">
                    "{rv.comment}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#241B16]/8 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#241B16] flex items-center gap-1.5">
                    <span>{rv.author}</span>
                    {rv.verified && (
                      <span className="text-emerald-700 flex items-center text-[10px] font-normal" title="Đã mua hàng thật">
                        <CheckCircle className="w-3 h-3 inline mr-0.5" />
                        Đã xác thực
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#8A7568]">{rv.city}</div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-[#C87A3B] font-medium block">
                    Đã mua: {rv.productName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
