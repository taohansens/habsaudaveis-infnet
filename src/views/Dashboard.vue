<template>
    <div>
      <h1>Dashboard</h1>
      <HabitList :habits="habits" />
    </div>
  </template>
  
  <script>
  import HabitList from "@/components/HabitList.vue";
  import { getHabits } from "@/services/api";
  
  export default {
    components: { HabitList },
    data() {
      return {
        habits: [],
      };
    },
    async created() {
      const response = await getHabits();
      this.habits = response.data;
    },
  };
  </script>
  