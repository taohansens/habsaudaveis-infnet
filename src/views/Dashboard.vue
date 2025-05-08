<template>
  <div>
    <h1>Dashboard</h1>
    <HabitList :habits="habits" />
  </div>
</template>

<script>
import HabitList from "@/components/HabitList.vue";
import { useHabitsStore } from "@/store/habits";

export default {
  components: { HabitList },
  setup() {
    const habitsStore = useHabitsStore();
    habitsStore.fetchHabits();

    return {
      habits: habitsStore.habits,
    };
  },
};
</script>
