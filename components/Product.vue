<script setup lang="ts">
import type { Product } from '~/types/types';
import { addCart } from '~/composables/cookies';

const { product } = defineProps<{ product: Product }>();
const favorites = favoriteCookie().products;

if (favorites) {
    product.favorite = favorites.value.find(value => value.id === product.id)?.favorite;
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-10">
        <div class="flex flex-col gap-6 col-span-1">
            <UCarousel v-if="product.images" v-slot="{ item }" :items="product.images"
                class="w-full max-w-sm bg-white rounded-lg shadow-lg">
                <NuxtImg :src="item" class="w-full h-auto object-contain rounded-lg shadow-md" />
            </UCarousel>
            <div class="flex gap-4">
                <UButton class="px-6 py-3 rounded-full font-bold text-lg w-full justify-center"
                    @click="addCart(product)">
                    <span>Buy {{ product.price }}</span>
                    <Icon name="material-symbols:euro" class="text-xl ml-2" />
                </UButton>
                <UButton class="w-12 h-12 rounded-full justify-center"
                    :variant="product?.favorite ? 'solid' : 'outline'" title="Favorite" @click="onFavorite(product)">
                    <Icon name="material-symbols:favorite" />
                </UButton>
            </div>
        </div>

        <div class="grid gap-8 col-span-2">
            <h3 class="text-2xl font-bold mt-5">{{ product.title }}</h3>
            <div class="bg-white text-primary p-6 rounded-lg">
                <div class="text-base leading-relaxed mt-4">{{ product.description }}</div>
            </div>

            <div class="grid gap-4">
                <h3 class="text-xl font-bold">Informations</h3>
                <div class="bg-white text-primary p-6 rounded-lg">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div><span class="font-bold">Discount:</span> {{ product.discountPercentage }}</div>
                        <div><span class="font-bold">Brand:</span> {{ product.brand }}</div>
                        <div><span class="font-bold">Warranty:</span> {{ product.warrantyInformation }}</div>
                        <div><span class="font-bold">Shipping:</span> {{ product.shippingInformation }}</div>
                        <div><span class="font-bold">Return:</span> {{ product.returnPolicy }}</div>
                    </div>
                </div>
            </div>

            <div class="grid gap-4">
                <h3 class="text-xl font-bold">Reviews</h3>
                <div v-for="(review, index) of product.reviews" :key="index"
                    class="flex gap-4 p-4 bg-white text-primary rounded-l">
                    <UAvatar :src="`https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_${(index % 5) + 1}.png`"
                        alt="Avatar" class="w-12 h-12 rounded-full" />
                    <div class="flex flex-col gap-2">
                        <div class="font-bold">{{ review.reviewerName }}</div>
                        <div class="leading-relaxed">{{ review.comment }}</div>
                        <small class="text-sm text-gray-500">{{ new Date(review.date).toLocaleDateString() }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>