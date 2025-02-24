import type { Product } from "~/types/types";

export const favoriteCookie = () => {
  const products = useCookie<Product[]>('favorite', {
    default: () => [],
    watch: true,
    encode: value => JSON.stringify(value),
    decode: value => JSON.parse(value)
})

  const set = (product:Product) => {
    products.value.push(product);
  };

  const get = () => products.value;

  const remove = (product:Product) => {
    products.value = products.value.filter(value => value.id!==product.id)
  };

  return {
    set,
    get,
    remove,
    products: products
  };
};

export const cartCookie = () => {
  const products = useCookie<Product[]>('cart', {
    default: () => [],
    watch: true,
    encode: value => JSON.stringify(value),
    decode: value => JSON.parse(value)
})

  const set = (product:Product) => {
    products.value.push(product);
  };

  const get = () => products.value;

  const remove = (product:Product) => {
    products.value = products.value.filter(value => value.id!==product.id)
  };  

  return {
    set,
    get,
    remove,
    products: products
  };
};

export function onFavorite(product:Product) {
  const favorite: Product = {
      id: product.id,
      thumbnail: product.thumbnail,
      title: product.title,
      price: product.price,
  }
  if (favoriteCookie().products.value.map(value => value.id).includes(product.id)) {
      product.favorite = false
      favoriteCookie().remove(favorite)
  } else {
      product.favorite = true
      favoriteCookie().set(favorite)
  }
}

export function addCart(product:Product) {
  if (!cartCookie().products.value.map(value => value.id).includes(product.id)) {
    const cart: Product = {
        id: product.id,
        thumbnail: product.thumbnail,
        title: product.title,
        price: product.price,
    }
    cartCookie().set(cart)
  }
}

