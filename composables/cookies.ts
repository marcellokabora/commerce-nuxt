import type { Product } from "~/types/types";

export const favoriteCookie = () => {
  const products = useCookie<string[]>('favorite', {
    default: () => [],
    watch: true,
    encode: value => JSON.stringify(value),
    decode: value => JSON.parse(value)
})

  const set = (id:string) => {
    products.value.push(id);
  };

  const get = () => products.value;

  const remove = (id:string) => {
    products.value = products.value.filter(value => value!==id)
  };  

  return {
    set,
    get,
    remove,
    products: products
  };
};

export const cartCookie = () => {
  const products = useCookie<string[]>('cart', {
    default: () => [],
    watch: true,
    encode: value => JSON.stringify(value),
    decode: value => JSON.parse(value)
})

  const set = (id:string) => {
    products.value.push(id);
  };

  const get = () => products.value;

  const remove = (id:string) => {
    products.value = products.value.filter(value => value!==id)
  };  

  return {
    set,
    get,
    remove,
    products: products
  };
};