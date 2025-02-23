<script setup lang="ts">
import type { ProductsData } from '~/types/types';
const id = useRoute().params.id
const { data } = await useFetch<any>('https://dummyjson.com/product/' + id)
</script>

<template>
    <section>
        <div v-if="data" class="container">
            <ProductMain :product="data" />
        </div>
        <div v-else class="nodata">No Data</div>
    </section>
</template>

<style scoped>
section {
    margin: auto;
    background-color: white;
    min-height: 100vh;

    .container {
        max-width: 800px;
        margin: auto;
    }
}
</style>
