<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <button class="add-button" @click="openModal()">
        <span class="material-icons">add</span>
        Novo Hábito
      </button>
    </div>

    <div class="dashboard-content">
      <div class="main-content">
        <div class="charts-section">
          <SimpleCharts :habits="habits" />
        </div>
        <div class="habits-section">
          <HabitList @add-habit="openModal" />
        </div>
      </div>
    </div>

    <Modal
      :modelValue="isModalOpen"
      @update:modelValue="isModalOpen = $event"
      title="Novo Hábito"
    >
      <HabitForm
        :modelValue="isModalOpen"
        :habit="selectedHabit"
        @close="closeModal"
        @habit-added="handleHabitAdded"
      />
    </Modal>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import HabitList from '@/components/HabitList.vue';
import HabitForm from '@/components/HabitForm.vue';
import SimpleCharts from '@/components/ProgressChart.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'DashboardComponent',
  components: {
    HabitList,
    HabitForm,
    SimpleCharts,
    Modal
  },
  setup() {
    const habitsStore = useHabitsStore();
    const { habits } = storeToRefs(habitsStore);
    const isModalOpen = ref(false);
    const selectedHabit = ref(null);
    const toast = useToast();

    onMounted(async () => {
      await habitsStore.fetchHabits();
      checkEmptyHabits();
    });

    const checkEmptyHabits = () => {
      if (habits.value.length === 0) {
        toast.info("Comece adicionando seu primeiro hábito!", {
          timeout: 5000,
          closeOnClick: false,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          draggable: false,
          draggablePercent: 0,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: "button",
          icon: true,
          rtl: false
        });
      }
    };

    const openModal = () => {
      selectedHabit.value = null;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      selectedHabit.value = null;
      isModalOpen.value = false;
    };

    const handleHabitAdded = (habit) => {
      toast.success(`Hábito "${habit.name}" adicionado com sucesso!`, {
        timeout: 3000
      });
    };

    return {
      habits,
      isModalOpen,
      selectedHabit,
      openModal,
      closeModal,
      handleHabitAdded
    };
  }
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 2rem;
}

.dashboard-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.add-button {
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-button .material-icons {
  font-size: 1.25rem;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  align-items: start;
}

.charts-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.habits-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .charts-section {
    order: 2;
  }

  .habits-section {
    order: 1;
  }
}

@media (max-width: 640px) {
  .dashboard {
    padding: 1rem;
  }

  .dashboard-header {
    justify-content: center;
    padding: 0;
  }

  .add-button {
    width: 100%;
    justify-content: center;
  }

  .charts-section,
  .habits-section {
    padding: 1rem;
  }
}
</style>
