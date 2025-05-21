<template>
  <div class="habit-list">
    <h2>Lista de Hábitos</h2>
    <div class="habits-container">
      <div v-for="habit in habits" :key="habit.id" class="habit-card">
        <div class="habit-header">
          <h3 class="habit-name">{{ habit.name }}</h3>
          <div class="habit-category">{{ habit.category }}</div>
        </div>

        <div class="habit-details">
          <p class="habit-goal">🎯 {{ habit.goal }}</p>
          <p class="habit-frequency">🔄 {{ habit.frequency }}</p>
        </div>

        <div class="habit-progress">
          <div class="progress-info">
            <span class="total-days">📅 Total de dias completados: {{ habit.totalDaysCompleted }}</span>
          </div>
        </div>

        <div class="habit-actions">
          <button
            class="complete-button"
            :class="{ 'completed': habit.completed }"
            @click="markAsCompleted(habit.id)"
            :title="habit.completed ? 'Concluir outra vez' : 'Marcar como Concluído'"
          >
            {{ habit.completed ? '✓ Concluído Hoje' : 'Marcar como Concluído' }}
          </button>
          <button class="details-button" @click="viewDetails(habit.id)">
            📋 Detalhes
          </button>
          <button class="delete-button" @click="removeHabit(habit.id)">
            🗑️ Remover
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useHabitsStore } from "@/stores/habits";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const habitsStore = useHabitsStore();
    const { habits } = storeToRefs(habitsStore);
    const router = useRouter();

    const removeHabit = (id) => {
      habitsStore.removeHabit(id);
    };

    const markAsCompleted = (id) => {
      habitsStore.markHabitAsCompleted(id);
    };

    const viewDetails = (id) => {
      router.push(`/habit/${id}`);
    };

    return {
      habits,
      removeHabit,
      markAsCompleted,
      viewDetails
    };
  },
};
</script>

<style scoped>
.habit-list {
  padding: 1rem;
}

.habits-container {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.habit-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.habit-card:hover {
  transform: translateY(-2px);
}

.habit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.habit-name {
  font-size: 1.25rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.habit-category {
  background: #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.habit-details {
  margin-bottom: 1rem;
}

.habit-goal,
.habit-frequency {
  color: #4b5563;
  margin: 0.5rem 0;
  font-size: 0.875rem;
}

.habit-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.total-days {
  color: #64748b;
  font-weight: 500;
}

.habit-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.complete-button,
.details-button,
.delete-button {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.complete-button {
  background-color: #3b82f6;
  color: white;
  flex: 1;
  position: relative;
}

.complete-button:hover {
  background-color: #2563eb;
}

.complete-button.completed {
  background-color: #22c55e;
}

.complete-button.completed:hover {
  background-color: #16a34a;
}

.complete-button[title] {
  position: relative;
}

.complete-button[title]:hover::after {
  content: attr(title);
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  background-color: #1e293b;
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  margin-bottom: 0.5rem;
  z-index: 10;
}

.complete-button[title]:hover::before {
  content: '';
  position: absolute;
  bottom: calc(100% - 5px);
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: #1e293b transparent transparent transparent;
  z-index: 10;
}

.details-button {
  background-color: #e0f2fe;
  color: #0284c7;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.details-button:hover {
  background-color: #bae6fd;
}

.delete-button {
  background-color: #fee2e2;
  color: #ef4444;
}

.delete-button:hover {
  background-color: #fecaca;
}

@media (max-width: 640px) {
  .habits-container {
    grid-template-columns: 1fr;
  }

  .habit-actions {
    flex-direction: column;
  }

  .complete-button,
  .details-button,
  .delete-button {
    width: 100%;
  }
}
</style>
