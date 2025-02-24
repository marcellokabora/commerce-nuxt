<script setup lang="ts">
import type { ProductsData } from '~/types/types';
const id = useRoute().params.id
const { data } = await useFetch<any>('https://dummyjson.com/product/' + id)
</script>

<template>
    <section>
        <ProductMain v-if="data" :product="data" />
        <div v-else class="nodata">No Data</div>
    </section>
</template>

<style scoped>
section {
    margin: auto;
    background-color: white;
    min-height: 100vh;
}
</style>
