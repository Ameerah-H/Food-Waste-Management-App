<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Top Navigation -->
      <header class="px-4 py-3 bg-white">
        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-angelos text-black tracking-wide transform -rotate-2">
            MealSave
          </h1>
          <div class="flex items-center gap-4">
            <Bell class="w-6 h-6 text-gray-700" />
            <UserCircle class="w-6 h-6 text-gray-700" />
          </div>
        </div>
        
        <!-- Search Bar -->
        <div class="relative mt-3">
          <Search class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search here" 
            class="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-green-500"
          />
          <button class="absolute right-3 top-2">
            <SlidersHorizontal class="w-5 h-5 text-green-600" />
          </button>
        </div>
      </header>
  
      <!-- Rest of the content remains the same -->
      <main class="px-4 py-3">
        <!-- Donation Banner -->
        <div class="bg-green-600 text-white rounded-xl p-4 mb-6">
          <h3 class="text-lg font-medium">Have food at Home to Donate?</h3>
          <p class="text-sm opacity-90 mb-2">Be first in your neighbourhood</p>
          <button class="bg-white text-green-600 px-4 py-1 rounded-full text-sm font-medium">
            Donate
          </button>
        </div>
  
        <!-- Carousel Indicators -->
        <div class="flex justify-center gap-1 mb-6">
          <div class="w-2 h-2 rounded-full bg-green-600"></div>
          <div class="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
  
        <!-- Categories -->
        <section class="mb-6">
          <h3 class="text-lg font-medium mb-4">Categories</h3>
          <div class="flex justify-between">
            <div v-for="category in categories" :key="category.name" class="text-center">
              <div class="w-16 h-16 rounded-full overflow-hidden mb-2">
                <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" />
              </div>
              <span class="text-sm">{{ category.name }}</span>
            </div>
          </div>
        </section>
  
        <!-- Recommended Section -->
        <section class="mb-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">Recommended for you</h3>
            <a href="#" class="text-green-600 text-sm">See all</a>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="item in recommendedItems" :key="item.id" class="bg-white rounded-xl overflow-hidden shadow-sm">
              <img :src="item.image" :alt="item.title" class="w-full h-32 object-cover" />
              <div class="p-3">
                <h4 class="font-medium">{{ item.title }}</h4>
                <p class="text-sm text-gray-500">{{ item.time }}</p>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-green-600 font-medium">{{ item.price }}</span>
                  <div class="flex items-center gap-1">
                    <Star class="w-4 h-4 text-yellow-400 fill-current" />
                    <span class="text-sm">{{ item.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Bottom Navigation -->
        <nav class="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-3">
          <div class="flex justify-between items-center">
            <a href="#" class="flex flex-col items-center text-green-600">
              <Home class="w-6 h-6" />
              <span class="text-xs mt-1">Home</span>
            </a>
            <a href="#" class="flex flex-col items-center text-gray-400">
              <Map class="w-6 h-6" />
              <span class="text-xs mt-1">Map</span>
            </a>
            <a href="#" class="flex flex-col items-center text-gray-400">
              <User class="w-6 h-6" />
              <span class="text-xs mt-1">Profile</span>
            </a>
            <a href="#" class="flex flex-col items-center text-gray-400">
              <Menu class="w-6 h-6" />
              <span class="text-xs mt-1">Menu</span>
            </a>
          </div>
        </nav>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { 
    Bell, 
    UserCircle, 
    Search, 
    SlidersHorizontal,
    Star,
    Home,
    Map,
    User,
    Menu
  } from 'lucide-vue-next'
  
  const categories = ref([
    { name: 'Restaurant', image: '/placeholder.svg?height=64&width=64' },
    { name: 'Cafe', image: '/placeholder.svg?height=64&width=64' },
    { name: 'Bakery', image: '/placeholder.svg?height=64&width=64' },
    { name: 'Groceries', image: '/placeholder.svg?height=64&width=64' }
  ])
  
  const recommendedItems = ref([
    {
      id: 1,
      title: 'Surprise Bag',
      time: 'Collect tomorrow: 12:50 AM - 01:55 AM',
      price: '4.99$',
      rating: '4.8',
      image: '/placeholder.svg?height=128&width=256'
    },
    {
      id: 2,
      title: 'Surprise Bag',
      time: 'Collect tomorrow: 12:50 AM - 01:55 AM',
      price: '4.99$',
      rating: '4.8',
      image: '/placeholder.svg?height=128&width=256'
    }
  ])
  </script>
  
  <style>
  @font-face {
    font-family: 'Angelos';
    src: url('./Angelos.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  
  .font-angelos {
    font-family: 'Angelos', cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  </style>