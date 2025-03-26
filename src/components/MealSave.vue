<template>
  <div>
    <!-- Home Page -->
    <div v-if="currentRoute === 'home'" class="main-container">
      <!-- Top Navigation -->
      <header class="header">
        <div class="header-content">
          <h1 class="heading">MealSave</h1>
          <div class="icon-group">
            <div class="notification-wrapper">
              <Bell class="icon" @click="toggleNotifications" />
              <span v-if="unreadNotificationsCount > 0" class="notification-badge">
                {{ unreadNotificationsCount }}
              </span>
              <NotificationsPanel 
                :isVisible="showNotifications" 
                @notification-clicked="handleNotificationClick"
              />
            </div>
            <UserCircle class="icon" />
          </div>
        </div>

        <!-- Search Bar -->
        <div class="search-bar-container">
          <Search class="search-icon" />
          <input type="text" placeholder="Search here" class="search-bar" />
          <button class="search-button">
            <SlidersHorizontal class="search-settings-icon" />
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Donation Banner -->
        <div class="donation-banner">
          <h3 class="donation-heading">Have food at Home to Donate?</h3>
          <p class="donation-description">Be first in your neighbourhood</p>
          <button class="donate-button">Donate</button>
        </div>

        <!-- Categories Section -->
        <section class="categories-section">
          <h3 class="section-heading">Categories</h3>
          <div class="categories-list">
            <div v-for="category in categories" :key="category.name" class="category-item">
              <img :src="category.image" :alt="category.name" class="category-img" />
              <span class="category-name">{{ category.name }}</span>
            </div>
          </div>
        </section>

        <!-- Open Restaurants -->
        <section class="open-restaurants-section">
          <h3 class="section-heading">Open Restaurants</h3>
          <div class="restaurant-list">
            <div class="restaurant-card" @click="navigateToRestaurant('1')" style="cursor: pointer">
              <img :src="restaurantImage" alt="Restaurant" class="restaurant-image" />
              <div class="restaurant-details">
                <h4 class="restaurant-name">Rose Garden Restaurant</h4>
                <p class="restaurant-categories">Burger - Chicken - Rice - Wings</p>
                <div class="restaurant-info">
                  <div class="rating">
                    <Star class="star-icon filled" />
                    <span>4.7</span>
                  </div>
                  <div class="delivery-info">
                    <Truck class="delivery-icon" />
                    <span>Free</span>
                  </div>
                  <div class="time-info">
                    <Clock class="time-icon" />
                    <span>20 min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Bottom Navigation -->
        <nav class="bottom-nav">
          <div class="bottom-nav-items">
            <a href="#" class="nav-item active">
              <Home class="nav-icon" />
              <span class="nav-text">Home</span>
            </a>
            <a href="#" class="nav-item" @click.prevent="navigateToBlog">
              <FileText class="nav-icon" />
              <span class="nav-text">Blog</span>
            </a>
            <a href="#" class="nav-item">
              <User class="nav-icon" />
              <span class="nav-text">Profile</span>
            </a>
            <a href="#" class="nav-item">
              <Menu class="nav-icon" />
              <span class="nav-text">Menu</span>
            </a>
          </div>
        </nav>
      </main>
    </div>

    <!-- Restaurant Page -->
    <div v-else-if="currentRoute === 'restaurant'">
      <Restaurant :restaurantId="currentRestaurantId" @navigate="handleNavigation" />
    </div>

    <!-- Blog Page -->
    <div v-else-if="currentRoute === 'blog'">
      <Blog @navigate="handleNavigation" />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import {
  Bell,
  UserCircle,
  Search,
  SlidersHorizontal,
  Star,
  Home,
  User,
  Menu,
  ChevronRight,
  Flame,
  Truck,
  Clock,
  FileText
} from 'lucide-vue-next';
import Restaurant from './Restaurant.vue';
import Blog from './Blog.vue';
import NotificationsPanel from './Notifications.vue';

// Assets
import logo from '../assets/logo.png';

// Reactive State
const currentRoute = ref('home');
const currentRestaurantId = ref(null);
const showNotifications = ref(false);
const unreadNotificationsCount = ref(2);

// Categories
const categories = ref([
  { name: 'Restaurant', image: logo },
  { name: 'Cafe', image: logo },
  { name: 'Bakery', image: logo },
  { name: 'Groceries', image: logo }
]);

// Placeholder for restaurant image
const restaurantImage = ref('/path/to/restaurant-image.jpg');

// Navigation Functions
const navigateToRestaurant = (restaurantId) => {
  console.log('Navigating to restaurant:', restaurantId);
  currentRestaurantId.value = restaurantId;
  currentRoute.value = 'restaurant';
};

const navigateToBlog = () => {
  console.log('Navigating to blog');
  currentRoute.value = 'blog';
};

const handleNavigation = (route, restaurantId = null) => {
  console.log('Handling navigation to:', route);
  currentRoute.value = route;
  if (restaurantId) {
    currentRestaurantId.value = restaurantId;
  }
};

// Notification Functions
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;

  if (showNotifications.value) {
    document.addEventListener('click', closeNotificationsOnClickOutside);
  } else {
    document.removeEventListener('click', closeNotificationsOnClickOutside);
  }
};

const closeNotificationsOnClickOutside = (event) => {
  const notificationPanel = document.querySelector('.notifications-panel');
  const bellIcon = document.querySelector('.notification-wrapper .icon');

  if (
    notificationPanel &&
    !notificationPanel.contains(event.target) &&
    event.target !== bellIcon
  ) {
    showNotifications.value = false;
    document.removeEventListener('click', closeNotificationsOnClickOutside);
  }
};

const handleNotificationClick = (notification) => {
  console.log('Notification clicked:', notification);

  if (notification.title === 'Delivery Order') {
    // currentRoute.value = 'order-tracking';
  } else if (notification.title === 'Welcome on Forre') {
    // currentRoute.value = 'welcome';
  }

  showNotifications.value = false;
};

// Cleanup event listener when component unmounts
onBeforeUnmount(() => {
  document.removeEventListener('click', closeNotificationsOnClickOutside);
});
</script>
