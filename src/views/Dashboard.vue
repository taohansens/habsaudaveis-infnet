<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard de Hábitos Saudáveis</h1>
      <button class="add-button" @click="openModal()">
        <span class="material-icons">add</span>
        Novo Hábito
      </button>
    </div>

    <div class="dashboard-content">
      <div class="main-content">
        <HabitList />
        <SimpleCharts :habits="habits" />
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
      />
    </Modal>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import { storeToRefs } from 'pinia';
import HabitList from '@/components/HabitList.vue';
import HabitForm from '@/components/HabitForm.vue';
import SimpleCharts from '@/components/SimpleCharts.vue';
import Modal from '@/components/Modal.vue';

export default {
  name: 'DashboardView',
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

    onMounted(async () => {
      await habitsStore.fetchHabits();
    });

    const openModal = () => {
      selectedHabit.value = null;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      selectedHabit.value = null;
      isModalOpen.value = false;
    };

    return {
      habits,
      isModalOpen,
      selectedHabit,
      openModal,
      closeModal
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
  font-weight: 600;
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
}

.add-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.add-button .material-icons {
  font-size: 1.25rem;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 640px) {
  .dashboard {
    padding: 1rem;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: stretch;
  }

  .dashboard-header h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  .add-button {
    justify-content: center;
  }
}
</style>
