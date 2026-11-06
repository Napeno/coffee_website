import React, { useState } from 'react';
import { CoffeeProduct, WeightOption, GrindOption } from '../types/coffee';
import { X, Star, Check, ShoppingBag, ShieldCheck, Flame, MapPin, Gauge } from 'lucide-react';

interface ProductDetailModalProps {
  product: CoffeeProduct | null;
  onClose: () => void;
  onAddToCart: (product: CoffeeProduct, weight: WeightOption, grind: GrindOption, quantity: number) => void;
  onBuyNow: (product: CoffeeProduct, weight: WeightOption, grind: GrindOption, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(product.weights[0]);
  const [selectedGrind, setSelectedGrind] = useState<GrindOption>(product.grindOptions[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const calculatedUnitPrice = Math.round(product.price * selectedWeight.multiplier);
  const totalPrice = calculatedUnitPrice * quantity;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedWeight, selectedGrind, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedWeight, selectedGrind, quantity);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl border border-[#241B16]/10 overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng chi tiết"
          className="absolute top-4 right-4 z-10 p-2 text-[#58483E] hover:text-[#241B16] bg-[#FAF8F5]/80 hover:bg-[#EFE8DF] rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image & Flavor Profile */}
          <div className="md:col-span-5 bg-[#F5EFE6] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#241B16]/10">
            <div className="space-y-5">
              <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#241B16] text-white text-[11px] font-medium px-2.5 py-1 rounded">
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 text-[#241B16] text-[11px] font-mono px-2 py-0.5 rounded border border-[#241B16]/10">
                  {product.roastLevel} Roast
                </div>
              </div>

              {/* Flavor Profile Sliders */}
              <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-xl border border-[#241B16]/8">
                <div className="text-xs font-semibold uppercase text-[#58483E] tracking-wider flex items-center gap-1.5">
                  <Gauge className="w-3.5 h-3.5 text-[#C87A3B]" />
                  <span>Biểu Đồ Vị Giác (Flavor Profile)</span>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[#58483E] mb-1">
                      <span>Độ chua sáng (Acidity)</span>
                      <span className="font-mono">{product.flavorProfile.acidity}/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E5DCD0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C87A3B] rounded-full" style={{ width: `${(product.flavorProfile.acidity / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#58483E] mb-1">
                      <span>Độ ngọt hậu (Sweetness)</span>
                      <span className="font-mono">{product.flavorProfile.sweetness}/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E5DCD0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C87A3B] rounded-full" style={{ width: `${(product.flavorProfile.sweetness / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#58483E] mb-1">
                      <span>Thể chất sánh đậm (Body)</span>
                      <span className="font-mono">{product.flavorProfile.body}/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E5DCD0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#583C2C] rounded-full" style={{ width: `${(product.flavorProfile.body / 5) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#58483E] mb-1">
                      <span>Hương thơm nồng nàn (Aroma)</span>
                      <span className="font-mono">{product.flavorProfile.aroma}/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E5DCD0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#D97736] rounded-full" style={{ width: `${(product.flavorProfile.aroma / 5) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brewing Note */}
            <div className="mt-4 pt-4 border-t border-[#241B16]/10 text-xs text-[#745F52]">
              <span className="font-semibold text-[#241B16]">Gợi ý từ Barista:</span> {product.brewingRecommendation}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              {/* Origin unboxed metadata */}
              <div className="flex items-center gap-2 text-xs text-[#8A7568]">
                <MapPin className="w-3.5 h-3.5 text-[#C87A3B]" />
                <span>{product.origin}</span>
                <span aria-hidden="true">·</span>
                <span>{product.altitude}</span>
              </div>

              {/* Title & SubTitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#241B16]">
                  {product.name}
                </h2>
                <p className="text-xs text-[#8A7568] mt-0.5">{product.subName}</p>
              </div>

              {/* Rating & Review */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-[#D97736]">
                  <Star className="w-4 h-4 fill-[#D97736]" />
                  <span className="font-bold text-[#241B16]">{product.rating}</span>
                </div>
                <span className="text-[#8A7568]">{product.reviewCount} đánh giá từ khách hàng</span>
                <span aria-hidden="true" className="text-[#8A7568]">·</span>
                <span className="text-emerald-700 font-medium">Còn hàng tươi mới</span>
              </div>

              {/* Dynamic Price Display */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-[#241B16] tabular-nums">
                  {formatPrice(calculatedUnitPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono text-[#A8988D] line-through tabular-nums">
                    {formatPrice(Math.round(product.originalPrice * selectedWeight.multiplier))}
                  </span>
                )}
                <span className="text-xs text-[#8A7568]">/ gói {selectedWeight.label}</span>
              </div>

              {/* Tasting Notes */}
              <div className="bg-[#EFE8DF]/60 p-3 rounded-lg text-xs space-y-1">
                <span className="font-semibold text-[#241B16]">Tầng hương nếm thử (Tasting notes):</span>
                <div className="text-[#58483E] italic">
                  {product.tastingNotes.join(' · ')}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#58483E] leading-relaxed">
                {product.description}
              </p>

              {/* Technical specs strip */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF8F5] border border-[#241B16]/10 p-3 rounded-xl">
                <div>
                  <span className="text-[#8A7568] block">Phương pháp sơ chế:</span>
                  <span className="font-medium text-[#241B16]">{product.process}</span>
                </div>
                <div>
                  <span className="text-[#8A7568] block">Giống cây trồng:</span>
                  <span className="font-medium text-[#241B16]">{product.varietal}</span>
                </div>
              </div>

              {/* Weight Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-[#241B16] block">
                  Quy cách đóng gói:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w.label}
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3.5 py-2 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                        selectedWeight.label === w.label
                          ? 'bg-[#241B16] text-[#FAF8F5] shadow-xs'
                          : 'bg-[#FAF8F5] text-[#58483E] border border-[#241B16]/15 hover:border-[#241B16]/40'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grind Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#241B16] block">
                  Độ xay hạt theo dụng cụ:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.grindOptions.map((grind) => (
                    <button
                      key={grind}
                      onClick={() => setSelectedGrind(grind)}
                      className={`px-3 py-2 text-xs rounded-lg text-left transition-colors cursor-pointer ${
                        selectedGrind === grind
                          ? 'bg-[#EFE8DF] text-[#241B16] font-semibold border border-[#241B16]/30'
                          : 'bg-[#FAF8F5] text-[#58483E] border border-[#241B16]/10 hover:border-[#241B16]/20'
                      }`}
                    >
                      {grind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 pt-2">
                <label className="text-xs font-semibold text-[#241B16]">
                  Số lượng:
                </label>
                <div className="flex items-center border border-[#241B16]/20 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-[#241B16] hover:bg-[#EFE8DF] transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-xs font-mono font-bold text-[#241B16]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-[#241B16] hover:bg-[#EFE8DF] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs text-[#8A7568]">
                  Tổng tiền: <span className="font-mono font-bold text-[#241B16]">{formatPrice(totalPrice)}</span>
                </div>
              </div>

            </div>

            {/* Sticky/Stable Purchase Actions */}
            <div className="pt-4 border-t border-[#241B16]/10 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                    addedSuccess
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#FAF8F5] border border-[#241B16] text-[#241B16] hover:bg-[#EFE8DF]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đã thêm vào giỏ!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Thêm vào giỏ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 bg-[#241B16] hover:bg-[#C87A3B] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Mua ngay ({formatPrice(totalPrice)})</span>
                </button>
              </div>

              {/* Guarantee */}
              <div className="flex items-center justify-center gap-3 text-[11px] text-[#8A7568]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Đổi trả 7 ngày
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#C87A3B]" />
                  Van thoát khí một chiều Thụy Sĩ
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
