<template>
  <div class="blog-container">
    <header class="blog-header">
      <h1 class="blog-title">BLOG</h1>
    </header>

    <div class="create-post-button" @click="openCreatePostModal">
      <span>Create Post</span>
      <Plus class="plus-icon" />
    </div>

    <div class="blog-posts">
      <div v-for="(post, index) in blogPosts" :key="index" class="blog-post">
        <div class="post-header">
          <div class="user-info">
            <img :src="post.userAvatar" alt="User Avatar" class="user-avatar" />
            <div class="post-meta">
              <div class="post-author">
                <span class="author-name">{{ post.userName }}</span> posted in 
                <span class="post-category">{{ post.category }}</span>
              </div>
              <div class="post-time">
                <Clock class="time-icon" />
                <span>{{ post.timeAgo }}</span>
                <span v-if="post.userBadge" class="user-badge">{{ post.userBadge }}</span>
              </div>
            </div>
          </div>
          <Flag class="flag-icon" />
        </div>

        <div class="post-content">
          <p class="post-text">{{ post.content }}</p>
          <div v-if="post.recipeTitle" class="recipe-title">{{ post.recipeTitle }}</div>
          <div v-if="post.recipeUrl" class="recipe-url">{{ post.recipeUrl }}</div>
          <img v-if="post.image" :src="post.image" alt="Post Image" class="post-image" />
        </div>

        <div class="post-actions">
          <div class="post-action">
            <MessageSquare class="action-icon" />
            <span>{{ post.comments }} comments</span>
          </div>
          <div class="post-action">
            <Heart class="action-icon" :class="{ 'liked': post.userLiked }" />
            <span>{{ post.likes }} likes</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Post Modal -->
    <CreatePostModal 
      v-if="showCreatePostModal" 
      @close="closeCreatePostModal"
      @post-created="handlePostCreated"
    />
  </div>
</template>

<script>
import { Plus, Clock, Flag, MessageSquare, Heart } from 'lucide-vue-next';
import CreatePostModal from './PostModal.vue';

export default {
  name: 'Blog',
  components: {
    Plus,
    Clock,
    Flag,
    MessageSquare,
    Heart,
    CreatePostModal
  },
  data() {
    return {
      showCreatePostModal: false,
      blogPosts: [
        {
          id: 1,
          userName: 'Heather',
          userAvatar: '/path/to/avatar.jpg', // Replace with actual path
          category: 'Recipes',
          timeAgo: '10 minutes ago',
          userBadge: 'Newbie',
          content: 'Tomato season soon - very simple and tasty recipe that only uses 6 ingredients - bread like sourdough, garlic clove, tomatoes, basil, olive oil and salt. Great for snacks and starters.',
          recipeTitle: 'Garlicky bruschetta recipe',
          recipeUrl: 'https://www.theguardian.com/food/2018/...',
          image: '/path/to/bruschetta.jpg', // Replace with actual path
          comments: 3,
          likes: 2,
          userLiked: false
        }
      ]
    };
  },
  methods: {
    openCreatePostModal() {
      this.showCreatePostModal = true;
    },
    closeCreatePostModal() {
      this.showCreatePostModal = false;
    },
    handlePostCreated(newPost) {
      // Add the new post to the beginning of the posts array
      this.blogPosts.unshift(newPost);
      this.closeCreatePostModal();
    }
  }
};
</script>

<style>
.blog-container {
  padding: 20px;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.blog-header {
  text-align: center;
  margin-bottom: 20px;
}

.blog-title {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
}

.create-post-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7d6868;
  color: #1a1a1a;
  padding: 15px 20px;
  border-radius: 30px;
  margin-bottom: 20px;
  cursor: pointer;
  font-weight: 600;
}

.plus-icon {
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  padding: 5px;
  box-sizing: content-box;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.blog-post {
  background-color: #fff;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.user-info {
  display: flex;
  gap: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.post-meta {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.post-author {
  font-size: 14px;
}

.author-name, .post-category {
  font-weight: 600;
}

.post-time {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #666;
}

.time-icon {
  width: 12px;
  height: 12px;
}

.user-badge {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
  font-size: 10px;
}

.flag-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.post-content {
  margin-bottom: 15px;
}

.post-text {
  margin-bottom: 10px;
  line-height: 1.5;
}

.recipe-title {
  font-weight: 600;
  color: #6a5acd;
  margin-bottom: 5px;
}

.recipe-url {
  color: #6a5acd;
  font-size: 12px;
  margin-bottom: 10px;
}

.post-image {
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
}

.post-actions {
  display: flex;
  gap: 20px;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

.post-action {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 14px;
}

.action-icon {
  width: 18px;
  height: 18px;
}

.action-icon.liked {
  color: #ff4d4d;
  fill: #ff4d4d;
}
</style>