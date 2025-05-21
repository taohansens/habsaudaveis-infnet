<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <button @click="showForm = true" class="add-habit-btn">
        <span class="material-icons">add</span>
        Adicionar Hábito
      </button>
    </div>

    <HabitList :habits="habits" />
    <HabitForm v-model="showForm" />
  </div>
</template>

<script>
import { ref } from 'vue';
import HabitList from "@/components/HabitList.vue";
import HabitForm from "@/components/HabitForm.vue";
import { useHabitsStore } from "@/stores/habits";
import { storeToRefs } from "pinia";

export default {
  components: { HabitList, HabitForm },
  setup() {
    const habitsStore = useHabitsStore();
    const { habits } = storeToRefs(habitsStore);
    const showForm = ref(false);

    habitsStore.fetchHabits();

    return {
      habits,
      showForm
    };
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

h1 {
  color: var(--text-color);
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.add-habit-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.add-habit-btn:hover {
  background-color: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.add-habit-btn .material-icons {
  font-size: 1.25rem;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }

  h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  .add-habit-btn {
    justify-content: center;
  }
}
</style>
