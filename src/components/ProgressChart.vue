<template>
  <div class="charts-container">
    <div v-if="!habits || habits.length === 0" class="empty-charts">
      <span class="material-icons">bar_chart</span>
      <h3>Sem dados para exibir</h3>
      <p>Adicione hábitos para ver suas estatísticas e progresso</p>
    </div>
    <div v-else class="charts-grid">
      <div class="chart-card">
        <h3>Distribuição por Categoria</h3>
        <Pie :data="categoryData" :options="chartOptions" />
      </div>
      <div class="chart-card">
        <h3>Status dos Hábitos</h3>
        <Pie :data="completionData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export default {
  name: 'SimpleCharts',
  components: {
    Pie
  },
  props: {
    habits: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          padding: 20
        }
      }
    };

    const categoryData = computed(() => {
      const categories = {};
      props.habits.forEach(habit => {
        categories[habit.category] = (categories[habit.category] || 0) + 1;
      });

      return {
        labels: Object.keys(categories),
        datasets: [{
          data: Object.values(categories),
          backgroundColor: [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6'
          ]
        }]
      };
    });

    const completionData = computed(() => {
      const completed = props.habits.filter(habit => habit.completed).length;
      const pending = props.habits.length - completed;

      return {
        labels: ['Concluídos', 'Pendentes'],
        datasets: [{
          data: [completed, pending],
          backgroundColor: ['#10b981', '#ef4444']
        }]
      };
    });

    return {
      chartOptions,
      categoryData,
      completionData
    };
  }
};
</script>

<style scoped>
.charts-container {
  width: 100%;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 400px;
}

.chart-card h3 {
  color: #1e293b;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.empty-charts {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  height: 400px;
}

.empty-charts .material-icons {
  font-size: 4rem;
  color: #94a3b8;
  margin-bottom: 1rem;
}

.empty-charts h3 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.empty-charts p {
  color: #64748b;
  max-width: 300px;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }

  .chart-card {
    height: 350px;
  }

  .empty-charts {
    padding: 2rem 1rem;
    height: 350px;
  }

  .empty-charts .material-icons {
    font-size: 3rem;
  }

  .empty-charts h3 {
    font-size: 1.25rem;
  }

  .empty-charts p {
    font-size: 0.95rem;
  }
}
</style>
