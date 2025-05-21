<template>
  <div class="charts-container">
    <div class="chart-card">
      <h3>Hábitos por Categoria</h3>
      <Pie
        :data="categoryData"
        :options="chartOptions"
      />
    </div>
    <div class="chart-card">
      <h3>Hábitos por Frequência</h3>
      <Bar
        :data="frequencyData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { Pie, Bar } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default {
  name: 'SimpleCharts',
  components: {
    Pie,
    Bar
  },
  props: {
    habits: {
      type: Array,
      required: true
    }
  },
  setup(props) {
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
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF'
          ]
        }]
      };
    });

    const frequencyData = computed(() => {
      const frequencies = {};
      props.habits.forEach(habit => {
        frequencies[habit.frequency] = (frequencies[habit.frequency] || 0) + 1;
      });

      return {
        labels: Object.keys(frequencies),
        datasets: [{
          label: 'Quantidade de Hábitos',
          data: Object.values(frequencies),
          backgroundColor: '#36A2EB'
        }]
      };
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 12,
            font: {
              size: 11
            }
          }
        }
      }
    };

    return {
      categoryData,
      frequencyData,
      chartOptions
    };
  }
};
</script>

<style scoped>
.charts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.chart-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 300px;
}

.chart-card h3 {
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
  font-size: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .charts-container {
    grid-template-columns: 1fr;
  }
}
</style>
