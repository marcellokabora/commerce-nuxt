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
    <div class="relative w-full mb-8">
        <h3 class="text-center text-2xl md:text-4xl font-black drop-shadow py-4 flex items-center justify-center gap-4">
            <Icon name="material-symbols:star" class="text-yellow-300 animate-pulse" v-if="product.favorite" />
            {{ product.title }}
            <span v-if="(product?.discountPercentage ?? 0) > 0"
                class="ml-3 px-3 py-1 rounded-full bg-red-500 text-white text-base font-semibold animate-bounce">-{{
                    product.discountPercentage ?? 0 }}%</span>
        </h3>
    </div>
    <div class="flex flex-col lg:flex-row gap-8 items-start mb-10">
        <div class="flex flex-col gap-6">
            <UCarousel v-if="product.images" v-slot="{ item }" :items="product.images" :dots="product.images.length > 1"
                class="w-full max-w-[800px] bg-white rounded-lg mb-10">
                <NuxtImg :src="item" />
            </UCarousel>
            <div class="flex gap-4">
                <UButton class="px-6 py-3 rounded-full font-bold text-lg w-full justify-center"
                    @click="addCart(product)">
                    <span>Buy {{ product.price }}</span>
                    <Icon name="material-symbols:euro" class="text-xl ml-2" />
                </UButton>
                <div>
                    <UButton class="w-12 h-12 rounded-full justify-center"
                        :variant="product?.favorite ? 'solid' : 'outline'" title="Favorite"
                        @click="onFavorite(product)">
                        <Icon name="material-symbols:favorite" />
                    </UButton>
                </div>
            </div>
        </div>
        <div class="grid gap-8">
            <div class="bg-white p-6 rounded-lg">
                <div class="text-base leading-relaxed">{{ product.description }}</div>
            </div>
            <div class="grid gap-4">
                <h3 class="text-xl font-bold">Informations</h3>
                <div class="bg-white  p-6 rounded-lg">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div><span class="font-bold">Discount:</span> {{ product.discountPercentage }}%</div>
                        <div><span class="font-bold">Brand:</span> {{ product.brand }}</div>
                        <div><span class="font-bold">Warranty:</span> {{ product.warrantyInformation }}</div>
                        <div><span class="font-bold">Shipping:</span> {{ product.shippingInformation }}</div>
                        <div><span class="font-bold">Return:</span> {{ product.returnPolicy }}</div>
                    </div>
                </div>
            </div>
            <div class="grid gap-4">
                <h3 class="text-xl font-bold">Reviews</h3>
                <div v-for="(review, index) of product.reviews" :key="index" class="flex gap-4 p-4 bg-white rounded-lg">
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