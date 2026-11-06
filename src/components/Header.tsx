import React from 'react';
import { ShoppingBag, Search, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenTasteFinder: () => void;
  onSearchClick: () => void;
  activeCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenTasteFinder,
  onSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#241B16]/10 transition-colors">
      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a 
          href="#" 
          className="group flex items-baseline gap-1.5 text-2xl font-serif font-bold tracking-tight text-[#241B16] whitespace-nowrap shrink-0"
        >
          <span>Trang</span>
          <span className="font-sans text-xs uppercase tracking-widest text-[#C87A3B] font-semibold">Coffee</span>
        </a>

        {/* Zone 2: 4-5 Clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#58483E]">
          <a 
            href="#catalog" 
            className="hover:text-[#C87A3B] transition-colors whitespace-nowrap shrink-0"
          >
            Hạt Đặc Sản
          </a>
          <a 
            href="#catalog" 
            className="hover:text-[#C87A3B] transition-colors whitespace-nowrap shrink-0"
          >
            Phin & Túi Lọc
          </a>
          <a 
            href="#brewing-guide" 
            className="hover:text-[#C87A3B] transition-colors whitespace-nowrap shrink-0"
          >
            Bí Quyết Pha Chế
          </a>
          <a 
            href="#farm-story" 
            className="hover:text-[#C87A3B] transition-colors whitespace-nowrap shrink-0"
          >
            Nông Trại & Rang Mộc
          </a>
          <button
            onClick={onOpenTasteFinder}
            className="flex items-center gap-1.5 text-[#C87A3B] hover:text-[#934E1A] transition-colors font-semibold whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tìm Gu Cà Phê</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onSearchClick}
            aria-label="Tìm kiếm sản phẩm"
            className="p-2 text-[#58483E] hover:text-[#241B16] hover:bg-[#EFE8DF] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            aria-label="Giỏ hàng"
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-[#241B16] rounded-full hover:bg-[#3D2B22] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-[#E6AF76]" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            <span className="bg-[#C87A3B] text-white text-[11px] font-mono px-1.5 py-0.2 rounded-full min-w-5 text-center">
              {cartItemCount}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở menu di động"
            className="md:hidden p-2 text-[#241B16] hover:bg-[#EFE8DF] rounded-lg transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#241B16]/10 bg-[#FAF8F5] px-6 py-5 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#42332A]">
            <a 
              href="#catalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C87A3B] transition-colors"
            >
              Hạt Cà Phê Đặc Sản
            </a>
            <a 
              href="#catalog" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C87A3B] transition-colors"
            >
              Cà Phê Phin & Drip Bag
            </a>
            <a 
              href="#brewing-guide" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C87A3B] transition-colors"
            >
              Cẩm Nang Pha Chuẩn Vị
            </a>
            <a 
              href="#farm-story" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#C87A3B] transition-colors"
            >
              Nông Trại Cầu Đất & Buôn Ma Thuột
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTasteFinder();
              }}
              className="flex items-center gap-2 py-2 text-[#C87A3B] font-semibold text-left cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gợi ý gu cà phê theo sở thích</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
