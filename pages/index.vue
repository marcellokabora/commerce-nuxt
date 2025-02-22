<script setup lang="ts">
import type { ProductsData } from '~/types/types';

const { data } = await useFetch<ProductsData>('https:dummyjson.com/products')
</script>

<template>
    <Products v-if="data?.products" :products="data.products" />
    <div v-else class="nodata">No data</div>
</template>
