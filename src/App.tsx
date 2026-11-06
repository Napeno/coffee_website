import React, { useState, useEffect } from 'react';
import { COFFEE_PRODUCTS } from './data/coffeeProducts';
import { CoffeeProduct, CartItem, WeightOption, GrindOption } from './types/coffee';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TasteFinderModal } from './components/TasteFinderModal';
import { BrewingGuideSection } from './components/BrewingGuideSection';
import { FarmStorySection } from './components/FarmStorySection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [products] = useState<CoffeeProduct[]>(COFFEE_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('trang_coffee_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<CoffeeProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTasteFinderOpen, setIsTasteFinderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('trang_coffee_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (
    product: CoffeeProduct,
    selectedWeight: WeightOption,
    selectedGrind: GrindOption,
    quantity: number
  ) => {
    const itemPrice = Math.round(product.price * selectedWeight.multiplier);
    const cartId = `${product.id}-${selectedWeight.weightGrams}-${selectedGrind}`;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing) {
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          cartId,
          product,
          selectedWeight,
          selectedGrind,
          quantity,
          itemPrice,
        },
      ];
    });

    showToast(`Đã thêm ${quantity}x ${product.name} vào giỏ hàng`);
  };

  const handleQuickAddToCart = (product: CoffeeProduct) => {
    const defaultWeight = product.weights[0];
    const defaultGrind = product.grindOptions[0];
    handleAddToCart(product, defaultWeight, defaultGrind, 1);
  };

  const handleBuyNow = (
    product: CoffeeProduct,
    selectedWeight: WeightOption,
    selectedGrind: GrindOption,
    quantity: number
  ) => {
    handleAddToCart(product, selectedWeight, selectedGrind, quantity);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleProceedToCheckout = (discount: number, code: string) => {
    setAppliedDiscount(discount);
    setDiscountCode(code);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    setAppliedDiscount(0);
    setDiscountCode('');
    showToast('Đặt hàng thành công! Trang Coffee đang xử lý đơn của bạn.');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#241B16] selection:bg-[#C87A3B] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#241B16] text-[#FAF8F5] px-4 py-3 rounded-xl shadow-xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200 text-xs sm:text-sm">
          <div className="w-6 h-6 rounded-full bg-[#C87A3B] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 underline text-[#E6AF76] font-semibold hover:text-white cursor-pointer"
          >
            Xem giỏ
          </button>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Header
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTasteFinder={() => setIsTasteFinderOpen(true)}
        onSearchClick={() => {
          scrollToCatalog();
          const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
          if (searchInput) searchInput.focus();
        }}
        activeCategory="all"
        onSelectCategory={() => {}}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreCatalog={scrollToCatalog}
          onOpenTasteFinder={() => setIsTasteFinderOpen(true)}
        />

        {/* Product Catalog Grid */}
        <ProductCatalog
          products={products}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAddToCart={handleQuickAddToCart}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Brewing Guide Masterclass */}
        <BrewingGuideSection />

        {/* Farm & Roasting Craft Story */}
        <FarmStorySection />

        {/* Customer Reviews & Social Proof */}
        <CustomerReviewsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <TasteFinderModal
        isOpen={isTasteFinderOpen}
        onClose={() => setIsTasteFinderOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickAddToCart={handleQuickAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onExploreProducts={scrollToCatalog}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountAmount={appliedDiscount}
        discountCode={discountCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Floating Bottom Quick Cart on Mobile if items exist */}
      {totalCartCount > 0 && !isCartOpen && !isCheckoutOpen && !selectedProduct && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#241B16] text-[#FAF8F5] py-3.5 px-5 rounded-2xl shadow-xl flex items-center justify-between border border-white/10"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#E6AF76]" />
              <span className="text-xs font-semibold">Giỏ hàng ({totalCartCount} món)</span>
            </div>
            <span className="text-xs font-mono font-bold text-[#E6AF76]">
              {new Intl.NumberFormat('vi-VN').format(
                cartItems.reduce((sum, it) => sum + it.itemPrice * it.quantity, 0)
              )}₫
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
