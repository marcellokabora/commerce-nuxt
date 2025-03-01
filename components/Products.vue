<script setup lang="ts">
import type { Product } from '~/types/types';

const { products } = defineProps<{ products: Product[] }>()
const favorites = favoriteCookie().products
let filtered = products
if (favorites) {
    filtered = products.map(value => {
        value.favorite = favorites.value.map(favorite => favorite.id).includes(value.id)
        return value
    })
}
</script>

<template>
    <div class="products">
        <div v-for="product of filtered" :key="product.id">
            <Card :product="product" />
        </div>
    </div>
</template>

<style scoped>
.products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1em;
    padding: 2em;
}
</style>