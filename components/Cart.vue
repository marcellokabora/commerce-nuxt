<script setup lang="ts">
import type { Product } from '~/types/types';

const products = cartCookie().products

let total = computed<number>(() => {
    let price = products.value.reduce((total, item) => total + item.price, 0);
    return Math.ceil(price * 100) / 100;
})

</script>

<template>
    <div class="cart">
        <div class="price">
            <div class="title">Checkout</div>
            <div>Discount 20%</div>
            <div>Total {{ total }}</div>
        </div>
        <div class="checkout">
            <UButton icon="i-lucide-rocket">PAY</UButton>
        </div>
    </div>
</template>

<style scope>
.cart {
    padding: 1em;
    background-color: white;
    border-radius: 1em;
    margin-right: 2em;
    margin-top: 2em;
    position: sticky;
    top: 105px;
    height: calc(100vh - 130px);
    padding: 2em;
    display: grid;
    grid-template-rows: 1fr auto;
    min-width: 200px;

    .title {
        font-weight: bold;
        border-bottom: 1px solid silver;
        padding-bottom: .5em;
        margin-bottom: .5em;
    }

    button {
        width: 100%;
        zoom: 1.2;
        cursor: pointer;
    }
}
</style>