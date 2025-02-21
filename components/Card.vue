<script setup lang="ts">
import type { Product } from '~/types/types';
import Product1 from './Product.vue';

const { product } = defineProps<{ product: Product }>()

const modal = useModal()

function openModal() {
    modal.open(Product1, {
        product: product,
    })
}

</script>


<template>
    <div class="product">
        <div class="container" @click="openModal">
            <img :src="product.thumbnail" alt={{product.id}} />
            <div class="title">{{ product.title }}</div>
            <div class="data">
                <div class="info">
                    <span>{{ product.price }}</span>
                    <Icon name="material-symbols:euro" />
                </div>
                <div class="info">
                    <span>{{ product.rating }}</span>
                    <Icon name="material-symbols:star" />
                </div>
            </div>
        </div>
        <button class="favorite" :class="{ active: product.id }">
            <Icon name="material-symbols:favorite" />
        </button>
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
    cursor: pointer;
    box-shadow: 0px 0px 0px 0.2em rgba(0, 0, 0, 0.2);

    &:hover {
        box-shadow: 0px 0px 0px 0.4em rgba(0, 0, 0, 0.5);
        /* transform: scale(1.1);
        z-index: 1; */
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
            height: 40px;
            overflow: hidden;
        }

        img {
            width: auto;
            height: 200px;
            transition: all 0.5s;
            object-fit: contain;
        }
    }

    .data {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1em;
        background-color: var(--color-primary);
        width: 100%;
        border-radius: 1em;
        padding: 1em;
        color: white;
        margin-bottom: -1em;

        .info {
            display: flex;
            align-items: center;
            gap: 0.3em;
        }
    }

    .favorite {
        position: absolute;
        top: 1em;
        right: 1em;
        border-radius: 100px;
        border: none;
        cursor: pointer;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        mat-icon {
            zoom: 0.8;
        }

        &.active {
            background-color: var(--color-primary);
            color: white;
        }

        &:hover:not(.active) {
            color: var(--color-primary);
        }
    }
}
</style>