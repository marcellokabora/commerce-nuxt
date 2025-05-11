<script setup lang="ts">
import type { Product } from '~/types/types';
import { computed } from 'vue';

const props = defineProps<{ products: Product[] }>()
const favorites = favoriteCookie().products

const filteredProducts = computed(() => {
    return props.products.map(product => ({
        ...product,
        favorite: favorites.value?.some(favorite => favorite.id === product.id) || false
    }))
})
</script>

<template>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        <div v-for="product of filteredProducts" :key="product.id">
            <Card :product="product" />
        </div>
    </div>
</template>