<script setup lang="ts">
import type { Data } from '~/types/types';
const { data } = await useFetch<Data>('https:dummyjson.com/products')
</script>

<template>
    <div v-if="data == null">
        No data
    </div>
    <section class="products" v-else>
        <div v-for="product of data.products" :key="product.id">
            <Card :product="product" />
        </div>
    </section>
</template>


<style scoped>
section.products {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1em;
    padding: 2em;
    background-color: var(--color-primary);
    min-height: 100vh;
}
</style>