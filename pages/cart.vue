<script setup lang="ts">
import { computed } from 'vue';

const products = computed(() => cartCookie().products.value)

</script>

<template>
    <div class="relative grid grid-cols-[1fr_auto] gap-4">
        <div>
            <Products v-if="products[0]" :products="products" />
            <div v-else class=" text-center">No products in cart</div>
        </div>
        <div>
            <Cart />
        </div>
    </div>
</template>
