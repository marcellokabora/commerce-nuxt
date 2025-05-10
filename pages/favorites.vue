<script setup lang="ts">
import { computed } from 'vue';

const favorites = computed(() => favoriteCookie().products.value);

</script>

<template>
    <Products v-if="favorites[0]" :products="favorites" />
    <div v-else class="text-center pt-40 text-lg">No products in favorite</div>
</template>
