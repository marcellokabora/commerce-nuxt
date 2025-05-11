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
    <div class="bg-white rounded-lg shadow-md p-6 grid gap-6">
        <div class="text-center pb-4 border-b border-gray-200">
            <div class="font-bold text-lg mb-2">Shopping Cart</div>
            <div class="text-gray-500 text-sm">{{ itemCount }} items</div>
        </div>

        <div class="grid gap-3">
            <div class="flex justify-between items-center py-1">
                <span>Subtotal</span>
                <span>{{ subtotal.toFixed(2) }} €</span>
            </div>
            <div class="text-green-500 flex gap-2 justify-between items-center py-1">
                <span>Discount (20%)</span>
                <span>-{{ discount.toFixed(2) }} €</span>
            </div>
            <div class="font-bold text-lg flex justify-between items-center pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>{{ total.toFixed(2) }} €</span>
            </div>
        </div>

        <div class="grid gap-3">
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