<template>
  <div class="restaurant-detail-container">
    <!-- Header Image with Navigation -->
    <div class="restaurant-header">
      <img
        :src="restaurant.headerImage"
        alt="Restaurant Header"
        class="header-image"
      />
      <div class="header-overlay">
        <button class="nav-button back-button" @click="goBack">
          <ChevronLeft class="nav-icon" />
        </button>
        <button class="nav-button menu-button">
          <MoreHorizontal class="nav-icon" />
        </button>
      </div>
    </div>

    <!-- Restaurant Info -->
    <div class="restaurant-info-container">
      <div class="restaurant-metrics">
        <div class="metric">
          <Star class="metric-icon star" />
          <span>{{ restaurant.rating }}</span>
        </div>
        <div class="metric">
          <MapPin class="metric-icon" />
          <span>{{ restaurant.delivery }}</span>
        </div>
        <div class="metric">
          <Clock class="metric-icon" />
          <span>{{ restaurant.time }}</span>
        </div>
      </div>

      <h1 class="restaurant-title">{{ restaurant.name }}</h1>
      <p class="restaurant-description">{{ restaurant.description }}</p>

      <!-- Food Gallery -->
      <div class="food-gallery">
        <div
          v-for="(item, index) in restaurant.foodItems"
          :key="index"
          class="food-item"
        >
          <img :src="item.image" :alt="item.name" class="food-image" />
        </div>
      </div>

      <!-- Other Restaurants -->
      <div class="other-restaurants">
        <div
          v-for="(item, index) in otherRestaurants"
          :key="index"
          class="other-restaurant-item"
          @click="navigateToRestaurant(item)"
        >
          <div class="other-restaurant-content">
            <h3 class="other-restaurant-name">{{ item.name }}</h3>
            <p class="other-restaurant-categories">{{ item.categories }}</p>
            <div class="other-restaurant-metrics">
              <div class="metric">
                <Star class="metric-icon star" />
                <span>{{ item.rating }}</span>
              </div>
              <div class="metric">
                <Truck class="metric-icon" />
                <span>{{ item.delivery }}</span>
              </div>
              <div class="metric">
                <Clock class="metric-icon" />
                <span>{{ item.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ChevronLeft,
  MoreHorizontal,
  Star,
  MapPin,
  Clock,
  Truck,
} from "lucide-vue-next";

export default {
  name: "Restaurant",
  components: {
    ChevronLeft,
    MoreHorizontal,
    Star,
    MapPin,
    Clock,
    Truck,
  },
  props: {
    restaurantId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      restaurant: {
        id: "1",
        name: "Spicy Restaurant",
        description:
          "Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.",
        rating: "4.7",
        delivery: "Free",
        time: "20 min",
        headerImage: "/path/to/restaurant-header.jpg", // Replace with actual path
        foodItems: [
          { name: "Dish 1", image: "/path/to/dish1.jpg" }, // Replace with actual paths
          { name: "Dish 2", image: "/path/to/dish2.jpg" },
          { name: "Dish 3", image: "/path/to/dish3.jpg" },
        ],
      },
      otherRestaurants: [
        {
          id: "2",
          name: "Rose Garden Restaurant",
          categories: "Burger - Chiken - Riche - Wings",
          rating: "4.7",
          delivery: "Free",
          time: "20 min",
          image: "/path/to/rose-garden.jpg", // Replace with actual path
        },
      ],
    };
  },
  methods: {
    goBack() {
      console.log("Going back to home");
      this.$emit("navigate", "home");
    },
    navigateToRestaurant(restaurant) {
      console.log("Navigating to another restaurant:", restaurant.id);
      this.$emit("navigate", "restaurant", restaurant.id);
    },
  },
  mounted() {
    console.log(`Loading restaurant with ID: ${this.restaurantId}`);
    // In a real app, you would fetch restaurant data here
  },
};
</script>
