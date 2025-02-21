<script setup lang="ts">
import type { Categories } from '~/types/types';

const categories = await $fetch<Categories[]>('https://dummyjson.com/products/categories')

const items = ref()
const value = ref("All")

if (categories) {
    items.value = [
        "All",
        ...categories.map(value => value.name)
    ]
}

</script>

<template>
    <nav>
        <div class="asidel">
            <NuxtLink to="/"><img src="/logo.svg" alt="" /></NuxtLink>
            <NuxtLink to="/">Products</NuxtLink>
            <NuxtLink to="/favorite">Favorites</NuxtLink>
        </div>
        <form class="asider" v-if="categories">
            <div class="label">Filter</div>
            <USelectMenu v-model="value" :items="items" class="w-48" />
        </form>
    </nav>
</template>


<style scoped>
nav {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1em;
    padding: 0 2em;
    background-color: white;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    z-index: 1;

    .asidel {
        display: flex;
        align-items: center;
        flex-wrap: wrap;

        img {
            height: 50px;
            border-radius: 1em;
            background-color: var(--color-primary);
            padding: 15px 20px;
        }

        a {
            color: black;
            text-decoration: none;
            padding: 1em;
            border-radius: 100px;
            font-size: bold;

            &:hover {
                color: var(--color-primary);
            }

            &.active {
                background-color: var(--color-primary);
                color: white;
            }
        }
    }

    .asider {
        display: flex;
        align-items: center;
        gap: 1em;

        mat-form-field {
            margin-top: 1em;
            min-width: 250px;
        }
    }

    @media (max-width: 500px) {
        position: relative;
        align-items: center;
        flex-direction: column;

        .asidel {
            justify-content: center;

            img {
                width: 100%;
                margin: 0;
            }
        }

        .asider {
            .label {
                display: none;
            }
        }
    }
}
</style>