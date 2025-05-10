<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const categories = await $fetch<any[]>('https://dummyjson.com/products/categories')

const half = Math.ceil(categories.length / 2);
const firstHalfCategories = categories.slice(0, half);
const secondHalfCategories = categories.slice(half);

const items = ref<NavigationMenuItem[]>([
    // {
    //     label: 'Home',
    //     icon: 'i-lucide-home',
    //     to: '/products',
    // },
    {
        label: 'Latest',
        icon: 'i-lucide-book-open-check',
        children: firstHalfCategories.map((category) => ({
            label: category.name,
            icon: 'i-lucide-book-copy',
            to: `/category/${category.slug}`,
        })),
    },
    {
        label: 'Deal',
        icon: 'i-lucide-book-open-check',
        children: secondHalfCategories.map((category) => ({
            label: category.name,
            icon: 'i-lucide-book-copy',
            to: `/category/${category.slug}`,
        })),
    },
    {
        label: 'Favorite',
        icon: 'i-lucide-folder-heart',
        to: '/favorites',
    },
])

let search = ref("")

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
    <div
        class="flex items-center justify-between gap-4 sticky top-4 z-10 bg-white shadow-md py-2 px-5 rounded-full mb-8">
        <div class="w-full">
            <ULink to="/" class="flex items-center gap-2">
                <NuxtImg src="/nuxt.svg" width="50" />
                <h1 class="text-xl font-bold text-nowrap">Nuxt Store</h1>
                <UNavigationMenu :items="items" variant="link" class="w-full gap-4" />
            </ULink>
        </div>
        <form @submit="onSearch">
            <UInput v-model="search" icon="i-lucide-search" placeholder="Search..." variant="subtle"
                class="w-[200px] rounded-full" />
        </form>
        <ULink to="/account" active-class="font-bold" inactive-class="text-muted" class="flex items-center gap-2">
            <UIcon name="i-lucide-circle-user-round" />
            <span>Account</span>
        </ULink>
        <UButton to="/cart" label="Cart" icon="i-lucide-shopping-cart" class="rounded-full" variant="outline"
            active-color="primary" active-variant="solid" />
    </div>
</template>
