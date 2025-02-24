<script setup lang="ts">
import type { Product } from '~/types/types';

const { product } = defineProps<{ product: Product }>()
const favorites = favoriteCookie().products
if (favorites) {
    product.favorite = favorites.value.find(value => value.id === product.id)?.favorite
}


</script>

<template>
    <div class="product">

        <!-- <UCarousel v-if="product.images" v-slot="{ item }" :arrows="product.images.length > 1" :items="product.images"
            wheel-gestures>
            <NuxtImg :src="item" />
        </UCarousel> -->

        <div class="gallery">
            <NuxtImg v-for="image of product.images" :src="image" />
        </div>


        <div class="main">
            <h3 class="title">{{ product.title }}</h3>
            <div class="description">{{ product.description }}</div>

            <div class="actions">
                <button class="price" @click="addCart(product)">
                    <span>Buy {{ product.price }}</span>
                    <Icon name="material-symbols:euro" />
                </button>
                <button class="favorite" :class="{ active: product?.favorite }" title="Favorite"
                    @click="onFavorite(product)">
                    <Icon name="material-symbols:favorite" />
                </button>
            </div>



            <div class="information">
                <h3>Informations</h3>
                <div class="infos">
                    <div>
                        <span class="label">Discount:</span> {{ product.discountPercentage }}
                    </div>
                    <div>
                        <span class="label">Brand:</span> {{ product.brand }}
                    </div>
                    <div>
                        <span class="label">Warranty:</span> {{ product.warrantyInformation }}
                    </div>
                    <div>
                        <span class="label">Shipping:</span> {{ product.shippingInformation }}
                    </div>
                    <div>
                        <span class="label">Return:</span> {{ product.returnPolicy }}
                    </div>
                </div>
            </div>

            <div class="reviews">
                <h3>Reviews</h3>
                <div v-for="review of product.reviews" class="review">
                    <UAvatar src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png" alt="Avatar" />
                    <div class="infos">
                        <div class="block">
                            <div>{{ review.reviewerName }}</div>
                            <div>{{ review.comment }}</div>
                        </div>
                        <small>{{ new Date(review.date).toLocaleDateString() }}</small>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<style scoped>
.product {
    padding: 2em;
    display: flex;
    align-items: start;
    gap: 2em;
    max-width: 1000px;
    margin: auto;
}

.main {
    flex: 1;
    display: grid;
    gap: 2em;

    h3 {
        font-size: 1.2em;
        font-weight: bold;
        border-bottom: 1px solid silver;
        padding-bottom: 10px;
    }

    .title {
        font-size: 1.5em;
        font-weight: bold;
    }

    .description {
        font-size: 1em;
    }

    .information {
        display: grid;
        gap: 1em;

        .infos {
            display: flex;
            gap: 1em;
            text-wrap: nowrap;
            flex-wrap: wrap;

            .label {
                font-weight: bold;
            }
        }
    }

    .reviews {
        display: grid;
        gap: 1em;

        .review {
            display: flex;
            gap: 1em;

            &:not(:last-child) {
                border-bottom: 1px solid silver;
                padding-bottom: 10px;
            }

            .infos {
                display: flex;
                justify-content: space-between;
                flex: 1;
            }
        }
    }
}

.gallery {
    display: grid;
    gap: 1em;

    img {
        width: 200px;
        margin: auto;
        object-fit: contain;
        border-radius: 1em;
        box-shadow: 0px 0px 2px black;
    }
}

.actions {
    display: flex;
    align-items: center;
    gap: 1em;

    .price {
        display: flex;
        align-items: center;
        gap: 0.5em;
        background-color: rgb(255, 255, 255);
        padding: 1em 1.5em;
        border-radius: 100px;
        cursor: pointer;
        color: var(--ui-primary);
        background-color: var(--ui-primary);
        color: white;
        flex-wrap: nowrap;
        text-wrap: nowrap;

        .iconify {
            font-size: 1.2em;
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
    }
}
</style>
