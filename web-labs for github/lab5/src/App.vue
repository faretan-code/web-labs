<template>
  <div id="app">
    <h1>User List</h1>
    <div class="toolbar">
      <button @click="filterByGender('male')">Male</button>
      <button @click="filterByGender('female')">Female</button>
      <button @click="resetFilter">Show All</button>
    </div>
    <div v-if="filteredUsers.length === 0">List of users is empty</div>
    <div v-else class="user-list">
      <UserCard
        v-for="(user, index) in filteredUsers"
        :key="index"
        :userData="user"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import UserCard from './components/UserCard.vue';

export default defineComponent({
  components: {
    UserCard,
  },
  setup() {
    const users = ref([
      {
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        age: 28,
        position: "Developer",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        hobbies: ["Coding", "Gaming"],
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        gender: "female",
        age: 22,
        position: "Designer",
        photo: "https://randomuser.me/api/portraits/women/1.jpg",
        hobbies: ["Drawing", "Traveling"],
      },
      {
        firstName: "Alice",
        lastName: "Smith",
        gender: "female",
        age: 30,
        position: "Manager",
        photo: "https://randomuser.me/api/portraits/women/2.jpg",
        hobbies: ["Photography", "Reading"],
      },
      {
        firstName: "Bob",
        lastName: "Johnson",
        gender: "male",
        age: 35,
        position: "Developer",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
        hobbies: ["Cycling", "Traveling"],
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        gender: "male",
        age: 27,
        position: "Designer",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        hobbies: ["Designing", "Gaming"],
      },
      {
        firstName: "Diana",
        lastName: "Prince",
        gender: "female",
        age: 24,
        position: "Developer",
        photo: "https://randomuser.me/api/portraits/women/3.jpg",
        hobbies: ["Coding", "Music"],
      },
      {
        firstName: "Eve",
        lastName: "Walker",
        gender: "female",
        age: 29,
        position: "Product Manager",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        hobbies: ["Reading", "Yoga"],
      },
      {
        firstName: "Frank",
        lastName: "Garcia",
        gender: "male",
        age: 40,
        position: "CEO",
        photo: "https://randomuser.me/api/portraits/men/4.jpg",
        hobbies: ["Golf", "Business"],
      },
      {
        firstName: "Grace",
        lastName: "Lee",
        gender: "female",
        age: 33,
        position: "Marketing Director",
        photo: "https://randomuser.me/api/portraits/women/5.jpg",
        hobbies: ["Public Speaking", "Blogging"],
      },
      {
        firstName: "Henry",
        lastName: "Miller",
        gender: "male",
        age: 17,
        position: "CFO",
        photo: "https://randomuser.me/api/portraits/men/5.jpg",
        hobbies: ["Investing", "Traveling"],
      },
    ]);

    const selectedGender = ref("");


    const filteredUsers = computed(() => {
      if (selectedGender.value) {
        return users.value.filter(user => user.gender === selectedGender.value);
      }
      return users.value;
    });


    const filterByGender = (gender: string) => {
      selectedGender.value = gender;
    };


    const resetFilter = () => {
      selectedGender.value = "";
    };

    return {
      filteredUsers,
      filterByGender,
      resetFilter,
    };
  },
});
</script>

<style scoped>
/* Вирівнювання контенту */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}


.toolbar {
  margin-bottom: 20px;
}

button {
  background-color: #5e00ff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}


.user-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  width: 100%;
  max-width: 1200px;
}


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
}

.user-card:hover {
  transform: scale(1.05);
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
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  margin: 5px 0;
  padding: 5px;
  font-size: 14px;
}

</style>
