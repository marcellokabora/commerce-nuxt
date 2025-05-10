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
                <NuxtImg :src="product.thumbnail"
                    class="w-auto h-36 mx-auto transition-all duration-500 object-contain" />
                <div class="title font-medium h-12 overflow-hidden flex items-center justify-center">
                    {{ product.title }}
                </div>
            </NuxtLink>
            <UButton v-if="!isCart"
                class="w-full justify-center h-12 cursor-pointer rounded-full transition-transform duration-200 hover:scale-105 hover:bg-color-primary"
                @click="addCart(product)">
                Buy
                <Icon name="material-symbols:euro" />
                {{ product.price }}
            </UButton>
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
                <UButton icon="i-lucide-trash" color="error" class="rounded-full text-xl p-2 cursor-pointer"
                    @click="onRemove" />
            </div>
            <div v-else class="grid gap-4">
                <UButton icon="i-lucide-heart" :color="product.favorite ? 'error' : 'neutral'"
                    :variant="product.favorite ? 'solid' : 'outline'" class="rounded-full text-xl p-2 cursor-pointer"
                    @click="onFavorite(product)" />
                <UModal class="sm:flex hidden">
                    <UButton icon="i-lucide-eye" color="neutral" variant="outline"
                        class="rounded-full text-xl p-2 cursor-pointer" />

                    <template #content>
                        <Preview :product="product" />
                    </template>
                </UModal>
            </div>
        </div>
    </div>
</template>
