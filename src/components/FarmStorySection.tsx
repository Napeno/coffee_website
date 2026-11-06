import React from 'react';
import { Leaf, Award, HeartHandshake } from 'lucide-react';

export const FarmStorySection: React.FC = () => {
  return (
    <section id="farm-story" className="py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Asset */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#241B16]/10 aspect-[16/10] bg-[#EFE8DF]">
              <img
                src="/src/assets/images/craft_roasting_story_1793971713346.jpg"
                alt="Nghệ nhân Trang Coffee kiểm tra mẻ hạt cà phê vừa rang mộc từ máy Probat"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs backdrop-blur-md bg-black/40 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">Nghệ nhân rang mộc Trang Coffee</p>
                  <p className="text-[#E0D5C9] text-[11px]">Xưởng rang thủ công mẻ nhỏ tại Lâm Đồng</p>
                </div>
                <span className="font-mono text-[11px] text-[#E6AF76]">
                  Est. 2019
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C87A3B]">
              Câu Chuyện Thương Hiệu
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241B16] leading-tight text-balance">
              Tôn vinh giá trị thực của hạt cà phê Việt Nam
            </h2>

            <p className="text-sm sm:text-base text-[#58483E] leading-relaxed">
              Việt Nam là cường quốc cà phê lớn thứ 2 thế giới, nhưng trong nhiều năm, người tiêu dùng quen với cà phê tẩm bắp, đậu nành và hương liệu gắt đắng. Trang Coffee ra đời với một khát vọng giản dị: mang ly cà phê mộc nguyên bản, tinh sạch và đa tầng hương vị đến tay từng người Việt.
            </p>

            {/* 3 Core Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex gap-3.5 items-start">
                <div className="p-2 rounded-lg bg-[#EFE8DF] text-[#C87A3B] shrink-0 mt-0.5">
                  <Leaf className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#241B16]">
                    Thu hái quả chín mọng trên 98%
                  </h4>
                  <p className="text-xs text-[#58483E] mt-0.5 leading-relaxed">
                    Người nông dân hái tỉ mẩn từng trái cà phê chín mọng trên cây, tuyệt đối không tuốt cành để đảm bảo lượng đường tự nhiên cao nhất trước khi sơ chế.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2 rounded-lg bg-[#EFE8DF] text-[#C87A3B] shrink-0 mt-0.5">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#241B16]">
                    Thương mại trực tiếp (Direct Trade)
                  </h4>
                  <p className="text-xs text-[#58483E] mt-0.5 leading-relaxed">
                    Chúng tôi thu mua trực tiếp từ các hợp tác xã tại Cầu Đất, Cư M’gar và Sơn La với mức giá cao hơn 25-35% thị trường thương mại, nâng đỡ sinh kế người bản địa.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="p-2 rounded-lg bg-[#EFE8DF] text-[#C87A3B] shrink-0 mt-0.5">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#241B16]">
                    Nghệ thuật rang mộc Probat mẻ nhỏ
                  </h4>
                  <p className="text-xs text-[#58483E] mt-0.5 leading-relaxed">
                    Mỗi mẻ rang không quá 15kg, kiểm soát nhiệt chuẩn xác từng giây bằng cảm biến để bung tỏa trọn vẹn hương vị đặc trưng của từng vùng thổ nhưỡng.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
