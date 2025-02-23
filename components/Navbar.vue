<script setup lang="ts">
import type { Categories, Product } from '~/types/types'

const categories = await $fetch<Categories[]>('https://dummyjson.com/products/categories')

const items = ref()
const category = ref()
// const topone = categories.filter(value => ["laptops", "vehicle", "fragrances"].includes(value.slug))
let search = ref("")
const cart = cartCookie().products

if (categories) {
    items.value = [
        ...categories.map(value => value.name)
    ]
}

function onChange() {
    navigateTo('/category/' + categories.find(value => value.name === category.value)?.slug)
}

function onSearch(event: any) {
    event.preventDefault()
    if (search.value) {
        navigateTo('/search/' + search.value)
    } else {
        navigateTo("/")
    }
}

</script>

<template>
    <nav>
        <div class="asidel">
            <div class="logo">
                <img src="/nuxt.svg" alt="" />
            </div>
            <div class="menus">
                <NuxtLink to="/products">Products</NuxtLink>
                <NuxtLink to="/favorites">Favorites</NuxtLink>
            </div>
        </div>
        <div class="asider" v-if="categories">
            <USelectMenu highlight v-model="category" :items="items" class="w-48" placeholder="Categories"
                @change="onChange" />
            <form @submit="onSearch">
                <UInput highlight v-model="search" color="primary" variant="outline" placeholder="Search..." />
            </form>
            <UChip :text="cart?.length" size="3xl" :show="cart.length > 0">
                <NuxtLink to="/cart">
                    <UButton icon="material-symbols:shopping-cart-sharp" size="xl"
                        class="font-bold rounded-full cursor-pointer" />
                </NuxtLink>
            </UChip>
        </div>
    </nav>
</template>


<style scoped>
nav {
    position: sticky;
    top: 0;
    display: flex;
    gap: 2em;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em 2em;
    background-color: white;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow: hidden;
}

.asidel {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 2em;

    .logo {
        width: 50px;
        display: flex;
        align-items: center;

        img {
            position: absolute;
            height: 60px;
        }
    }

    .menus {
        display: flex;
        overflow: hidden;
        flex: 1;
    }

    a {
        color: black;
        text-decoration: none;
        padding: .5em 1em;
        border-radius: 100px;
        font-size: bold;

        &:hover {
            color: var(--ui-primary);
        }

        &.router-link-active {
            background-color: var(--ui-primary);
            color: white;
        }
    }
}

.asider {
    display: flex;
    align-items: center;
    gap: 1em;

    .shop {
        border-radius: 100px;
        display: none;
        cursor: pointer;
    }
}

@media (max-width: 1000px) {
    nav {
        /* position: relative;
        align-items: center;
        flex-direction: column; */
    }

    .asidel {
        justify-content: center;

        .logo {
            img {
                position: relative;
            }
        }
    }

    .asider {
        /* display: none; */
    }

}
</style>