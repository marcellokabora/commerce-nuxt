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
        <div v-if="status === 'pending' && allProducts.length === 0"
            class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
            <div class="flex flex-col items-center w-48 gap-2">
                <UProgress :value="100" indeterminate size="xs" />
                <p class="mt-2 text-sm text-gray-200">Loading products...</p>
            </div>
        </div>

        <div v-if="allProducts.length > 0">
            <Products :products="allProducts" />
        </div>

        <div v-if="status === 'pending' && allProducts.length > 0" class="flex items-center justify-center p-4">
            <div class="flex flex-col items-center w-48 gap-2">
                <UProgress :value="100" indeterminate size="xs" />
                <p class="mt-2 text-sm text-gray-200">Loading</p>
            </div>
        </div>

        <div v-if="!hasMore && allProducts.length" class="text-center p-4">
            <UAlert title="End of products" description="No more products to load" color="neutral" />
        </div>

        <div v-if="!status && allProducts.length === 0" class="text-center p-4">
            <UAlert title="No products" description="No products available" color="neutral" />
        </div>
    </div>
</template>