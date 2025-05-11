<script setup lang="ts">
import { USlideover } from '#components';
import type { NavigationMenuItem } from '@nuxt/ui'

const categoriesByType = {
    electronicsAndFashion: ["laptops", "smartphones", "tablets", "mens-shirts", "mens-shoes", "mens-watches", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"],
    homeAndBeauty: ["furniture", "home-decoration", "kitchen-accessories", "beauty", "fragrances", "skin-care"],
    sportsAndOthers: ["sports-accessories", "motorcycle", "groceries", "vehicle", "sunglasses", "mobile-accessories", "tops"]
};

const items = ref<NavigationMenuItem[]>([
    {
        label: 'Electronics & Fashion',
        icon: 'i-lucide-smartphone', // Updated to a more relevant icon
        children: categories
            .filter(category => categoriesByType.electronicsAndFashion.includes(category.slug))
            .map(category => ({
                label: category.name,
                icon: category.icon,
                description: category.description,
                to: `/category/${category.slug}`
            }))
    },
    {
        label: 'Home & Beauty',
        icon: 'i-lucide-home', // Updated to a more relevant icon
        children: categories
            .filter(category => categoriesByType.homeAndBeauty.includes(category.slug))
            .map(category => ({
                label: category.name,
                icon: category.icon,
                description: category.description,
                to: `/category/${category.slug}`
            }))
    },
    {
        label: 'Sports & Others',
        icon: 'i-lucide-activity', // Updated to a more relevant icon
        children: categories
            .filter(category => categoriesByType.sportsAndOthers.includes(category.slug))
            .map(category => ({
                label: category.name,
                icon: category.icon,
                description: category.description,
                to: `/category/${category.slug}`
            }))
    }
]);

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
        <div class="w-full flex items-center gap-10">
            <ULink to="/" class="flex items-center gap-2">
                <NuxtImg src="/nuxt.svg" width="50" />
                <h1 class="text-xl font-bold text-nowrap">Nuxt Store</h1>
            </ULink>
            <UNavigationMenu :items="items" variant="link" class="w-full gap-4 hidden lg:block" />
        </div>
        <div class="items-center gap-10 hidden lg:flex">
            <form @submit="onSearch">
                <UInput v-model="search" icon="i-lucide-search" placeholder="Search..." variant="subtle"
                    class="w-[200px] rounded-full" />
            </form>
            <ULink to="/favorites" class="flex items-center gap-2">
                <UIcon name="i-lucide-heart" color="errror" />
                <!-- <span>Favorite</span> -->
            </ULink>
            <UButton to="/cart" label="Cart" icon="i-lucide-shopping-cart" class="rounded-full" variant="outline"
                active-color="primary" active-variant="solid" />
        </div>
        <USlideover>
            <UButton label="Menu" icon="i-lucide-menu " color="neutral" variant="subtle" class="lg:hidden" />
            <template #content>
                <Placeholder class="h-full m-4" />
            </template>
        </USlideover>


    </div>
</template>
