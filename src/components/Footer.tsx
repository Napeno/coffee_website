import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1C1410] text-[#E0D5C9] pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="flex items-baseline gap-1.5 text-2xl font-serif font-bold text-white">
              <span>Trang</span>
              <span className="font-sans text-xs uppercase tracking-widest text-[#E6AF76] font-semibold">Coffee</span>
            </a>
            <p className="text-xs sm:text-sm text-[#A8988D] leading-relaxed max-w-sm">
              Trang Coffee mang đến ly cà phê mộc nguyên bản, tinh sạch từ những nông trại độ cao trên 1.600m. Rang thủ công mẻ nhỏ bằng máy Probat, bảo tồn trọn vẹn hương vị tự nhiên của đất trời cao nguyên Việt Nam.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#E6AF76]">
              <span>Direct Trade</span>
              <span aria-hidden="true">·</span>
              <span>100% Ripe Harvest</span>
              <span aria-hidden="true">·</span>
              <span>Fresh Roast</span>
            </div>
          </div>

          {/* Contact & Roastery Addresses (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-xs text-[#A8988D]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Hệ Thống & Xưởng Rang
            </h4>
            <div className="space-y-2.5 pt-1">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#E6AF76] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Xưởng Rang & Nông Trại:</strong>
                  Thôn Trường An, Xã Xuân Trường, Cầu Đất, TP. Đà Lạt, Lâm Đồng
                </span>
              </div>
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#E6AF76] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">Cửa Hàng Trưng Bày & Thử Nếm:</strong>
                  42 Phố Lý Thường Kiệt, Hoàn Kiếm, Hà Nội
                </span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-[#E6AF76] shrink-0" />
                <span>Hotline đặt hàng & tư vấn: <strong className="text-white font-mono">0982.168.234</strong></span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-[#E6AF76] shrink-0" />
                <span>Email hỗ trợ: <strong className="text-white">chamsoc@trangcoffee.vn</strong></span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Clock className="w-4 h-4 text-[#E6AF76] shrink-0" />
                <span>Mở cửa: 07:30 - 21:00 hàng ngày</span>
              </div>
            </div>
          </div>

          {/* Newsletter Box (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Nhận Ưu Đãi & Cẩm Nang Pha
            </h4>
            <p className="text-xs text-[#A8988D] leading-relaxed">
              Đăng ký nhận mã giảm 10% cho đơn hàng đầu tiên cùng bản tin cẩm nang pha chế cà phê mỗi tuần từ Barista.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 rounded-xl text-xs text-[#E6AF76] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Cảm ơn bạn! Mã giảm giá TRANG10 đã sẵn sàng sử dụng.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Nhập email của bạn..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 text-xs bg-white/10 border border-white/15 rounded-xl text-white placeholder:text-[#8A7568] focus:outline-none focus:border-[#E6AF76]"
                  />
                  <button
                    type="submit"
                    aria-label="Đăng ký nhận tin"
                    className="px-4 py-2.5 bg-[#C87A3B] hover:bg-[#D97736] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[11px] text-[#8A7568] block">
                  Không spam. Bạn có thể hủy đăng ký bất cứ lúc nào.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7568]">
          <p>© 2026 Trang Coffee Roasters. Bảo lưu mọi quyền.</p>
          <div className="flex items-center gap-6">
            <a href="#catalog" className="hover:text-white transition-colors">Menu Hạt</a>
            <a href="#brewing-guide" className="hover:text-white transition-colors">Cẩm Nang Pha</a>
            <a href="#farm-story" className="hover:text-white transition-colors">Về Trang Coffee</a>
            <span className="text-[#A8988D]">Giấy chứng nhận VSATTP số 28/2023/NNPTNT-LĐ</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
