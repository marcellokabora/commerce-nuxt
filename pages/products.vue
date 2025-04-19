<script setup lang="ts">
import type { ProductsData, Product } from '~/types/types';
import { useWindowScroll } from '@vueuse/core'

const skip = ref(0)
const limit = 30
const hasMore = ref(true)
const allProducts = ref<Product[]>([])

const { y: scrollY } = useWindowScroll()

const { data: productsData, status } = await useFetch<ProductsData>(
    () => `https://dummyjson.com/products?limit=${limit}&skip=${skip.value}`,
    {
        watch: [skip],
        transform: (data) => {
            if (data?.products) {
                return {
                    ...data,
                    products: data.products.map(product => ({
                        ...product,
                        id: String(product.id),
                        favorite: false
                    }))
                }
            }
            return data
        },
        // onRequest: async () => {
        //     // Add a 1 second delay to test loading states
        //     await new Promise(resolve => setTimeout(resolve, 1000))
        // }
    }
)

// Watch for new data and accumulate products
watch(productsData, (newData) => {
    if (newData?.products) {
        allProducts.value = [...allProducts.value, ...newData.products]
    }
}, { immediate: true })

const total = computed(() => productsData.value?.total || 0)

// Handle scroll
const handleScroll = () => {
    const { scrollHeight, clientHeight } = document.documentElement
    const scrollPosition = scrollY.value + clientHeight
    const threshold = scrollHeight - 200

    if (scrollPosition >= threshold && status.value !== 'pending' && hasMore.value) {
        if (allProducts.value.length < total.value) {
            skip.value += limit
        } else {
            hasMore.value = false
        }
    }
}

// Watch scroll position
watch(scrollY, handleScroll)
</script>

<template>
    <div>
        <!-- Initial loading progress -->
        <div v-if="status === 'pending' && allProducts.length === 0" class="initial-loading">
            <div class="progress-container">
                <UProgress :value="100" indeterminate size="xs" />
                <p class="mt-2 text-sm">Loading products...</p>
            </div>
        </div>

        <!-- Products list -->
        <div v-if="allProducts.length > 0">
            <Products :products="allProducts" />
        </div>

        <!-- Scroll loading progress -->
        <div v-if="status === 'pending' && allProducts.length > 0" class="scroll-loading">
            <div class="progress-container">
                <UProgress :value="100" indeterminate size="xs" />
                <p class="mt-2 text-sm">Loading</p>
            </div>
        </div>

        <div v-if="!hasMore && allProducts.length" class="end-message">
            <UAlert title="End of products" description="No more products to load" color="neutral" />
        </div>

        <div v-if="!status && allProducts.length === 0" class="nodata">
            <UAlert title="No products" description="No products available" color="neutral" />
        </div>
    </div>
</template>

<style scoped>
.initial-loading {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
}

.scroll-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
}

.progress-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    gap: 0.5rem;
}

.progress-container p {
    color: #f3f4f6;
}

.end-message,
.nodata {
    text-align: center;
    padding: 1rem;
}

:deep(.u-alert) {
    color: #f3f4f6;
}
</style>
