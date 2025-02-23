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