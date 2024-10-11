<template>
  <div :class="['user-card', ageClass]">
    <img :src="userData.photo" alt="User Photo" />
    <h3>{{ userData.firstName }} {{ userData.lastName }}</h3>
    <p>{{ userData.position }}</p>
    <p v-if="userData.age > 18">Age: {{ userData.age }}</p>
    <ul class="hobbies">
      <li v-for="(hobby, index) in userData.hobbies" :key="index">{{ hobby }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const ageClass = computed(() => {
      if (props.userData.age < 25) {
        return 'young';
      } else if (props.userData.age >= 25 && props.userData.age < 35) {
        return 'middle-aged';
      } else {
        return 'senior';
      }
    });

    return {
      ageClass,
    };
  },
});
</script>

<style scoped>
/* Універсальні стилі для картки */
.user-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 250px;
  transition: transform 0.3s ease;
  color: #000;
}

.user-card:hover {
  transform: scale(1.05);
}


.user-card.young {
  background-color: #e0f7fa;
}

.user-card.middle-aged {
  background-color: #f6dcb2;
}

.user-card.senior {
  background-color: #e2ffc3;
}


.user-card img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}


.user-card h3 {
  margin: 10px 0;
  color: #000;
}

.user-card p {
  color: #000;
}

.user-card .hobbies {
  list-style: none;
  padding: 0;
}

.user-card .hobbies li {
  background-color: #11ff00;
  color: white;
  border-radius: 5px;
  margin: 5px 0;
  padding: 5px;
  font-size: 14px;
}

</style>
