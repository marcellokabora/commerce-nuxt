<script setup lang="ts">
import type { Product } from '~/types/types';

const modal = useModal()

const { product } = defineProps<{ product: Product }>()


</script>

<template>
    <div class="modal">
        <h3 class="title">{{ product.title }}</h3>
        <div class="description">{{ product.description }}</div>
        <UCarousel v-if="product.images" v-slot="{ item }" :arrows="product.images.length > 1" :items="product.images"
            class="gallery w-full max-w-xs mx-auto">
            <NuxtImg :src="item" />
        </UCarousel>
        <div class="actions">
            <button class="price" @click="addCart(product)">
                <span>Buy {{ product.price }}</span>
                <Icon name="material-symbols:euro" />
            </button>
            <button class="favorite" @click="onFavorite(product)">
                <Icon name="material-symbols:favorite" />
                <span>{{ product.favorite ? "Remove" : "Add" }}</span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.modal {
    padding: 2em;
}

.title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 1em;
}

.description {
    font-size: 1em;
}

img {
    object-fit: contain;
    margin: auto;
    height: 400px
}

.actions {
    background-color: var(--ui-primary);
    color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 1em;
    padding: 1em 1.5em;
}

.price {
    display: flex;
    align-items: center;
    gap: 0.5em;
    background-color: rgb(255, 255, 255);
    padding: 1em 1.5em;
    border-radius: 100px;
    cursor: pointer;
    color: var(--ui-primary);

    .iconify {
        font-size: 1.2em;
    }
}


.favorite {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: var(--ui-primary);
    background-color: white;
    border: none;
    border-radius: 100px;
    padding: .7em 1em;
    cursor: pointer;
}
</style>
