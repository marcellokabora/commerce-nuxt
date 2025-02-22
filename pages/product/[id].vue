<script setup lang="ts">
import type { ProductsData } from '~/types/types';
const id = useRoute().params.id
const { data } = await useFetch<any>('https://dummyjson.com/product/' + id)
</script>

<template>
    <div v-if="data == null">
        No Product
    </div>
    <div v-else class="main">
        <section>
            <Product :product="data" />
        </section>
    </div>
</template>

<style scoped>
.main {
    display: flex;
}

section {
    max-width: 800px;
    margin: auto;
}
</style>
