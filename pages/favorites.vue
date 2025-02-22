<script setup lang="ts">
import type { Product, ProductsData } from '~/types/types';

const { data } = await useFetch<ProductsData>('https:dummyjson.com/products')
let favorites: Product[] = []

if (data.value?.products) {
    favorites = data.value.products.filter(value => favoriteCookie().products.value.includes(value.id))
}
</script>

<template>
    <Products v-if="favorites[0]" :products="favorites" />
    <div v-else class="nodata">No data</div>
</template>
