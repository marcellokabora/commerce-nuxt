<script setup lang="ts">
const id = useRoute().params.id
const { data } = await useFetch<any>('https://dummyjson.com/product/' + id)
</script>

<template>
    <ProductMain v-if="data" :product="data" />
    <div v-else class="nodata">No Data</div>
</template>
