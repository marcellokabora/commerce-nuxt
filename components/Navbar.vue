<script setup lang="ts">
import { USlideover } from '#components';
import type { NavigationMenuItem } from '@nuxt/ui'
import { cartCookie } from '~/composables/cookies';

const { products } = cartCookie();

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
                <h1 class="text-xl font-bold text-nowrap">Ecommerce</h1>
            </ULink>
            <UNavigationMenu :items="categoriesMenu" variant="link" class="w-full gap-4 hidden lg:block" />
        </div>
        <div class="items-center gap-4 hidden lg:flex">
            <form @submit="onSearch">
                <UInput v-model="search" icon="i-lucide-search" placeholder="Search..." variant="subtle"
                    class="w-[200px] rounded-full" />
            </form>
            <ULink to="/favorites" class="flex items-center gap-2">
                <UIcon name="i-lucide-heart" color="errror" />
            </ULink>
            <div class="relative">
                <UButton to="/cart" label="Cart" icon="i-lucide-shopping-cart" class="rounded-full" variant="outline"
                    active-color="primary" active-variant="solid" />
                <UBadge v-if="products.length > 0" :label="products.length"
                    class="absolute -top-2 -right-2 rounded-full" variant="solid" size="sm" />
            </div>
        </div>
        <USlideover>
            <UButton label="Menu" icon="i-lucide-menu " color="neutral" variant="subtle" class="lg:hidden" />
            <template #content>
                <Placeholder class="h-full m-4" />
            </template>
        </USlideover>
    </div>
</template>
