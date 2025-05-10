<script setup lang="ts">
import type { Product } from '~/types/types';

const modal = useModal()

const { product } = defineProps<{ product: Product }>()

</script>

<template>
    <div class="p-8">
        <h3 class="text-lg font-bold mb-4">{{ product.title }}</h3>
        <div class="text-base">{{ product.description }}</div>
        <UCarousel v-if="product.images" v-slot="{ item }" :arrows="product.images.length > 1" :items="product.images"
            class="w-full max-w-xs mx-auto">
            <NuxtImg :src="item" class="object-contain mx-auto h-96" />
        </UCarousel>
        <div class="bg-ui-primary text-white flex justify-between rounded-xl p-4">
            <UButton class="flex items-center gap-2 text-ui-primary px-6 py-4 rounded-full cursor-pointer">
                <span>Buy {{ product.price }}</span>
                <Icon name="material-symbols:euro" class="text-xl" />
            </UButton>
            <UButton class="flex items-center gap-2 text-ui-primar border-none rounded-full px-4 py-2 cursor-pointer">
                <Icon name="material-symbols:favorite" class="text-xl" />
                <span>{{ product.favorite ? "Remove" : "Add" }}</span>
            </UButton>
        </div>
    </div>
</template>
