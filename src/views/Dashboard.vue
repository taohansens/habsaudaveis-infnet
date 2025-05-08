<template>
    <div class="dashboard">
      <h1>Dashboard</h1>
      <HabitList :habits="habits" />

      <button @click="showForm = !showForm" class="add-habit-btn">
        <i class="fa fa-plus"></i> Adicionar Hábito
      </button>

      <HabitForm v-if="showForm" @habit-added="habitAdded" />
    </div>
  </template>
  
<script>
import HabitList from "@/components/HabitList.vue";
import HabitForm from "@/components/HabitForm.vue";
import { useHabitsStore } from "@/stores/habits";

export default {
  components: { HabitList, HabitForm },
  setup() {
    const habitsStore = useHabitsStore();
    habitsStore.fetchHabits();

    return {
      habits: habitsStore.habits,
    };
  },
  data() {
    return {
      showForm: false, // Controla se o formulário é exibido
    };
  },
  methods: {
    habitAdded() {
      this.showForm = false; // Fecha o formulário após adicionar o hábito
    }
  }
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
}

/* Estilo do botão */
.add-habit-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-habit-btn i {
  font-size: 1.5rem;
}

.add-habit-btn:hover {
  background-color: #45a049;
}

/* Responsividade */
@media (max-width: 600px) {
  .dashboard {
    padding: 0 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .add-habit-btn {
    font-size: 1rem;
    padding: 0.5rem;
  }
}
</style>