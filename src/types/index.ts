export interface Irating {
  rate: number;
  count: number;
}
export interface Iproduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Irating;
}
export interface ICartItems {
  cartItem: IProductitem[];
  removeItem: (id: number | undefined) => void;
  Totalprice: number;
}

export interface Iproducts {
  data: Iproduct[];
}

export type IProductitem = Partial<Omit<Iproduct, "rating" | "description">> & {
  quantity: number;
};

export interface IuseCard {
  cartItems: IProductitem[];
  wishListItems: IProductitem[];
  addToCart: (item: IProductitem) => void;
  addToWishlist: (item: IProductitem) => void;
  removeFromCart: (id?: number) => void;
  removeFromWishlist: (id?: number) => void;
}
