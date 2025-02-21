<script setup lang="ts">
import type { Product } from '~/types/types';

const modal = useModal()

defineProps<{
    product: Product
}>()

</script>

<template>
    <UModal :title="product.title" :description="product.description">
        <template #content>
            <UCard>
                <template #header>
                    <h3 class="title">{{ product.title }}</h3>
                </template>
                <div class="description">{{ product.description }}</div>
                <div class="stock">Stock {{ product.stock }}</div>
                <UCarousel v-slot="{ item }" dots :items="product.images" class="gallery w-full max-w-xs mx-auto">
                    <img :src="item">
                </UCarousel>
                <template #footer>
                    <div class="actions">
                        <span class="price">Price {{ product.price }}
                            <Icon name="material-symbols:euro" />
                        </span>
                        <button class="favorite" @click="modal.close()">
                            <Icon name="material-symbols:favorite" />
                            <span>{{ product.favorite ? "Remove" : "Add" }}</span>
                        </button>
                    </div>
                </template>
            </UCard>
        </template>

    </UModal>
</template>

<style scoped>
.title {
    font-size: 1.5em;
}

.actions {
    background-color: var(--color-primary);
    color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 1em;
    padding: 1em 2em;
}

.description {
    font-size: 1.2em;
}

.stock {
    margin-top: 1em;
}

.gallery {
    margin-bottom: 20px;

    img {
        border-radius: 1em;
        width: 400px;
        height: 400px;
        object-fit: contain;
    }
}

/* .gallery {
    display: flex;
    overflow-y: hidden;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    height: 40vh;
    position: relative;
    margin-top: -20px;

    &::-webkit-scrollbar {
        display: none;
    }

    img {
        scroll-snap-align: center;
        width: max-content;
        height: 100%;
        min-width: 100%;
        object-fit: contain;
    }
} */

.radios {
    display: flex;
    justify-content: center;

    button {
        border: none;
        background-color: transparent;
        cursor: pointer;
        opacity: 0.6;
        zoom: 0.7;
        color: var(--color-primary);
    }
}


.price {
    display: flex;
    align-items: center;
    gap: 0.5em;

    mat-icon {
        zoom: 0.8;
    }
}

.favorite {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: var(--color-primary);
    background-color: white;
    border: none;
    border-radius: 100px;
    padding: 1em;
    cursor: pointer;
}
</style>
