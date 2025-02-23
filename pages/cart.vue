<script setup lang="ts">
import type { Product } from '~/types/types';

let favorites: Product[] = cartCookie().products.value

</script>

<template>
    <Products v-if="favorites[0]" :products="favorites" :removable="true" />
    <div v-else class="nodata">No data</div>
</template>
