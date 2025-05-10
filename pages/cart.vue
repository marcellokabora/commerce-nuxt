<script setup lang="ts">
import type { Product } from '~/types/types';
import { computed } from 'vue';

const cart = cartCookie()
const products = computed(() => cart.products.value)

</script>

<template>
    <div class="relative grid grid-cols-[1fr_auto]">
        <div>
            <Products v-if="products[0]" :products="products" />
            <div v-else class="nodata">No products in cart</div>
        </div>
        <div>
            <Cart />
        </div>
    </div>
</template>
