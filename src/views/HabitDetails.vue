<template>
  <div class="habit-details-container">
    <div v-if="habit" class="habit-details-card">
      <div class="habit-header">
        <h2 class="habit-title">{{ habit.name }}</h2>
        <div class="habit-category">{{ habit.category }}</div>
      </div>

      <div class="habit-info">
        <div class="info-section">
          <h3>Meta</h3>
          <p class="info-value">
            <span class="material-icons">flag</span>
            {{ habit.goal }}
          </p>
        </div>

        <div class="info-section">
          <h3>Frequência</h3>
          <p class="info-value">
            <span class="material-icons">repeat</span>
            {{ habit.frequency }}
          </p>
        </div>

        <div class="info-section">
          <h3>Progresso</h3>
          <div class="progress-stats">
            <div class="stat-item">
              <span class="stat-label">Total de dias completados:</span>
              <span class="stat-value">
                <span class="material-icons">calendar_today</span>
                {{ habit.totalDaysCompleted }}
              </span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Última conclusão:</span>
              <span class="stat-value">
                <span class="material-icons">event</span>
                {{ formatDate(habit.lastUpdated) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="habit-actions">
        <button class="back-button" @click="goBack">
          <span class="material-icons">arrow_back</span>
          Voltar
        </button>
        <button
          class="complete-button"
          :class="{ 'completed': habit.completed }"
          @click="markAsCompleted(habit.id)"
          :title="habit.completed ? 'Concluir outra vez' : 'Marcar como Concluído'"
        >
          <span class="material-icons">{{ habit.completed ? 'check_circle' : 'radio_button_unchecked' }}</span>
          {{ habit.completed ? 'Concluído Hoje' : 'Marcar como Concluído' }}
        </button>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>Hábito não encontrado</h2>
      <p>O hábito que você está procurando não existe ou foi removido.</p>
      <button class="back-button" @click="goBack">
        <span class="material-icons">arrow_back</span>
        Voltar para a lista
      </button>
    </div>
  </div>
</template>

<script>
import { useHabitsStore } from "@/stores/habits";
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const habitsStore = useHabitsStore();
    const route = useRoute();
    const router = useRouter();

    const habit = computed(() => habitsStore.habitById(route.params.id));

    onMounted(() => {
      habitsStore.fetchHabits();
    });

    const formatDate = (dateString) => {
      if (!dateString) return 'Nunca';
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Nunca';
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Nunca';
      }
    };

    const goBack = () => {
      router.push('/');
    };

    const markAsCompleted = (id) => {
      habitsStore.markHabitAsCompleted(id);
    };

    return {
      habit,
      formatDate,
      goBack,
      markAsCompleted
    };
  },
};
</script>

<style scoped>
.habit-details-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.habit-details-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.habit-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.habit-title {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
}

.habit-category {
  background: #e2e8f0;
  color: #64748b;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 1rem;
  font-weight: 500;
}

.habit-info {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-section {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 8px;
}

.info-section h3 {
  color: #64748b;
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.info-value {
  color: #2c3e50;
  font-size: 1.125rem;
  margin: 0;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-value .material-icons {
  font-size: 1.5rem;
  color: #64748b;
}

.progress-stats {
  display: grid;
  gap: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: #64748b;
  font-size: 0.875rem;
}

.stat-value {
  color: #2c3e50;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-value .material-icons {
  font-size: 1.25rem;
  color: #64748b;
}

.habit-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.back-button {
  background: none;
  border: 1px solid #e2e8f0;
  color: #64748b;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button:hover {
  background-color: #f8fafc;
  color: #1e293b;
}

.back-button .material-icons {
  font-size: 1.25rem;
}

.complete-button {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

.complete-button .material-icons {
  font-size: 1.25rem;
}

.not-found {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.not-found h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.not-found p {
  color: #64748b;
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .habit-details-container {
    padding: 1rem;
  }

  .habit-details-card {
    padding: 1.5rem;
  }

  .habit-header {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .habit-actions {
    flex-direction: column;
  }

  .back-button,
  .complete-button {
    width: 100%;
  }
}
</style>
