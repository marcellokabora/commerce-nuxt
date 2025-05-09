<script setup lang="ts">
import type { ProductsData } from '~/types/types';
const id = useRoute().params.id
const { data } = await useFetch<ProductsData>('https://dummyjson.com/products/category/' + id)
</script>

<template>
    <div v-if="data == null">No data</div>
    <div v-else>
        <Products :products="data.products" />
    </div>
</template>
