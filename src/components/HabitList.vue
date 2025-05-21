<template>
  <div class="habit-list">
    <h2>Lista de Hábitos</h2>
    <div class="habits-container">
      <div v-if="habits.length === 0" class="empty-state">
        <span class="material-icons">add_task</span>
        <h3>Nenhum hábito cadastrado</h3>
        <p>Comece adicionando seu primeiro hábito para começar a trilhar seu caminho para uma vida mais saudável!</p>
        <button class="add-first-button" @click="$emit('add-habit')">
          <span class="material-icons">add</span>
          Adicionar Primeiro Hábito
        </button>
      </div>

      <div v-else class="habits-grid">
        <div v-for="habit in habits" :key="habit.id" class="habit-card">
          <div class="habit-header">
            <h3 class="habit-name">{{ habit.name }}</h3>
            <div class="habit-category">{{ habit.category }}</div>
          </div>

          <div class="habit-details">
            <p class="habit-goal">
              <span class="material-icons">flag</span>
              {{ habit.goal }}
            </p>
            <p class="habit-frequency">
              <span class="material-icons">repeat</span>
              {{ habit.frequency }}
            </p>
          </div>

          <div class="habit-progress">
            <div class="progress-info">
              <span class="total-days">
                <span class="material-icons">calendar_today</span>
                Total de vezes: {{ habit.totalDaysCompleted }}
              </span>
            </div>
          </div>

          <div class="habit-actions">
            <button
              class="complete-button"
              :class="{ 'completed': habit.completed }"
              @click="markAsCompleted(habit.id)"
              :title="habit.completed ? 'Concluir outra vez' : 'Marcar como Concluído'"
            >
              <span class="material-icons">{{ habit.completed ? 'check_circle' : 'radio_button_unchecked' }}</span>
              {{ habit.completed ? 'Concluído Hoje' : 'Marcar como Concluído' }}
            </button>
            <button class="details-button" @click="viewDetails(habit.id)">
              <span class="material-icons">info</span>
            </button>
            <button class="delete-button" @click="removeHabit(habit.id)">
              <span class="material-icons">delete</span>
            </button>
          </div>
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
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.habit-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.habit-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.habit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.habit-name {
  font-size: 1.25rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
  flex: 1;
}

.habit-category {
  background: #e2e8f0;
  color: #64748b;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.habit-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.habit-goal,
.habit-frequency {
  color: #4b5563;
  margin: 0;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.habit-goal .material-icons,
.habit-frequency .material-icons,
.total-days .material-icons {
  font-size: 1.25rem;
  color: #64748b;
}

.habit-progress {
  margin: 0.5rem 0;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  background: #f8fafc;
  padding: 0.75rem;
  border-radius: 8px;
}

.total-days {
  color: #64748b;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.habit-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: auto;
}

.complete-button,
.details-button,
.delete-button {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.complete-button {
  background-color: #3b82f6;
  color: white;
  flex: 1;
  min-width: 160px;
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
  padding: 0.75rem;
  min-width: 48px;
}

.details-button:hover {
  background-color: #bae6fd;
}

.delete-button {
  background-color: #fee2e2;
  color: #ef4444;
  padding: 0.75rem;
  min-width: 48px;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.empty-state .material-icons {
  font-size: 4rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #64748b;
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.6;
}

.add-first-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-first-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.add-first-button .material-icons {
  font-size: 1.25rem;
  color: white;
  margin: 0;
}

@media (max-width: 640px) {
  .empty-state {
    padding: 2rem 1rem;
  }

  .empty-state .material-icons {
    font-size: 3rem;
  }

  .empty-state h3 {
    font-size: 1.25rem;
  }

  .empty-state p {
    font-size: 0.95rem;
  }
}
</style>
