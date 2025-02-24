<script setup lang="ts">
import type { Product } from '~/types/types';

let favorites: Product[] = favoriteCookie().products.value

</script>

<template>
    <Products v-if="favorites[0]" :products="favorites" />
    <div v-else class="nodata">No data</div>
</template>
