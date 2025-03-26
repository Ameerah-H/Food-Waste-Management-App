<template>
  <div class="notifications-panel" v-if="isVisible">
    <div class="notifications-header">
      <h2 class="notifications-title">Messages</h2>
      <button class="trash-button">
        <Trash2 class="trash-icon" />
      </button>
    </div>
    
    <div class="tab-container">
      <div class="tabs">
        <button 
          class="tab-button" 
          :class="{ 'active': activeTab === 'inbox' }"
          @click="activeTab = 'inbox'"
        >
          Inbox
        </button>
        <button 
          class="tab-button" 
          :class="{ 'active': activeTab === 'notification' }"
          @click="activeTab = 'notification'"
        >
          Notification
        </button>
      </div>
    </div>
    
    <div class="notifications-list">
      <div 
        v-for="(notification, index) in filteredNotifications" 
        :key="index"
        class="notification-item"
        @click="readNotification(notification)"
      >
        <div class="notification-icon" :class="notification.iconClass">
          <component :is="notification.icon" class="icon" />
        </div>
        <div class="notification-content">
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-message">{{ notification.message }}</div>
        </div>
        <div class="notification-time">
          {{ notification.time }}
          <div v-if="!notification.read" class="unread-indicator"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Trash2, Bell, AlertTriangle, Truck, Info } from 'lucide-vue-next';

export default {
  name: 'NotificationsPanel',
  components: {
    Trash2,
    Bell,
    AlertTriangle,
    Truck,
    Info
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: 'notification',
      notifications: [
        {
          id: 1,
          title: 'New Update!',
          message: 'Now we have amazing features...',
          time: '2:19 PM',
          icon: 'Bell',
          iconClass: 'update-icon',
          type: 'notification',
          read: false
        },
        {
          id: 2,
          title: 'System Update',
          message: 'We will update the system tonight...',
          time: '2:03 PM',
          icon: 'AlertTriangle',
          iconClass: 'system-icon',
          type: 'notification',
          read: true
        },
        {
          id: 3,
          title: 'Delivery Order',
          message: 'Your food is on the way!',
          time: '1:39 PM',
          icon: 'Truck',
          iconClass: 'delivery-icon',
          type: 'notification',
          read: true
        },
        {
          id: 4,
          title: 'Welcome on Forre',
          message: 'Tap here for detailed info',
          time: 'Yesterday',
          icon: 'Info',
          iconClass: 'welcome-icon',
          type: 'notification',
          read: true
        },
        {
          id: 5,
          title: 'New Message',
          message: 'You have a new message from John',
          time: '3:45 PM',
          icon: 'Bell',
          iconClass: 'message-icon',
          type: 'inbox',
          read: false
        }
      ]
    };
  },
  computed: {
    filteredNotifications() {
      return this.notifications.filter(notification => notification.type === this.activeTab);
    }
  },
  methods: {
    readNotification(notification) {
      // Mark notification as read
      notification.read = true;
      
      // Handle notification click (e.g., navigate to a specific page)
      this.$emit('notification-clicked', notification);
    }
  }
};
</script>

<style>
.notifications-panel {
  position: absolute;
  top: 60px;
  right: 10px;
  width: 90%;
  max-width: 350px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
}

.notifications-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
}

.notifications-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.trash-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.trash-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.tab-container {
  padding: 10px 20px;
}

.tabs {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 30px;
  padding: 3px;
}

.tab-button {
  flex: 1;
  background: none;
  border: none;
  padding: 10px;
  border-radius: 30px;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
}

.tab-button.active {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

.notifications-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}

.icon {
  width: 18px;
  height: 18px;
  color: white;
}

.update-icon, .system-icon {
  background-color: #4285F4;
}

.delivery-icon {
  background-color: #34A853;
}

.welcome-icon {
  background-color: #FBBC05;
}

.message-icon {
  background-color: #EA4335;
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 600;
  margin-bottom: 5px;
}

.notification-message {
  font-size: 14px;
  color: #666;
}

.notification-time {
  font-size: 12px;
  color: #999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  min-width: 60px;
}

.unread-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #EA4335;
  margin-top: 5px;
}
</style>