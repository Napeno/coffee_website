import React, { useState, useEffect } from 'react';
import { BREWING_GUIDES } from '../data/coffeeProducts';
import { Play, Pause, RotateCcw, Clock, Thermometer, Scale, Coffee } from 'lucide-react';

export const BrewingGuideSection: React.FC = () => {
  const [activeGuideId, setActiveGuideId] = useState<string>('phin');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  const currentGuide = BREWING_GUIDES.find((g) => g.id === activeGuideId) || BREWING_GUIDES[0];

  useEffect(() => {
    let interval: any = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
  };

  return (
    <section id="brewing-guide" className="py-16 sm:py-20 bg-[#F5EFE6]/60 border-t border-b border-[#241B16]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#C87A3B]">
            Cẩm Nang Barista Trang Coffee
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#241B16]">
            Bí quyết pha cà phê tròn vị tại nhà
          </h2>
          <p className="text-sm text-[#58483E] leading-relaxed">
            Hạt cà phê ngon chỉ là một nửa câu chuyện. Nửa còn lại nằm ở tỉ lệ nước, nhiệt độ và thời gian thẩm thấu giọt cà phê.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-[#FAF8F5] rounded-xl border border-[#241B16]/15 shadow-xs">
            {BREWING_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => {
                  setActiveGuideId(guide.id);
                  handleResetTimer();
                }}
                className={`px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeGuideId === guide.id
                    ? 'bg-[#241B16] text-[#FAF8F5] shadow-xs'
                    : 'text-[#58483E] hover:text-[#241B16]'
                }`}
              >
                {guide.title}
              </button>
            ))}
          </div>
        </div>

        {/* Guide Content Card */}
        <div className="bg-[#FAF8F5] rounded-2xl border border-[#241B16]/10 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Specs & Interactive Timer */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[#241B16]">
                  {currentGuide.title}
                </h3>
                <p className="text-xs text-[#8A7568] mt-1">{currentGuide.sub}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-[#241B16]/8 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#8A7568]">
                    <Thermometer className="w-3.5 h-3.5 text-[#C87A3B]" />
                    <span>Nhiệt độ nước</span>
                  </div>
                  <div className="font-semibold text-[#241B16]">{currentGuide.temp}</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#241B16]/8 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#8A7568]">
                    <Scale className="w-3.5 h-3.5 text-[#C87A3B]" />
                    <span>Tỉ lệ pha</span>
                  </div>
                  <div className="font-semibold text-[#241B16]">{currentGuide.ratio}</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#241B16]/8 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#8A7568]">
                    <Clock className="w-3.5 h-3.5 text-[#C87A3B]" />
                    <span>Thời gian</span>
                  </div>
                  <div className="font-semibold text-[#241B16]">{currentGuide.time}</div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#241B16]/8 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#8A7568]">
                    <Coffee className="w-3.5 h-3.5 text-[#C87A3B]" />
                    <span>Cỡ xay bột</span>
                  </div>
                  <div className="font-semibold text-[#241B16] truncate">{currentGuide.grind}</div>
                </div>
              </div>

              {/* Interactive Brewing Timer Widget */}
              <div className="bg-[#241B16] text-[#FAF8F5] p-5 rounded-2xl space-y-4">
                <div className="flex items-center justify-between text-xs text-[#E6AF76]">
                  <span className="font-semibold uppercase tracking-wider">Đồng Hồ Bấm Giờ Chiết Xuất</span>
                  <span className="font-mono text-[11px] opacity-80">Live Timer</span>
                </div>

                <div className="text-center py-2">
                  <div className="text-4xl sm:text-5xl font-mono font-bold tracking-widest text-[#FAF8F5]">
                    {formatTimer(timerSeconds)}
                  </div>
                  <p className="text-[11px] text-[#A8988D] mt-1">
                    {timerSeconds === 0
                      ? 'Bấm bắt đầu khi rót dòng nước đầu tiên vào bột'
                      : timerSeconds < 120
                      ? 'Giai đoạn Ủ (Bloom): giải phóng hương hoa & khí CO2'
                      : 'Giai đoạn Chiết xuất: dòng chảy đều đặn'}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-1">
                  <button
                    onClick={() => setTimerRunning(!timerRunning)}
                    className="px-5 py-2.5 bg-[#C87A3B] hover:bg-[#D97736] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    {timerRunning ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Tạm dừng</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Bắt đầu pha</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleResetTimer}
                    className="p-2.5 bg-white/10 hover:bg-white/20 text-[#FAF8F5] rounded-xl transition-colors cursor-pointer"
                    title="Đặt lại đồng hồ"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right: Step-by-Step Instructions */}
            <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#C87A3B]">
                Các bước thực hiện chuẩn Barista:
              </h4>

              <div className="space-y-3">
                {currentGuide.steps.map((s) => (
                  <div
                    key={s.step}
                    className="p-4 bg-white rounded-xl border border-[#241B16]/8 flex gap-4 items-start shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#EFE8DF] text-[#241B16] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      0{s.step}
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-bold text-[#241B16]">
                        {s.title}
                      </div>
                      <p className="text-xs text-[#58483E] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#EFE8DF]/40 rounded-xl border border-[#241B16]/5 text-xs text-[#745F52]">
                <strong className="text-[#241B16]">Mẹo nhỏ từ Trang:</strong> Nếu cà phê chảy quá nhanh (&lt; 2 phút), hãy tăng độ mịn của bột hoặc nén chặt hơn một chút. Nếu tắc giọt, bột đang bị xay quá mịn.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
