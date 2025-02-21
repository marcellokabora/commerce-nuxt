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
                <UCarousel v-slot="{ item }" :arrows="product.images.length > 1" :items="product.images"
                    class="gallery w-full max-w-xs mx-auto">
                    <NuxtImg width="400px" height="400px" :src="item" />
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
    font-size: 1.2em;
}

.actions {
    background-color: var(--color-primary);
    color: white;
    display: flex;
    justify-content: space-between;
    border-radius: 1em;
    padding: 1em 1.5em;
}

.description {
    font-size: 1em;
}

.stock {
    margin-top: 1em;
}

.gallery {
    img {
        border-radius: 1em;
        width: 400px;
        height: 400px;
        max-height: 40vh;
        object-fit: contain;
    }
}

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
    padding: .7em 1em;
    cursor: pointer;
}
</style>
