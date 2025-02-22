<script setup lang="ts">
import type { ProductsData } from '~/types/types';
const search = useRoute().params.id
const { data } = await useFetch<ProductsData>('https://dummyjson.com/products/search?q=' + search)

</script>

<template>
    <div v-if="data?.products">
        <Products :products="data.products" />
    </div>
    <div v-else class="nodata">No data</div>
</template>
