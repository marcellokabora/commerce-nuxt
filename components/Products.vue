<script setup lang="ts">
import type { Product } from '~/types/types';
import { computed } from 'vue';

const props = defineProps<{ products: Product[] }>()
const favorites = favoriteCookie().products

// Create a computed property for filtered products
const filteredProducts = computed(() => {
    return props.products.map(product => ({
        ...product,
        favorite: favorites.value?.some(favorite => favorite.id === product.id) || false
    }))
})
</script>

<template>
    <div class="products">
        <div v-for="product of filteredProducts" :key="product.id">
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