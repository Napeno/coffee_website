import React, { useState } from 'react';
import { CartItem } from '../types/coffee';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onProceedToCheckout: (appliedDiscount: number, discountCode: string) => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreProducts,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [discountMsg, setDiscountMsg] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 300000;

  const subtotal = items.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD && items.length > 0;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : 30000);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'TRANG10') {
      setDiscountPercent(10);
      setDiscountMsg({ text: 'Áp dụng mã TRANG10 thành công: Giảm 10%!' });
    } else if (code === 'FREESHIP') {
      setDiscountPercent(0);
      setDiscountMsg({ text: 'Mã miễn phí vận chuyển đã kích hoạt!' });
    } else {
      setDiscountMsg({ text: 'Mã giảm giá không hợp lệ. Thử "TRANG10" để giảm 10% nhé!', error: true });
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#241B16]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C87A3B]" />
            <h3 className="font-serif font-bold text-lg text-[#241B16]">
              Giỏ Hàng Của Bạn
            </h3>
            <span className="text-xs font-mono bg-[#EFE8DF] px-2 py-0.5 rounded-full text-[#58483E]">
              {items.reduce((acc, i) => acc + i.quantity, 0)} món
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng giỏ hàng"
            className="p-2 text-[#58483E] hover:text-[#241B16] rounded-full hover:bg-[#EFE8DF] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        {items.length > 0 && (
          <div className="bg-[#F5EFE6] px-5 py-3 border-b border-[#241B16]/8 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[#58483E]">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-[#C87A3B]" />
                {isFreeShipping ? (
                  <span className="text-emerald-700 font-semibold">Đã đạt Miễn phí vận chuyển toàn quốc!</span>
                ) : (
                  <span>Thêm <strong className="text-[#241B16] font-mono">{formatPrice(remainingForFreeShip)}</strong> để được Miễn phí ship</span>
                )}
              </span>
              <span className="font-mono text-[11px]">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#E5DCD0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#C87A3B] transition-all duration-300 rounded-full" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>
          </div>
        )}

        {/* Itemized List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#EFE8DF] flex items-center justify-center text-[#8A7568]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <p className="font-serif font-bold text-lg text-[#241B16]">
                  Giỏ hàng chưa có sản phẩm
                </p>
                <p className="text-xs text-[#8A7568] max-w-xs">
                  Hãy thêm những mẻ hạt rang thơm mới để Trang đóng gói và giao đến bạn.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="px-5 py-2.5 bg-[#241B16] text-[#FAF8F5] text-xs font-semibold rounded-xl hover:bg-[#3D2B22] transition-colors cursor-pointer"
              >
                Khám phá menu cà phê
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartId}
                className="flex gap-3 bg-white p-3.5 rounded-xl border border-[#241B16]/10 shadow-2xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 object-cover rounded-lg bg-[#EFE8DF] shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif font-bold text-sm text-[#241B16] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartId)}
                        aria-label="Xóa món"
                        className="text-[#A8988D] hover:text-red-700 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#8A7568] flex items-center gap-1.5">
                      <span>{item.selectedWeight.label}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{item.selectedGrind}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#241B16]/20 rounded-md bg-[#FAF8F5]">
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, -1)}
                        className="px-2 py-0.5 text-xs text-[#58483E] hover:bg-[#EFE8DF] transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-bold text-[#241B16]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartId, 1)}
                        className="px-2 py-0.5 text-xs text-[#58483E] hover:bg-[#EFE8DF] transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-xs font-mono font-bold text-[#241B16] tabular-nums">
                      {formatPrice(item.itemPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout & Voucher Area */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#241B16]/10 bg-white space-y-4">
            
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-[#8A7568] absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Mã ưu đãi (thử: TRANG10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-[#FAF8F5] border border-[#241B16]/15 rounded-lg focus:outline-none focus:border-[#C87A3B] uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#FAF8F5] border border-[#241B16]/20 text-xs font-semibold text-[#241B16] hover:bg-[#EFE8DF] rounded-lg transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>
              {discountMsg && (
                <p className={`text-[11px] ${discountMsg.error ? 'text-red-600' : 'text-emerald-700'}`}>
                  {discountMsg.text}
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#58483E] border-t border-[#241B16]/8 pt-3">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-mono tabular-nums">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Giảm giá ({discountPercent}%)</span>
                  <span className="font-mono tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span className="font-mono tabular-nums">
                  {shippingFee === 0 ? <strong className="text-emerald-700 font-sans">Miễn phí</strong> : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#241B16] pt-1.5 border-t border-[#241B16]/10">
                <span>Tổng thanh toán</span>
                <span className="font-mono text-base text-[#C87A3B] tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, promoCode)}
              className="w-full py-3.5 bg-[#241B16] hover:bg-[#C87A3B] text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Tiến hành đặt hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
