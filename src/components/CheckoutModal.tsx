import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types/coffee';
import { X, CheckCircle2, ShieldCheck, QrCode, Banknote, CreditCard, Copy, Check, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountAmount: number;
  discountCode: string;
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountAmount,
  discountCode,
  onOrderSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Hà Nội');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'momo'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= 300000;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : 30000);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: OrderDetails = {
        orderId: `TC-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toLocaleDateString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        customerName: name,
        phone,
        address,
        city,
        note,
        paymentMethod,
        items: [...items],
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        total,
      };
      setCompletedOrder(newOrder);
      setIsSubmitting(false);
      onOrderSuccess();
    }, 800);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF8F5] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#241B16]/10 overflow-hidden relative my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 z-10 p-2 text-[#58483E] hover:text-[#241B16] rounded-full hover:bg-[#EFE8DF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!completedOrder ? (
          /* Form Mode */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#C87A3B] mb-1">
                Hoàn Tất Đặt Hàng
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#241B16]">
                Thông tin giao nhận cà phê
              </h3>
              <p className="text-xs text-[#8A7568]">
                Trang Coffee sẽ liên hệ xác nhận và tiến hành đóng gói mẻ rang tươi mới trong vòng 2 giờ.
              </p>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#241B16] block mb-1">
                    Họ và tên người nhận <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#241B16]/15 rounded-xl focus:outline-none focus:border-[#C87A3B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#241B16] block mb-1">
                    Số điện thoại liên hệ <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#241B16]/15 rounded-xl focus:outline-none focus:border-[#C87A3B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#241B16] block mb-1">
                    Địa chỉ giao hàng (Số nhà, đường, phường) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Phố Huế, P. Ngô Thì Nhậm"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#241B16]/15 rounded-xl focus:outline-none focus:border-[#C87A3B]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#241B16] block mb-1">
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-[#241B16]/15 rounded-xl focus:outline-none focus:border-[#C87A3B]"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="Lâm Đồng">Lâm Đồng (Đà Lạt)</option>
                    <option value="Đắk Lắk">Đắk Lắk (Buôn Ma Thuột)</option>
                    <option value="Tỉnh khác">Tỉnh / Thành khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#241B16] block mb-1">
                  Ghi chú cho xưởng rang / shipper (tùy chọn)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ví dụ: Giao giờ hành chính, xay bột thật mịn để pha phin..."
                  className="w-full px-3.5 py-2 text-xs bg-white border border-[#241B16]/15 rounded-xl focus:outline-none focus:border-[#C87A3B]"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-semibold text-[#241B16] block">
                Phương thức thanh toán:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[#241B16] bg-[#EFE8DF] font-semibold text-[#241B16]'
                      : 'border-[#241B16]/15 bg-white text-[#58483E]'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-[#C87A3B] mb-2" />
                  <div className="text-xs font-bold text-[#241B16]">COD tiền mặt</div>
                  <div className="text-[11px] text-[#8A7568]">Thanh toán khi nhận hàng</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('vietqr')}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'vietqr'
                      ? 'border-[#241B16] bg-[#EFE8DF] font-semibold text-[#241B16]'
                      : 'border-[#241B16]/15 bg-white text-[#58483E]'
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#C87A3B] mb-2" />
                  <div className="text-xs font-bold text-[#241B16]">Chuyển khoản VietQR</div>
                  <div className="text-[11px] text-[#8A7568]">Quét mã QR ngân hàng 24/7</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    paymentMethod === 'momo'
                      ? 'border-[#241B16] bg-[#EFE8DF] font-semibold text-[#241B16]'
                      : 'border-[#241B16]/15 bg-white text-[#58483E]'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#C87A3B] mb-2" />
                  <div className="text-xs font-bold text-[#241B16]">Ví MoMo</div>
                  <div className="text-[11px] text-[#8A7568]">Thanh toán một chạm</div>
                </button>
              </div>

              {/* VietQR Instructions if selected */}
              {paymentMethod === 'vietqr' && (
                <div className="p-4 bg-white rounded-xl border border-[#241B16]/15 flex flex-col sm:flex-row items-center gap-4 text-xs">
                  <div className="w-28 h-28 bg-[#FAF8F5] p-2 rounded-lg border border-[#241B16]/10 flex flex-col items-center justify-center shrink-0">
                    <QrCode className="w-16 h-16 text-[#241B16]" />
                    <span className="text-[9px] font-mono text-[#8A7568] mt-1">VietQR Napas</span>
                  </div>
                  <div className="space-y-1 text-[#58483E] flex-1">
                    <p className="font-semibold text-[#241B16]">Ngân hàng Quân Đội (MB Bank)</p>
                    <p>Số tài khoản: <strong className="font-mono text-[#241B16]">0987654321</strong></p>
                    <p>Chủ tài khoản: <strong className="text-[#241B16]">TRANG COFFEE ROASTERS</strong></p>
                    <p className="text-[11px] text-[#8A7568]">Cú pháp: <span className="font-mono bg-[#FAF8F5] px-1 rounded">TRANG [Số ĐT của bạn]</span></p>
                    <button
                      type="button"
                      onClick={() => handleCopy('0987654321')}
                      className="text-[#C87A3B] hover:underline flex items-center gap-1 text-[11px] pt-1 cursor-pointer font-medium"
                    >
                      {copiedAccount ? <Check className="w-3 h-3 text-emerald-700" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedAccount ? 'Đã sao chép STK!' : 'Sao chép số tài khoản'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Items Preview */}
            <div className="bg-[#F5EFE6] p-4 rounded-xl space-y-2 text-xs">
              <div className="font-semibold text-[#241B16]">Tóm tắt đơn hàng ({items.length} mặt hàng):</div>
              <div className="divide-y divide-[#241B16]/8 max-h-32 overflow-y-auto pr-1">
                {items.map((i) => (
                  <div key={i.cartId} className="py-1.5 flex justify-between items-center text-[#58483E]">
                    <span className="truncate max-w-[240px]">
                      {i.quantity}x {i.product.name} ({i.selectedWeight.label})
                    </span>
                    <span className="font-mono tabular-nums text-[#241B16]">
                      {formatPrice(i.itemPrice * i.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#241B16]/10 flex justify-between text-sm font-bold text-[#241B16]">
                <span>Tổng cộng cần thanh toán:</span>
                <span className="font-mono text-base text-[#C87A3B] tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#241B16] hover:bg-[#C87A3B] text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Đang tạo đơn hàng...</span>
                ) : (
                  <>
                    <span>Xác nhận đặt hàng ngay ({formatPrice(total)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
              <div className="text-center mt-2 flex items-center justify-center gap-2 text-[11px] text-[#8A7568]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Cam kết bảo mật thông tin · Kiểm tra hàng trước khi thanh toán</span>
              </div>
            </div>

          </form>
        ) : (
          /* Order Confirmation Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Đặt Hàng Thành Công!
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#241B16]">
                Cảm ơn bạn, {completedOrder.customerName}!
              </h3>
              <p className="text-xs sm:text-sm text-[#58483E] max-w-md mx-auto">
                Mã đơn hàng <strong className="font-mono text-[#241B16]">{completedOrder.orderId}</strong> đã được ghi nhận vào hệ thống rang mộc Trang Coffee.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="bg-[#F5EFE6] p-5 rounded-2xl text-left space-y-3 text-xs border border-[#241B16]/10">
              <div className="flex justify-between border-b border-[#241B16]/10 pb-2 text-[#745F52]">
                <span>Thời gian đặt: {completedOrder.createdAt}</span>
                <span className="font-semibold text-emerald-800">Đang chuẩn bị hàng</span>
              </div>

              <div className="space-y-1">
                <p className="text-[#58483E]">
                  Người nhận: <strong className="text-[#241B16]">{completedOrder.customerName}</strong> ({completedOrder.phone})
                </p>
                <p className="text-[#58483E]">
                  Địa chỉ giao: <strong className="text-[#241B16]">{completedOrder.address}, {completedOrder.city}</strong>
                </p>
                <p className="text-[#58483E]">
                  Hình thức thanh toán: <strong className="text-[#241B16] uppercase">{completedOrder.paymentMethod}</strong>
                </p>
              </div>

              {/* Items List */}
              <div className="border-t border-[#241B16]/10 pt-2 space-y-1">
                {completedOrder.items.map((it) => (
                  <div key={it.cartId} className="flex justify-between text-[#58483E]">
                    <span>{it.quantity}x {it.product.name} ({it.selectedWeight.label} · {it.selectedGrind})</span>
                    <span className="font-mono tabular-nums">{formatPrice(it.itemPrice * it.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#241B16]/10 pt-2 flex justify-between font-bold text-sm text-[#241B16]">
                <span>Tổng thanh toán:</span>
                <span className="font-mono text-base text-[#C87A3B]">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            {/* Post-order trust reassurance */}
            <p className="text-xs text-[#8A7568]">
              Nhân viên Trang Coffee sẽ gửi SMS kèm mã vận đơn bưu điện khi mẻ cà phê được giao cho đơn vị chuyển phát.
            </p>

            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#241B16] text-white text-xs font-semibold rounded-xl hover:bg-[#3D2B22] transition-colors cursor-pointer"
            >
              Tiếp tục dạo xem cửa hàng
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
