import type { Product } from "~/types/types";

interface CookieOptions {
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const defaultCookieOptions: CookieOptions = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: '/',
  secure: true,
  sameSite: 'lax'
};

const safeJsonParse = (value: string): any => {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error('Failed to parse cookie value:', e);
    return [];
  }
};

export const favoriteCookie = () => {
  const products = useCookie<Product[]>('favorite', {
    default: () => [],
    watch: true,
    encode: value => JSON.stringify(value),
    decode: value => safeJsonParse(value),
    ...defaultCookieOptions
  });

  const toast = useToast();

  const set = (product: Product) => {
    if (!products.value.some(p => p.id === product.id)) {
      products.value.push(product);
      toast.add({
        title: `${product.title} added to favorites`,
        icon: "material-symbols:favorite"
      });
    }
  };

  const get = () => products.value;

  const remove = (product: Product) => {
    products.value = products.value.filter(value => value.id !== product.id);
    toast.add({
      title: `${product.title} removed from favorites`,
      icon: "material-symbols:favorite-border"
    });
  };

  const clear = () => {
    products.value = [];
    toast.add({
      title: 'Favorites cleared',
      icon: "material-symbols:delete"
    });
  };

  const has = (productId: string) => {
    return products.value.some(p => p.id === productId);
  };

  return {
    set,
    get,
    remove,
    clear,
    has,
    products
  };
};

export const cartCookie = () => {
  const products = useCookie<Product[]>('cart', {
    default: () => [],
    watch: true,
    encode: value => JSON.stringify(value),
    decode: value => safeJsonParse(value),
    ...defaultCookieOptions
  });

  const toast = useToast();

  const set = (product: Product) => {
    const existingProduct = products.value.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.times = (existingProduct.times || 1) + 1;
      toast.add({
        title: `${product.title} quantity updated`,
        icon: "material-symbols:add-shopping-cart"
      });
    } else {
      products.value.push({ ...product, times: 1 });
      toast.add({
        title: `${product.title} added to cart`,
        icon: "material-symbols:add-shopping-cart"
      });
    }
  };

  const update = (product: Product) => {
    products.value = products.value.map(value => {
      if (value.id === product.id) {
        return { ...value, ...product };
      }
      return value;
    });
    toast.add({
      title: `${product.title} updated in cart`,
      icon: "material-symbols:edit"
    });
  };

  const get = () => products.value;

  const remove = (product: Product) => {
    products.value = products.value.filter(value => value.id !== product.id);
    toast.add({
      title: `${product.title} removed from cart`,
      icon: "material-symbols:delete"
    });
  };

  const clear = () => {
    products.value = [];
    toast.add({
      title: 'Cart cleared',
      icon: "material-symbols:delete"
    });
  };

  const getTotal = () => {
    return products.value.reduce((total, item) => {
      const price = item.price * (item.times || 1);
      return total + price;
    }, 0);
  };

  const getQuantity = (productId: string) => {
    const product = products.value.find(p => p.id === productId);
    return product?.times || 0;
  };

  return {
    set,
    get,
    remove,
    update,
    clear,
    getTotal,
    getQuantity,
    products
  };
};

export function onFavorite(product: Product) {
  const favorite: Product = {
    id: product.id,
    thumbnail: product.thumbnail,
    title: product.title,
    price: product.price,
  };

  if (favoriteCookie().has(product.id)) {
    product.favorite = false;
    favoriteCookie().remove(favorite);
  } else {
    product.favorite = true;
    favoriteCookie().set(favorite);
  }
}

export function addCart(product: Product) {
  if (!cartCookie().products.value.some(p => p.id === product.id)) {
    const cart: Product = {
      id: product.id,
      thumbnail: product.thumbnail,
      title: product.title,
      price: product.price,
      times: 1
    };
    cartCookie().set(cart);
  }
}

