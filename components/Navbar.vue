<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { cartCookie } from '~/composables/cookies';

const items = ref<NavigationMenuItem[]>([
    {
        label: 'Electronics & Fashion',
        icon: 'i-lucide-smartphone',
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
        icon: 'i-lucide-home',
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
        icon: 'i-lucide-activity',
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

const { products } = cartCookie();

</script>

<template>
    <div
        class="flex items-center justify-between gap-4 sticky top-4 z-10 bg-white shadow-md py-2 px-5 rounded-full mb-8">
        <div class="w-full flex items-center gap-10">
            <ULink to="/" class="flex items-center gap-2">
                <NuxtImg src="/nuxt.svg" width="50" />
                <h1 class="text-xl font-bold text-nowrap">Ecommerce</h1>
            </ULink>
            <UNavigationMenu :items="items" variant="link" class="w-full gap-4" />
        </div>
        <form @submit="onSearch">
            <UInput v-model="search" icon="i-lucide-search" placeholder="Search..." variant="subtle"
                class="w-[200px] rounded-full" />
        </form>
        <ULink to="/favorites" class="flex items-center gap-2">
            <UIcon name="i-lucide-heart" color="errror" />
            <!-- <span>Favorite</span> -->
        </ULink>
        <div class="relative">
            <UButton to="/cart" label="Cart" icon="i-lucide-shopping-cart" class="rounded-full" variant="outline"
                active-color="primary" active-variant="solid">
            </UButton>
            <UBadge v-if="products.length > 0" :label="products.length" class="absolute -top-2 -right-2 rounded-full"
                variant="solid" size="sm" />
        </div>
    </div>
</template>
