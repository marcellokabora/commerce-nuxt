<script setup lang="ts">
import type { Product } from '~/types/types';
import { computed } from 'vue';

const cart = cartCookie()
const products = computed(() => cart.products.value)

</script>

<template>
    <section>
        <div>
            <Products v-if="products[0]" :products="products" />
            <div v-else class="nodata">No products in cart</div>
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
