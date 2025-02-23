<script setup lang="ts">
import type { Categories, Product } from '~/types/types'

const categories = await $fetch<Categories[]>('https://dummyjson.com/products/categories')

const items = ref()
const category = ref()
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
            <div class="actions">
                <USelectMenu highlight v-model="category" :items="items" placeholder="Categories" @change="onChange" />
                <form @submit="onSearch">
                    <UInput highlight v-model="search" color="primary" variant="outline" placeholder="Search..." />
                </form>
            </div>
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
    padding: 1em 2em;
    background-color: white;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 1;
    overflow: hidden;
}

.asidel {
    display: flex;
    align-items: center;
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

    .actions {
        display: flex;
        gap: 1em;
    }

}

@media (width<800px) {
    nav {
        gap: 1em;
    }

    .asidel {
        justify-content: center;
        gap: 1em;

        .logo {
            img {
                position: relative;
            }
        }
    }

    .asider {
        .actions {
            display: none;
        }
    }

}
</style>