<template>
    <div class="fixed inset-0">
        <div class="w-full h-full bg-cover bg-center bg-no-repeat transform scale-110 blur-sm"
            style="background-image: url('/shop.webp')">
        </div>
    </div>

    <div class="relative bg-cover bg-center pt-40">
        <div class="relative flex flex-col items-center justify-center h-full">
            <h1 class="text-4xl font-bold mb-4 text-white">Welcome to Our Product Store!</h1>
            <p class="text-lg text-center max-w-md text-white">
                Discover the best products tailored just for you. Click below to explore our collection and find
                what
                you love!
            </p>
            <UButton to="/products" size="xl" class="mt-10">
                Explore Products
            </UButton>
        </div>
    </div>
</template>
