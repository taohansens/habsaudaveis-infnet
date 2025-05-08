<template>
  <div>
    <h2>Lista de Hábitos</h2>
    <ul>
      <li v-for="habit in habits" :key="habit.id">
        {{ habit.name }} - {{ habit.category }}
        <button @click="removeHabit(habit.id)">Remover</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useHabitsStore } from "@/stores/habits";
import { storeToRefs } from "pinia";

export default {
  setup() {
    const habitsStore = useHabitsStore();
    const { habits } = storeToRefs(habitsStore);
    
    const removeHabit = (id) => {
      habitsStore.removeHabit(id);
    };

    return {
      habits,
      removeHabit,
    };
  },
};
</script>
