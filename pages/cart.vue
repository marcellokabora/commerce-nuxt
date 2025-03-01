<script setup lang="ts">
import type { Product } from '~/types/types';

let products: Product[] = cartCookie().products.value

</script>

<template>
    <section>
        <div>
            <Products v-if="products[0]" :products="products" />
            <div v-else class="nodata">No data</div>
        </div>
        <div>
            <Cart />
        </div>
    </section>
</template>

<style scoped>
section {
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
}
</style>
