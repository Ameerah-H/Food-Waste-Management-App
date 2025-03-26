<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="modal-header">
        <div class="user-info">
          <img :src="userAvatar" alt="User Avatar" class="user-avatar" />
          <span class="user-name">{{ userName }}</span>
        </div>
        <button class="close-button" @click="closeModal">
          <X class="close-icon" />
        </button>
      </div>
      
      <div class="modal-body">
        <textarea 
          v-model="postContent" 
          class="post-textarea" 
          placeholder="Write your post or question here"
        ></textarea>
        
        <div class="modal-actions">
          <div class="left-actions">
            <button class="action-button">
              <Image class="action-icon" />
              <span>Add media</span>
            </button>
            
            <div class="category-dropdown">
              <button class="action-button">
                <Tag class="action-icon" />
                <span>Add Category</span>
                <ChevronDown class="dropdown-icon" />
              </button>
            </div>
          </div>
          
          <button 
            class="post-button" 
            :disabled="!postContent.trim()" 
            @click="createPost"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { X, Image, Tag, ChevronDown } from 'lucide-vue-next';

export default {
  name: 'CreatePostModal',
  components: {
    X,
    Image,
    Tag,
    ChevronDown
  },
  data() {
    return {
      userName: 'John Doe',
      userAvatar: '/path/to/user-avatar.jpg', // Replace with actual path
      postContent: '',
      selectedCategory: null
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    createPost() {
      if (!this.postContent.trim()) return;
      
      // Create a new post object
      const newPost = {
        id: Date.now(), // Simple unique ID
        userName: this.userName,
        userAvatar: this.userAvatar,
        category: this.selectedCategory || 'General',
        timeAgo: 'Just now',
        content: this.postContent,
        comments: 0,
        likes: 0,
        userLiked: false
      };
      
      // Emit event with the new post
      this.$emit('post-created', newPost);
      
      // Reset form
      this.postContent = '';
      this.selectedCategory = null;
    }
  }
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 90%;
  max-width: 500px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.close-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.modal-body {
  padding: 15px;
}

.post-textarea {
  width: 100%;
  min-height: 150px;
  border: none;
  resize: none;
  padding: 10px;
  font-size: 16px;
  font-family: inherit;
  border-radius: 10px;
  background-color: #f8f8f8;
  margin-bottom: 15px;
}

.post-textarea:focus {
  outline: none;
  background-color: #f0f0f0;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-actions {
  display: flex;
  gap: 10px;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  color: #666;
}

.action-button:hover {
  background-color: #f0f0f0;
}

.action-icon {
  width: 18px;
  height: 18px;
}

.dropdown-icon {
  width: 14px;
  height: 14px;
  margin-left: 5px;
}

.post-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
}

.post-button:disabled {
  background-color: #b3d7ff;
  cursor: not-allowed;
}
</style>