import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Flame, Coffee } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onOpenTasteFinder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onOpenTasteFinder,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#241B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-7">
            {/* Unboxed subtle kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#C87A3B]">
              <span>Specialty Coffee Việt Nam</span>
              <span aria-hidden="true">·</span>
              <span>Đà Lạt & Đắk Lắk</span>
              <span aria-hidden="true">·</span>
              <span>Rang Mộc 100%</span>
            </div>

            {/* Display Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#241B16] leading-[1.12] tracking-tight text-balance">
              Tinh hoa hạt cà phê thủ công từ nông trại cao nguyên
            </h1>

            {/* Body Prose */}
            <p className="text-base sm:text-lg text-[#58483E] leading-relaxed max-w-2xl">
              Trang Coffee lựa chọn những mẻ hạt chín đỏ trên 98% từ vùng đất trứ danh Cầu Đất và Cư M’gar. Rang thủ công mẻ nhỏ, không hương liệu tổng hợp, giữ trọn vẹn tầng hương hoa quả, bơ mật và socola tự nhiên.
            </p>

            {/* Unboxed Metadata Metrics with dot separators */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#745F52] pt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Flame className="w-4 h-4 text-[#C87A3B]" />
                Rang mộc mẻ nhỏ Probat
              </span>
              <span aria-hidden="true" className="text-[#C87A3B]">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Coffee className="w-4 h-4 text-[#C87A3B]" />
                1.650m Độ cao Cầu Đất
              </span>
              <span aria-hidden="true" className="text-[#C87A3B]">·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#C87A3B]" />
                Bảo hành hương vị 7 ngày
              </span>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onExploreCatalog}
                className="px-6 py-3.5 bg-[#241B16] text-[#FAF8F5] text-sm font-semibold rounded-xl hover:bg-[#3D2B22] transition-colors flex items-center gap-2 cursor-pointer shadow-md group"
              >
                <span>Khám phá menu hạt rang</span>
                <ArrowRight className="w-4 h-4 text-[#E6AF76] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenTasteFinder}
                className="px-6 py-3.5 bg-[#FAF8F5] text-[#241B16] text-sm font-semibold rounded-xl border border-[#241B16]/20 hover:border-[#C87A3B] hover:text-[#C87A3B] transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#C87A3B]" />
                <span>Trắc nghiệm gu cà phê</span>
              </button>
            </div>

            {/* Quiet reassurance notice */}
            <p className="text-xs text-[#8A7568]">
              * Giao hỏa tốc trong 2 giờ tại nội thành Hà Nội & TP. Hồ Chí Minh. Miễn phí giao toàn quốc từ 300.000₫.
            </p>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#241B16]/10 aspect-[4/3] lg:aspect-[5/4] bg-[#EFE8DF]">
              <img
                src="/src/assets/images/hero_coffee_beans_pour_1793971711410.jpg"
                alt="Hạt cà phê đặc sản Trang Coffee và ly cà phê pha thủ công bốc khói"
                className="w-full h-full object-cover"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle caption overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs backdrop-blur-md bg-black/40 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Mẻ rang tươi mới trong tuần</p>
                  <p className="text-[#E0D5C9] text-[11px]">Cầu Đất Arabica & Đắk Lắk Fine Robusta</p>
                </div>
                <span className="font-mono text-[11px] text-[#E6AF76] font-medium bg-[#241B16]/80 px-2 py-1 rounded">
                  Degas 3 ngày
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
