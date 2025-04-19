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
    <div class="product">
        <div class="container">
            <NuxtLink :to="'/product/' + product.id">
                <NuxtImg :src="product.thumbnail" :alt="product.id" />
                <div class="title">{{ product.title }}</div>
            </NuxtLink>
            <div v-if="!isCart" class="infos" @click="addCart(product)">
                <div>Buy</div>
                <div class="info">
                    <span>{{ product.price }}</span>
                    <Icon name="material-symbols:euro" />
                </div>
            </div>
            <div v-else class="times">
                <div class="info price">
                    <div>Price</div>
                    <div class="info">
                        <span>{{ product.price }}</span>
                        <Icon name="material-symbols:euro" />
                    </div>
                </div>
                <div class="info more">
                    <UButton icon="material-symbols:remove-rounded" @click="onTimes(-1)" :disabled="times === 1" />
                    <span>{{ times }}</span>
                    <UButton icon="material-symbols:add" @click="onTimes(1)" />
                </div>
            </div>
        </div>
        <div class="actions">
            <div v-if="isCart || isFavo">
                <button class="favorite" title="Remove" @click="onRemove">
                    <Icon name="material-symbols:delete" />
                </button>
            </div>
            <div v-else class="block">
                <button class="favorite" :class="{ active: product?.favorite }" title="Favorite"
                    @click="onFavorite(product)">
                    <Icon name="material-symbols:favorite" />
                </button>
                <UModal>
                    <button class="favorite preview" title="Preview">
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
.product {
    text-decoration: none;
    background-color: white;
    margin: 0;
    border-radius: 1em;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    position: relative;
    transition: all 0.2s;
}

.container {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
    gap: 1em;
    padding: 2em;

    .title {
        font-weight: 500;
        height: 50px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    img {
        width: auto;
        height: 150px;
        margin: auto;
        transition: all 0.5s;
        object-fit: contain;
    }
}

.infos {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    background-color: var(--ui-primary);
    width: 100%;
    border-radius: 1em;
    padding: 1em;
    color: white;
    margin-bottom: -1em;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        box-shadow: 0px 0px 0px 0.1em var(--color-secondary);
    }

    .info {
        display: flex;
        align-items: center;
        gap: 0.3em;
    }
}

.times {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1em;
    width: 100%;
    padding: 1em;
    margin-bottom: -1em;

    .info {
        display: flex;
        align-items: center;
        gap: 0.3em;

        &.price {
            font-weight: bold;
            font-size: 1.2em;
        }

        &.more {
            gap: 1em;
        }

        button {
            cursor: pointer;
        }
    }
}

.actions {
    position: absolute;
    top: 1em;
    right: 1em;

    .block {
        display: grid;
        gap: 1em;
    }
}

.favorite {
    border-radius: 100px;
    border: none;
    cursor: pointer;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid silver;

    &.active {
        background-color: var(--ui-primary);
        color: white;
    }

    &:hover:not(.active) {
        color: var(--ui-primary);
    }
}

@media (width<1000px) {
    .preview {
        display: none;
    }
}
</style>