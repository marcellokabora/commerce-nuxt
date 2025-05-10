<script setup lang="ts">
const id = useRoute().params.id
const { data } = await useFetch<any>('https://dummyjson.com/product/' + id)
</script>

<template>
    <Product v-if="data" :product="data" />
    <div v-else class="text-center pt-40 text-lg">No Data</div>
</template>
