<template>
  <div class="progress-chart">
    <h2 class="chart-title">Progresso Geral</h2>

    <div class="chart-stats">
      <div class="stat-card">
        <span class="material-icons">trending_up</span>
        <div class="stat-info">
          <span class="stat-value">{{ totalDaysCompleted }}</span>
          <span class="stat-label">Total de Dias Completados</span>
        </div>
      </div>

      <div class="stat-card">
        <span class="material-icons">whatshot</span>
        <div class="stat-info">
          <span class="stat-value">{{ maxConsecutiveDays }}</span>
          <span class="stat-label">Maior Sequência</span>
        </div>
      </div>
    </div>

    <div class="chart-container">
      <div v-for="habit in habits" :key="habit.id" class="habit-progress-item">
        <div class="habit-info">
          <span class="habit-name">{{ habit.name }}</span>
          <div class="habit-stats">
            <span class="consecutive-days" :class="getStreakClass(habit.consecutiveDays)">
              🔥 {{ habit.consecutiveDays }} dias
            </span>
            <span class="total-days">📅 {{ habit.totalDaysCompleted }} total</span>
          </div>
        </div>
        <div class="streak-bar-container">
          <div
            class="streak-bar"
            :style="{ width: getStreakPercentage(habit.consecutiveDays) + '%' }"
            :class="getStreakClass(habit.consecutiveDays)"
          ></div>
        </div>
      </div>
    </div>

    <div class="chart-legend">
      <div class="legend-item">
        <div class="legend-color streak-beginner"></div>
        <span>Iniciante (1-3 dias)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color streak-intermediate"></div>
        <span>Intermediário (4-7 dias)</span>
      </div>
      <div class="legend-item">
        <div class="legend-color streak-expert"></div>
        <span>Expert (8+ dias)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import { storeToRefs } from 'pinia';

export default {
  name: 'ProgressChart',
  setup() {
    const habitsStore = useHabitsStore();
    const { habits } = storeToRefs(habitsStore);

    const totalDaysCompleted = computed(() => {
      return habits.value.reduce((acc, habit) => acc + habit.totalDaysCompleted, 0);
    });

    const maxConsecutiveDays = computed(() => {
      return Math.max(...habits.value.map(habit => habit.consecutiveDays), 0);
    });

    const getStreakClass = (days) => {
      if (days >= 8) return 'streak-expert';
      if (days >= 4) return 'streak-intermediate';
      return 'streak-beginner';
    };

    const getStreakPercentage = (days) => {
      // Máximo de 30 dias para a barra de progresso
      return Math.min((days / 30) * 100, 100);
    };

    return {
      habits,
      totalDaysCompleted,
      maxConsecutiveDays,
      getStreakClass,
      getStreakPercentage
    };
  }
};
</script>

<style scoped>
.progress-chart {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 1.25rem;
  color: #2c3e50;
  margin: 0 0 1.5rem 0;
  font-weight: 600;
}

.chart-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 8px;
}

.stat-card .material-icons {
  font-size: 2rem;
  color: #3b82f6;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
}

.chart-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.habit-progress-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.habit-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.habit-name {
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
}

.habit-stats {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.consecutive-days,
.total-days {
  font-size: 0.875rem;
  font-weight: 500;
}

.consecutive-days {
  color: #f97316;
}

.total-days {
  color: #64748b;
}

.streak-bar-container {
  width: 100%;
  height: 6px;
  background-color: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.streak-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.streak-beginner {
  background: linear-gradient(90deg, #f97316 0%, #ea580c 100%);
}

.streak-intermediate {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
}

.streak-expert {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
}

.legend-color.streak-beginner {
  background: linear-gradient(90deg, #f97316 0%, #ea580c 100%);
}

.legend-color.streak-intermediate {
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
}

.legend-color.streak-expert {
  background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-item span {
  font-size: 0.75rem;
  color: #64748b;
}

@media (max-width: 640px) {
  .progress-chart {
    padding: 1rem;
  }

  .chart-stats {
    grid-template-columns: 1fr;
  }

  .chart-legend {
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
  }
}
</style>
