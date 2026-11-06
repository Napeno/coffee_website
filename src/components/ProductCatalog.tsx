import React, { useState, useMemo } from 'react';
import { CoffeeProduct, CoffeeCategory, RoastLevel } from '../types/coffee';
import { Search, SlidersHorizontal, Plus, Star, Check } from 'lucide-react';

interface ProductCatalogProps {
  products: CoffeeProduct[];
  onSelectProduct: (product: CoffeeProduct) => void;
  onQuickAddToCart: (product: CoffeeProduct) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onSelectProduct,
  onQuickAddToCart,
  searchQuery,
  setSearchQuery,
}) => {
  const [activeCategory, setActiveCategory] = useState<CoffeeCategory>('all');
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories: { key: CoffeeCategory; label: string }[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'beans', label: 'Hạt Nguyên Bản' },
    { key: 'phin', label: 'Phin & Phối Trộn' },
    { key: 'drip', label: 'Túi Lọc Drip' },
    { key: 'gear', label: 'Dụng Cụ Pha' },
  ];

  const roastLevels: { key: string; label: string }[] = [
    { key: 'all', label: 'Mọi mức rang' },
    { key: 'Light', label: 'Rang Nhẹ (Light)' },
    { key: 'Medium', label: 'Rang Vừa (Medium)' },
    { key: 'Medium-Dark', label: 'Rang Nâu (Medium-Dark)' },
    { key: 'Dark', label: 'Rang Đậm (Dark)' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Roast filter
      if (selectedRoast !== 'all' && item.roastLevel !== selectedRoast) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesOrigin = item.origin.toLowerCase().includes(query);
        const matchesNotes = item.tastingNotes.some((n) => n.toLowerCase().includes(query));
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesOrigin && !matchesNotes && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [products, activeCategory, selectedRoast, searchQuery, sortBy]);

  const handleQuickAdd = (product: CoffeeProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAddToCart(product);
    setAddedAnimationId(product.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  return (
    <section id="catalog" className="py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#241B16]/10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C87A3B] mb-2">
              Bộ Sưu Tập Cà Phê Mới Nhất
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241B16]">
              Chọn hương vị đánh thức ngày mới
            </h2>
            <p className="mt-2 text-sm text-[#58483E] max-w-xl">
              Mỗi mẻ cà phê được Trang Coffee rang mới trong tuần và đóng gói van 1 chiều để lưu giữ tối đa hợp chất hương thơm tự nhiên.
            </p>
          </div>

          {/* Quick Search and Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8A7568] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm hương vị (hoa nhài, socola, phin...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#241B16]/15 rounded-lg focus:outline-none focus:border-[#C87A3B] text-[#241B16] w-full sm:w-64 placeholder:text-[#8A7568]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A7568] hover:text-[#241B16]"
                >
                  Xóa
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                aria-label="Sắp xếp sản phẩm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs sm:text-sm bg-[#FAF8F5] border border-[#241B16]/15 rounded-lg px-3 py-2 text-[#241B16] focus:outline-none focus:border-[#C87A3B] cursor-pointer"
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-[#241B16]/10">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.key
                    ? 'bg-[#241B16] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FAF8F5] text-[#58483E] hover:bg-[#EFE8DF] border border-[#241B16]/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Roast Selector (for beans & phin) */}
          <div className="flex items-center gap-2 text-xs text-[#58483E] overflow-x-auto">
            <span className="shrink-0 flex items-center gap-1 font-semibold text-[#8A7568]">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Mức rang:</span>
            </span>
            <div className="flex items-center gap-1">
              {roastLevels.map((roast) => (
                <button
                  key={roast.key}
                  onClick={() => setSelectedRoast(roast.key)}
                  className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                    selectedRoast === roast.key
                      ? 'bg-[#EFE8DF] text-[#241B16] font-semibold border border-[#241B16]/20'
                      : 'text-[#745F52] hover:text-[#241B16]'
                  }`}
                >
                  {roast.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-base font-serif text-[#241B16]">
              Không tìm thấy sản phẩm cà phê phù hợp với tìm kiếm của bạn.
            </p>
            <p className="text-xs text-[#8A7568]">
              Thử tìm kiếm với từ khóa khác như "Arabica", "Robusta", "Phin", hoặc chọn "Tất cả".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setSelectedRoast('all');
              }}
              className="px-4 py-2 text-xs font-semibold bg-[#241B16] text-white rounded-lg hover:bg-[#3D2B22] transition-colors cursor-pointer"
            >
              Xem lại tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {filteredProducts.map((product) => {
              const isAdded = addedAnimationId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group flex flex-col bg-[#FAF8F5] rounded-2xl border border-[#241B16]/10 hover:border-[#241B16]/30 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
                >
                  {/* Product Image Slot (65% of visual lead) */}
                  <div className="relative aspect-[4/3] bg-[#EFE8DF] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle text badge if present */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-[#241B16]/85 backdrop-blur-xs text-[#FAF8F5] text-[11px] font-medium px-2.5 py-1 rounded">
                        {product.badge}
                      </div>
                    )}

                    {/* Roast Indicator */}
                    <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#241B16] text-[11px] font-mono px-2 py-0.5 rounded border border-[#241B16]/10">
                      {product.roastLevel}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Unboxed metadata: Category & Origin */}
                      <div className="flex items-center gap-1.5 text-xs text-[#745F52]">
                        <span>{product.origin.split(',')[0]}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.altitude.includes('N/A') ? 'Chính hãng' : product.altitude.split(' ')[0]}</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-lg font-serif font-bold text-[#241B16] group-hover:text-[#C87A3B] transition-colors leading-snug">
                        {product.name}
                      </h3>

                      {/* Tasting Notes (unboxed text) */}
                      <div className="text-xs text-[#58483E] line-clamp-1 italic">
                        {product.tastingNotes.join(' · ')}
                      </div>

                      {/* Snippet Description */}
                      <p className="text-xs text-[#745F52] line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Footer: Rating, Price & Actions */}
                    <div className="pt-3 border-t border-[#241B16]/8 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1 text-[11px] text-[#8A7568] mb-0.5">
                          <Star className="w-3.5 h-3.5 fill-[#D97736] text-[#D97736]" />
                          <span className="font-semibold text-[#241B16]">{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-bold font-mono text-[#241B16] tabular-nums">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#A8988D] line-through font-mono tabular-nums">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add Button */}
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                          isAdded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#241B16] text-[#FAF8F5] hover:bg-[#C87A3B]'
                        }`}
                        title="Thêm vào giỏ hàng"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Đã thêm</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Thêm</span>
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
