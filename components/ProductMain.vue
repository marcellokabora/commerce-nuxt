<script setup lang="ts">
import type { Product } from '~/types/types';
import { addCart } from '~/composables/cookies';

const { product } = defineProps<{ product: Product }>()
const favorites = favoriteCookie().products

if (favorites) {
    product.favorite = favorites.value.find(value => value.id === product.id)?.favorite
}

</script>

<template>
    <div class="flex flex-col sm:flex-row items-start gap-12">
        <UCarousel v-if="product.images" v-slot="{ item }" :items="product.images"
            class="gallery w-96 sm:sticky top-20">
            <NuxtImg :src="item" class="carousel-image w-full h-auto object-contain rounded-lg shadow-md" />
        </UCarousel>

        <div class="flex-1 grid gap-10">
            <div class="grid gap-6 bg-white text-primary p-6 rounded-lg">
                <h3 class="text-2xl font-bold">{{ product.title }}</h3>
                <div class="text-lg leading-relaxed">{{ product.description }}</div>
            </div>

            <div class="flex items-center gap-6">
                <UButton class="gap-2 px-8 py-4 rounded-full font-semibold text-lg shadow-md" @click="addCart(product)">
                    <span>Buy {{ product.price }}</span>
                    <Icon name="material-symbols:euro" class="text-xl" />
                </UButton>
                <UButton
                    class="rounded-full h-12 w-12 flex items-center justify-center shadow-md bg-white text-primary hover:bg-opacity-90"
                    :class="{ 'bg-opacity-100': product?.favorite }" title="Favorite" @click="onFavorite(product)">
                    <Icon name="material-symbols:favorite" />
                </UButton>
            </div>

            <div class="grid gap-6 bg-white text-primary p-6 rounded-lg">
                <h3 class="text-xl font-semibold border-b-2 border-primary pb-3">Informations</h3>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
                    <div>
                        <span class="font-semibold">Discount:</span> {{ product.discountPercentage }}
                    </div>
                    <div>
                        <span class="font-semibold">Brand:</span> {{ product.brand }}
                    </div>
                    <div>
                        <span class="font-semibold">Warranty:</span> {{ product.warrantyInformation }}
                    </div>
                    <div>
                        <span class="font-semibold">Shipping:</span> {{ product.shippingInformation }}
                    </div>
                    <div>
                        <span class="font-semibold">Return:</span> {{ product.returnPolicy }}
                    </div>
                </div>
            </div>

            <div class="grid gap-4">
                <h3 class="text-xl font-semibold">Reviews</h3>
                <div v-for="(review, index) of product.reviews"
                    class="flex gap-6 p-6 bg-white text-primary rounded-lg hover:bg-opacity-90">
                    <UAvatar :src="`https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_${(index % 5) + 1}.png`"
                        alt="Avatar" />
                    <div class="flex flex-col gap-2 flex-1">
                        <div>
                            <div class="font-semibold">{{ review.reviewerName }}</div>
                            <div class="leading-relaxed">{{ review.comment }}</div>
                        </div>
                        <small class="text-sm">{{ new Date(review.date).toLocaleDateString() }}</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>