import React, { useState } from 'react';
import { CoffeeProduct } from '../types/coffee';
import { X, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag } from 'lucide-react';

interface TasteFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: CoffeeProduct[];
  onSelectProduct: (product: CoffeeProduct) => void;
  onQuickAddToCart: (product: CoffeeProduct) => void;
}

export const TasteFinderModal: React.FC<TasteFinderModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onQuickAddToCart,
}) => {
  const [step, setStep] = useState<number>(1);
  const [method, setMethod] = useState<string>('');
  const [taste, setTaste] = useState<string>('');
  const [habit, setHabit] = useState<string>('');
  const [matchedProduct, setMatchedProduct] = useState<CoffeeProduct | null>(null);
  const [matchScore, setMatchScore] = useState<number>(98);
  const [matchReason, setMatchReason] = useState<string>('');
  const [added, setAdded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && !method) return;
    if (step === 2 && !taste) return;
    if (step === 3 && !habit) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Calculate match
      calculateRecommendation();
      setStep(4);
    }
  };

  const calculateRecommendation = () => {
    let targetId = 'trang-signature-phin';
    let reason = '';
    let score = 98;

    if (method === 'coldbrew' || taste === 'fruity') {
      targetId = 'coldbrew-fruity-blend';
      reason = 'Hạt rang hương cam chanh và hoa bưởi được tối ưu cho chiết xuất ủ lạnh dịu ngọt, giải nhiệt tức thì.';
      score = 97;
    } else if (method === 'v60' || (taste === 'floral' && habit === 'black')) {
      targetId = 'cau-dat-arabica';
      reason = 'Cao độ 1.650m Cầu Đất mang lại độ chua sáng thanh tao và hương hoa nhài tinh tế, hoàn hảo nhất khi uống đen nguyên bản.';
      score = 99;
    } else if (habit === 'milk' || method === 'phin') {
      targetId = 'trang-signature-phin';
      reason = 'Công thức phối trộn 70% Fine Robusta & 30% Arabica tạo nên độ sánh đặc béo ngậy, quyện tuyệt vời với sữa đặc truyền thống.';
      score = 98;
    } else if (method === 'espresso' || taste === 'chocolate') {
      targetId = 'daklak-fine-robusta';
      reason = 'Hạt Fine Robusta Đắk Lắk cho lớp bọt crema vàng mịn như nhung, đậm đặc vị socola đen 85% và đường caramel cháy.';
      score = 96;
    } else if (method === 'dripbag') {
      targetId = 'drip-bag-collection';
      reason = 'Túi lọc phin giấy Nhật Bản tiện lợi mở ra là có ngay ly cà phê thơm phức cho ngày bận rộn mà không cần rửa dụng cụ.';
      score = 95;
    }

    const found = products.find((p) => p.id === targetId) || products[0];
    setMatchedProduct(found);
    setMatchScore(score);
    setMatchReason(reason);
  };

  const handleReset = () => {
    setStep(1);
    setMethod('');
    setTaste('');
    setHabit('');
    setMatchedProduct(null);
    setAdded(false);
  };

  const handleAdd = () => {
    if (matchedProduct) {
      onQuickAddToCart(matchedProduct);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF8F5] w-full max-w-xl rounded-2xl shadow-2xl border border-[#241B16]/10 p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 p-2 text-[#58483E] hover:text-[#241B16] rounded-full hover:bg-[#EFE8DF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step < 4 ? (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C87A3B] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trang Coffee Barista · Bước {step}/3</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#241B16]">
                Tìm hương vị sinh ra dành riêng cho bạn
              </h3>
              <p className="text-xs sm:text-sm text-[#745F52] mt-1">
                Chỉ 3 câu hỏi nhanh để chuyên gia rang mộc gợi ý mẻ cà phê khớp nhất với thói quen của bạn.
              </p>
            </div>

            {/* Step 1: Brew method */}
            {step === 1 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-[#241B16] block">
                  1. Bạn thường dùng dụng cụ nào nhất tại nhà hoặc nơi làm việc?
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'phin', label: 'Phin truyền thống nhôm/inox', sub: 'Thong thả đợi từng giọt cà phê đậm đà' },
                    { id: 'espresso', label: 'Máy pha Espresso hoặc ấm Moka', sub: 'Áp suất cao, lớp crema béo ngậy' },
                    { id: 'v60', label: 'Phễu lọc V60 / Drip giấy thủ công', sub: 'Thanh sạch, giải phóng trọn vẹn hương hoa trái' },
                    { id: 'coldbrew', label: 'Cold Brew ủ lạnh hoặc bình ngâm', sub: 'Mát lạnh ngọt dịu, ít axit dạ dày' },
                    { id: 'dripbag', label: 'Túi lọc phin giấy tiện lợi', sub: 'Nhanh gọn, không cần máy móc vệ sinh' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setMethod(opt.id)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        method === opt.id
                          ? 'border-[#241B16] bg-[#EFE8DF] font-semibold text-[#241B16]'
                          : 'border-[#241B16]/15 bg-white text-[#58483E] hover:border-[#241B16]/30'
                      }`}
                    >
                      <div>
                        <div className="text-sm text-[#241B16]">{opt.label}</div>
                        <div className="text-xs text-[#8A7568]">{opt.sub}</div>
                      </div>
                      {method === opt.id && <Check className="w-4 h-4 text-[#241B16]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Flavor note */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-[#241B16] block">
                  2. Bạn thích nốt hương vị nào bùng nổ trên đầu lưỡi?
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'chocolate', label: 'Đậm đà socola đen, hạnh nhân, caramel', sub: 'Vị đậm ấm, hậu vị đắng bùi dễ chịu' },
                    { id: 'floral', label: 'Chua thanh tao, hương hoa nhài và cam chanh', sub: 'Hương hoa cỏ Cầu Đất tinh tế, ngọt hậu như mật ong' },
                    { id: 'fruity', label: 'Trái cây chín mọng, mơ sấy, mận hậu', sub: 'Lên men tự nhiên, hương thơm bung tỏa sảng khoái' },
                    { id: 'balanced', label: 'Cân bằng dịu nhẹ, bơ hạt dẻ và vani', sub: 'Dễ uống mỗi ngày, êm ái tỉnh táo' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setTaste(opt.id)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        taste === opt.id
                          ? 'border-[#241B16] bg-[#EFE8DF] font-semibold text-[#241B16]'
                          : 'border-[#241B16]/15 bg-white text-[#58483E] hover:border-[#241B16]/30'
                      }`}
                    >
                      <div>
                        <div className="text-sm text-[#241B16]">{opt.label}</div>
                        <div className="text-xs text-[#8A7568]">{opt.sub}</div>
                      </div>
                      {taste === opt.id && <Check className="w-4 h-4 text-[#241B16]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Habit */}
            {step === 3 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-[#241B16] block">
                  3. Bạn thường uống cà phê kiểu nào?
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'black', label: 'Cà phê Đen đá / Nóng nguyên bản (không đường)', sub: 'Thưởng trọn hương vị gốc của hạt cà phê mộc' },
                    { id: 'milk', label: 'Cà phê Sữa đặc truyền thống (Nâu đá/Bạc xỉu)', sub: 'Béo ngậy ngọt ngào kinh điển kiểu Việt Nam' },
                    { id: 'latte', label: 'Pha cùng sữa tươi thanh trùng hoặc sữa yến mạch', sub: 'Nhẹ nhàng, thơm mịn kiểu cafe phương Tây' },
                    { id: 'iced', label: 'Uống lạnh cùng đá và lát cam tươi/tonic', sub: 'Sảng khoái, giải nhiệt ngày nắng nóng' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setHabit(opt.id)}
                      className={`w-full p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                        habit === opt.id
                          ? 'border-[#241B16] bg-[#EFE8DF] font-semibold text-[#241B16]'
                          : 'border-[#241B16]/15 bg-white text-[#58483E] hover:border-[#241B16]/30'
                      }`}
                    >
                      <div>
                        <div className="text-sm text-[#241B16]">{opt.label}</div>
                        <div className="text-xs text-[#8A7568]">{opt.sub}</div>
                      </div>
                      {habit === opt.id && <Check className="w-4 h-4 text-[#241B16]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-[#241B16]/10">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-[#58483E] hover:text-[#241B16] cursor-pointer"
                >
                  Quay lại
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                disabled={(step === 1 && !method) || (step === 2 && !taste) || (step === 3 && !habit)}
                className="px-6 py-2.5 bg-[#241B16] text-[#FAF8F5] text-xs font-semibold rounded-xl hover:bg-[#3D2B22] disabled:opacity-40 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{step === 3 ? 'Xem kết quả gợi ý' : 'Tiếp theo'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 4: Result Screen */
          matchedProduct && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFE8DF] text-[#C87A3B] rounded-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Độ tương thích {matchScore}% với gu của bạn</span>
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#241B16]">
                  Chúng tôi gợi ý: {matchedProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#58483E] max-w-md mx-auto">
                  {matchReason}
                </p>
              </div>

              {/* Matched Product Card */}
              <div className="bg-white border border-[#241B16]/15 rounded-xl p-4 flex gap-4 items-center">
                <img
                  src={matchedProduct.image}
                  alt={matchedProduct.name}
                  className="w-20 h-20 object-cover rounded-lg bg-[#EFE8DF] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#8A7568]">{matchedProduct.origin}</div>
                  <div className="font-serif font-bold text-[#241B16] text-base truncate">
                    {matchedProduct.name}
                  </div>
                  <div className="text-xs text-[#58483E] italic truncate">
                    {matchedProduct.tastingNotes.slice(0, 3).join(', ')}
                  </div>
                  <div className="text-sm font-mono font-bold text-[#241B16] mt-1">
                    {new Intl.NumberFormat('vi-VN').format(matchedProduct.price)}₫
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleAdd}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      added
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#241B16] text-white hover:bg-[#3D2B22]'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Đã thêm vào giỏ hàng!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Thêm ngay vào giỏ</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectProduct(matchedProduct);
                    }}
                    className="py-3 px-4 border border-[#241B16] text-[#241B16] hover:bg-[#EFE8DF] rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Xem chi tiết hạt này</span>
                  </button>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="text-xs text-[#8A7568] hover:text-[#241B16] flex items-center justify-center gap-1 mx-auto cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại trắc nghiệm</span>
                  </button>
                </div>
              </div>

            </div>
          )
        )}

      </div>
    </div>
  );
};
