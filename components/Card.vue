<script setup lang="ts">
import type { Product } from '~/types/types';

const { product } = defineProps<{ product: Product }>()

function addCart() {
    console.log(product);
}

</script>

<template>
    <div class="product">
        <div class="container">
            <NuxtLink :to="'product/' + product.id">
                <NuxtImg :src="product.thumbnail" alt={{product.id}} />
                <div class="title">{{ product.title }}</div>
            </NuxtLink>
            <div class="infos" @click="addCart">
                <div>Buy</div>
                <div class="info">
                    <span>{{ product.price }}</span>
                    <Icon name="material-symbols:euro" />
                </div>
            </div>
        </div>
        <div class="actions">
            <button class="favorite" :class="{ active: product.active }" title="Favorite">
                <Icon name="material-symbols:favorite" />
            </button>

            <UModal>
                <button class="favorite" :class="{ active: product.active }" title="Preview">
                    <Icon name="material-symbols:visibility" />
                </button>
                <template #content>
                    <Product :product="product" />
                </template>
            </UModal>
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
    /* box-shadow: 0px 0px 0px 0.2em rgba(255, 255, 255, 0.2); */

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
            transition: all 0.5s;
            object-fit: contain;
        }
    }

    .infos {
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

    .actions {
        position: absolute;
        top: 1em;
        right: 1em;
        display: grid;
        gap: 1em;
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