export const categories = [
    {
        slug: "beauty",
        name: "Beauty",
        icon: "i-lucide-sparkles",
        description: "Explore a wide range of beauty products to enhance your look."
    },
    {
        slug: "fragrances",
        name: "Fragrances",
        icon: "i-lucide-milk",
        description: "Discover captivating fragrances for every occasion."
    },
    {
        slug: "furniture",
        name: "Furniture",
        icon: "i-lucide-armchair",
        description: "Find stylish and comfortable furniture for your home."
    },
    {
        slug: "groceries",
        name: "Groceries",
        icon: "i-lucide-shopping-bag",
        description: "Shop for daily essentials and fresh groceries."
    },
    {
        slug: "home-decoration",
        name: "Home Decoration",
        icon: "i-lucide-home",
        description: "Beautify your living space with our home decor items."
    },
    {
        slug: "kitchen-accessories",
        name: "Kitchen Accessories",
        icon: "i-lucide-utensils",
        description: "Upgrade your kitchen with our premium accessories."
    },
    {
        slug: "laptops",
        name: "Laptops",
        icon: "i-lucide-laptop",
        description: "Browse the latest laptops for work and play."
    },
    {
        slug: "mens-shirts",
        name: "Mens Shirts",
        icon: "i-lucide-shirt",
        description: "Stylish and comfortable shirts for men."
    },
    {
        slug: "mens-shoes",
        name: "Mens Shoes",
        icon: "i-lucide-footprints",
        description: "Durable and trendy shoes for men."
    },
    {
        slug: "mens-watches",
        name: "Mens Watches",
        icon: "i-lucide-watch",
        description: "Elegant watches to complement your style."
    },
    {
        slug: "mobile-accessories",
        name: "Mobile Accessories",
        icon: "i-lucide-phone",
        description: "Enhance your mobile experience with our accessories."
    },
    {
        slug: "motorcycle",
        name: "Motorcycle",
        icon: "i-lucide-bike",
        description: "Gear up with our motorcycle essentials."
    },
    {
        slug: "skin-care",
        name: "Skin Care",
        icon: "i-lucide-droplet",
        description: "Nourish your skin with our skincare products."
    },
    {
        slug: "smartphones",
        name: "Smartphones",
        icon: "i-lucide-smartphone",
        description: "Find the latest smartphones with cutting-edge features."
    },
    {
        slug: "sports-accessories",
        name: "Sports Accessories",
        icon: "i-lucide-volleyball",
        description: "Gear up for your favorite sports activities."
    },
    {
        slug: "sunglasses",
        name: "Sunglasses",
        icon: "i-lucide-glasses",
        description: "Protect your eyes with stylish sunglasses."
    },
    {
        slug: "tablets",
        name: "Tablets",
        icon: "i-lucide-tablet",
        description: "Discover versatile tablets for work and entertainment."
    },
    {
        slug: "tops",
        name: "Tops",
        icon: "i-lucide-shirt",
        description: "Trendy tops for every occasion."
    },
    {
        slug: "vehicle",
        name: "Vehicle",
        icon: "i-lucide-car",
        description: "Explore our range of vehicle-related products."
    },
    {
        slug: "womens-bags",
        name: "Womens Bags",
        icon: "i-lucide-shopping-bag",
        description: "Chic and functional bags for women."
    },
    {
        slug: "womens-dresses",
        name: "Womens Dresses",
        icon: "i-lucide-book-user",
        description: "Elegant dresses for every occasion."
    },
    {
        slug: "womens-jewellery",
        name: "Womens Jewellery",
        icon: "i-lucide-diamond",
        description: "Exquisite jewellery to enhance your beauty."
    },
    {
        slug: "womens-shoes",
        name: "Womens Shoes",
        icon: "i-lucide-footprints",
        description: "Stylish and comfortable shoes for women."
    },
    {
        slug: "womens-watches",
        name: "Womens Watches",
        icon: "i-lucide-watch",
        description: "Timeless watches for women."
    }
];

export const categoriesByType = {
    electronicsAndFashion: ["laptops", "smartphones", "tablets", "mens-shirts", "mens-shoes", "mens-watches", "womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"],
    homeAndBeauty: ["furniture", "home-decoration", "kitchen-accessories", "beauty", "fragrances", "skin-care"],
    sportsAndOthers: ["sports-accessories", "motorcycle", "groceries", "vehicle", "sunglasses", "mobile-accessories", "tops"]
};

export const categoriesMenu = [
    {
        label: 'Electronics & Fashion',
        icon: 'lucide:tablet-smartphone',
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
        icon: 'lucide:house-plug',
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
]