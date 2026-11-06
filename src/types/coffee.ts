export type CoffeeCategory = 'all' | 'beans' | 'phin' | 'drip' | 'gear';

export type RoastLevel = 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';

export type GrindOption = 
  | 'Nguyên hạt (Whole Bean)'
  | 'Pha Phin truyền thống'
  | 'Pha Espresso máy'
  | 'Pha Giấy lọc / V60'
  | 'Pha Cold Brew ngâm lạnh'
  | 'Xay sẵn chuẩn túi lọc Drip Bag'
  | 'Phụ kiện pha chế (Không xay)';

export interface WeightOption {
  label: string;
  weightGrams: number;
  multiplier: number;
}

export interface CoffeeProduct {
  id: string;
  name: string;
  subName: string;
  category: 'beans' | 'phin' | 'drip' | 'gear';
  roastLevel: RoastLevel;
  price: number;
  originalPrice?: number;
  origin: string;
  altitude: string;
  process: string;
  varietal: string;
  tastingNotes: string[];
  description: string;
  brewingRecommendation: string;
  image: string;
  weights: WeightOption[];
  grindOptions: GrindOption[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
  flavorProfile: {
    acidity: number; // 1-5
    sweetness: number; // 1-5
    body: number; // 1-5
    bitterness: number; // 1-5
    aroma: number; // 1-5
  };
}

export interface CartItem {
  cartId: string;
  product: CoffeeProduct;
  selectedWeight: WeightOption;
  selectedGrind: GrindOption;
  quantity: number;
  itemPrice: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verified: boolean;
  avatarSeed: string;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  note?: string;
  paymentMethod: 'cod' | 'vietqr' | 'momo';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}
