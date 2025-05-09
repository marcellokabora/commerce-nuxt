<script setup lang="ts">
import type { Product } from '~/types/types';

const { product } = defineProps<{ product: Product }>()

let visible = ref(true)
const path: string = useRoute().name?.toString()!
const isCart = computed<boolean>(() => path === "cart")
const isFavo = computed<boolean>(() => path === "favorites")

let times = ref(product.times || 1)

function onRemove() {
    visible.value = false
    if (isFavo.value) {
        favoriteCookie().remove(product)
    } else if (isCart.value) {
        cartCookie().remove(product)
    }
}

function onTimes(value: number) {
    if (value > 0) {
        times.value++
    } else if (times.value > 1) {
        times.value--
    }
    product.times = times.value
    cartCookie().update(product)
}
</script>

<template>
    <div class="product bg-white rounded-xl shadow-md relative transition-all duration-200">
        <div class="container text-center flex flex-col items-center justify-between gap-4 p-8">
            <NuxtLink :to="'/product/' + product.id">
                <NuxtImg :src="product.thumbnail" :alt="product.id"
                    class="w-auto h-36 mx-auto transition-all duration-500 object-contain" />
                <div class="title font-medium h-12 overflow-hidden flex items-center justify-center">
                    {{ product.title }}
                </div>
            </NuxtLink>
            <div v-if="!isCart"
                class="infos flex items-center justify-center gap-4 bg-primary w-full rounded-xl p-4 text-white mb-[-1em] cursor-pointer transition-all duration-200 hover:shadow-md">
                <div>Buy</div>
                <div class="info flex items-center gap-1">
                    <span>{{ product.price }}</span>
                    <Icon name="material-symbols:euro" />
                </div>
            </div>
            <div v-else class="times flex items-center justify-center flex-col gap-4 w-full p-4 mb-[-1em]">
                <div class="info price font-bold text-lg flex items-center gap-1">
                    <div>Price</div>
                    <div class="info flex items-center gap-1">
                        <span>{{ product.price }}</span>
                        <Icon name="material-symbols:euro" />
                    </div>
                </div>
                <div class="info more flex items-center gap-4">
                    <UButton icon="material-symbols:remove-rounded" @click="onTimes(-1)" :disabled="times === 1" />
                    <span>{{ times }}</span>
                    <UButton icon="material-symbols:add" @click="onTimes(1)" />
                </div>
            </div>
        </div>
        <div class="actions absolute top-4 right-4">
            <div v-if="isCart || isFavo">
                <button
                    class="favorite border rounded-full h-10 w-10 flex items-center justify-center border-gray-300 cursor-pointer"
                    title="Remove" @click="onRemove">
                    <Icon name="material-symbols:delete" />
                </button>
            </div>
            <div v-else class="grid gap-4">
                <button
                    class="favorite border rounded-full h-10 w-10 flex items-center justify-center border-gray-300 cursor-pointer"
                    :class="{ 'bg-red-400 text-white': product?.favorite }" title="Favorite"
                    @click="onFavorite(product)">
                    <Icon name="material-symbols:favorite" />
                </button>
                <UModal>
                    <button
                        class="favorite preview border rounded-full h-10 w-10 flex items-center justify-center border-gray-300 cursor-pointer"
                        title="Preview">
                        <Icon name="material-symbols:visibility" />
                    </button>
                    <template #content>
                        <ProductView :product="product" />
                    </template>
                </UModal>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (width<1000px) {
    .preview {
        display: none;
    }
}
</style>