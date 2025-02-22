<script setup lang="ts">
import type { Categories } from '~/types/types'

const categories = await $fetch<Categories[]>('https://dummyjson.com/products/categories')

const items = ref()
const category = ref("Category")
const topone = categories.filter(value => ["laptops", "vehicle", "fragrances"].includes(value.slug))
let search = ref("")

if (categories) {
    items.value = [
        "Category",
        ...categories.map(value => value.name)
    ]
}

function onChange() {
    navigateTo({
        path: '/category/' + categories.find(value => value.name === category.value).slug
    }
    )
}
function onSearch(event) {
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
                <NuxtLink to="/">Products</NuxtLink>
                <NuxtLink v-for="menu in topone" :to="'/category/' + menu.slug">{{ menu.name }}</NuxtLink>
            </div>
        </div>
        <div class="asider" v-if="categories">
            <USelectMenu v-model="category" :items="items" class="w-48" @change="onChange" />
            <form @submit="onSearch">
                <UInput v-model="search" color="primary" variant="outline" placeholder="Search..." />
            </form>

            <UChip :text="0" size="3xl">
                <UButton icon="material-symbols:shop-rounded" size="xl" class="font-bold rounded-full cursor-pointer" />
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

@media (max-width: 500px) {
    nav {
        position: relative;
        align-items: center;
        flex-direction: column;
    }

    .asidel {
        justify-content: center;

        .logo {
            img {
                position: relative;
            }
        }
    }

}
</style>