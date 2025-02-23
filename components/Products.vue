<script setup lang="ts">
import type { Product } from '~/types/types';

const { products, removable } = defineProps<{ products: Product[], removable?: boolean }>()
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
    <section class="products">
        <div v-for="product of filtered" :key="product.id">
            <Card :product="product" :removable="removable" />
        </div>
    </section>
</template>

<style scoped>
section.products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1em;
    padding: 2em;
}
</style>