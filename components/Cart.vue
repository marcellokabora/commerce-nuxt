<script setup lang="ts">

const products = cartCookie().products
const cart = cartCookie()

const subtotal = computed<number>(() => {
    let price = products.value.reduce((total, item) => total + (item.price * (item.times || 1)), 0);
    return Math.ceil(price * 100) / 100;
})

const discount = computed<number>(() => {
    return Math.ceil(subtotal.value * 0.2 * 100) / 100;
})

const total = computed<number>(() => {
    return Math.ceil((subtotal.value - discount.value) * 100) / 100;
})

const itemCount = computed<number>(() => {
    return products.value.reduce((count, item) => count + (item.times || 1), 0);
})

const isLoading = ref(false)

async function handleCheckout() {
    isLoading.value = true;
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    cart.clear();
    isLoading.value = false;
}
</script>

<template>
    <div class="cart">
        <div class="header">
            <div class="title">Shopping Cart</div>
            <div class="item-count">{{ itemCount }} items</div>
        </div>

        <div class="price-details">
            <div class="price-row">
                <span>Subtotal</span>
                <span>{{ subtotal.toFixed(2) }} €</span>
            </div>
            <div class="price-row discount">
                <span>Discount (20%)</span>
                <span>-{{ discount.toFixed(2) }} €</span>
            </div>
            <div class="price-row total">
                <span>Total</span>
                <span>{{ total.toFixed(2) }} €</span>
            </div>
        </div>

        <div class="actions">
            <UButton color="error" variant="soft" icon="i-lucide-trash-2" @click="cart.clear()"
                :disabled="products.length === 0">
                Clear Cart
            </UButton>
            <UButton icon="i-lucide-rocket" :loading="isLoading" :disabled="products.length === 0"
                @click="handleCheckout">
                {{ isLoading ? 'Processing...' : 'Checkout' }}
            </UButton>
        </div>
    </div>
</template>

<style scoped>
.cart {
    padding: 1.5em;
    background-color: white;
    border-radius: 1em;
    margin-right: 2em;
    margin-top: 2em;
    position: sticky;
    top: 6em;
    display: grid;
    gap: 1.5em;
    min-width: 280px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .header {
        text-align: center;
        padding-bottom: 1em;
        border-bottom: 1px solid #eee;

        .title {
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 0.5em;
        }

        .item-count {
            color: #666;
            font-size: 0.9em;
        }
    }

    .price-details {
        display: grid;
        gap: 0.8em;

        .price-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.3em 0;

            &.discount {
                color: #10b981;
            }

            &.total {
                font-weight: bold;
                font-size: 1.1em;
                padding-top: 0.8em;
                border-top: 1px solid #eee;
            }
        }
    }

    .actions {
        display: grid;
        gap: 0.8em;

        button {
            width: 100%;
            padding: 0.8em;
            font-weight: 500;
        }
    }
}
</style>