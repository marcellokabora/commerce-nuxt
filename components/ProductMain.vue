<script setup lang="ts">
import type { Product } from '~/types/types';
import { addCart } from '~/composables/cookies';

const { product } = defineProps<{ product: Product }>()
const favorites = favoriteCookie().products
const toast = useToast()

if (favorites) {
    product.favorite = favorites.value.find(value => value.id === product.id)?.favorite
}

function onAddToCart() {
    addCart(product);
    toast.add({
        title: product.title + ' added to the cart.',
        icon: "material-symbols:add-shopping-cart"
    })
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
                <button class="price" @click="onAddToCart">
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
                <div v-for="(review, index) of product.reviews" class="review">
                    <UAvatar :src="`https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_${(index % 5) + 1}.png`"
                        alt="Avatar" />
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
    gap: 3em;
    max-width: 1200px;
    margin: auto;
    background: white;
    border-radius: 16px;
}

.main {
    flex: 1;
    display: grid;
    gap: 2.5em;

    h3 {
        font-size: 1.4em;
        font-weight: 600;
        border-bottom: 2px solid var(--ui-primary);
        padding-bottom: 12px;
        color: #2c3e50;
    }

    .title {
        font-size: 2em;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.5em;
    }

    .description {
        font-size: 1.1em;
        line-height: 1.6;
        color: #4a4a4a;
    }

    .information {
        display: grid;
        gap: 1.5em;
        background: #f8f9fa;
        padding: 1.5em;
        border-radius: 12px;

        .infos {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5em;

            .label {
                font-weight: 600;
                color: var(--ui-primary);
            }
        }
    }

    .reviews {
        display: grid;
        gap: 1.5em;

        .review {
            display: flex;
            gap: 1.5em;
            padding: 1.5em;
            background: #f8f9fa;
            border-radius: 12px;
            transition: transform 0.2s;

            &:hover {
                transform: translateY(-2px);
            }

            &:not(:last-child) {
                margin-bottom: 1em;
            }

            .infos {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
                flex: 1;

                .block {
                    div:first-child {
                        font-weight: 600;
                        color: #2c3e50;
                    }

                    div:last-child {
                        color: #4a4a4a;
                        line-height: 1.5;
                    }
                }

                small {
                    color: #6c757d;
                    font-size: 0.9em;
                }
            }
        }
    }
}

.gallery {
    display: grid;
    gap: 1.5em;
    width: 400px;
    position: sticky;
    top: 2em;

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;

        &:hover {
            transform: scale(1.02);
        }
    }
}

.actions {
    display: flex;
    align-items: center;
    gap: 1.5em;
    margin-top: 1em;

    .price {
        display: flex;
        align-items: center;
        gap: 0.5em;
        padding: 1em 2em;
        border-radius: 50px;
        cursor: pointer;
        background-color: var(--ui-primary);
        color: white;
        font-weight: 600;
        font-size: 1.1em;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .iconify {
            font-size: 1.2em;
        }
    }

    .favorite {
        border-radius: 50%;
        border: none;
        cursor: pointer;
        height: 48px;
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;

        &.active {
            background-color: var(--ui-primary);
            color: white;
        }

        &:hover:not(.active) {
            color: var(--ui-primary);
            transform: scale(1.1);
        }
    }
}

@media (max-width: 768px) {
    .product {
        flex-direction: column;
        padding: 1em;
    }

    .gallery {
        width: 100%;
        position: static;
    }
}
</style>
