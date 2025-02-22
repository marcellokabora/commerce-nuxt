<script setup lang="ts">
import type { ProductsData } from '~/types/types';
const search = useRoute().params.id
const { data } = await useFetch<ProductsData>('https://dummyjson.com/products/search?q=' + search)
console.log(data);

</script>

<template>
    <div v-if="data.products.length === 0" class="nodata">
        No data
    </div>
    <div v-else>
        <Products :products="data.products" />
    </div>
</template>
