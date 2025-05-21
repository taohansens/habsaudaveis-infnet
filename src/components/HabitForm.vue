<template>
  <Modal
    v-model="isOpen"
    title="Adicionar Novo Hábito"
    @update:modelValue="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="habit-form">
      <h2 class="form-title">{{ isEditing ? 'Editar Hábito' : 'Novo Hábito' }}</h2>

      <div class="form-group">
        <label for="name">Nome do Hábito</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          required
          placeholder="Ex: Beber água"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="category">Categoria</label>
        <select id="category" v-model="formData.category" required class="form-input">
          <option value="">Selecione uma categoria</option>
          <option value="Saúde">Saúde</option>
          <option value="Fitness">Fitness</option>
          <option value="Produtividade">Produtividade</option>
          <option value="Bem-estar">Bem-estar</option>
          <option value="Aprendizado">Aprendizado</option>
        </select>
      </div>

      <div class="form-group">
        <label for="goal">Meta</label>
        <input
          type="text"
          id="goal"
          v-model="formData.goal"
          required
          placeholder="Ex: Beber 2L de água por dia"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="frequency">Frequência</label>
        <select id="frequency" v-model="formData.frequency" required class="form-input">
          <option value="">Selecione a frequência</option>
          <option value="Diário">Diário</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensal">Mensal</option>
        </select>
      </div>

      <div class="form-actions">
        <button type="button" @click="handleClose" class="cancel-button">
          Cancelar
        </button>
        <button type="submit" class="submit-button">
          {{ isEditing ? 'Salvar' : 'Adicionar' }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { useHabitsStore } from '@/stores/habits';
import Modal from './Modal.vue';

export default {
  components: {
    Modal
  },
  props: {
    habit: {
      type: Object,
      default: () => ({})
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:modelValue', 'close'],
  setup(props, { emit }) {
    const habitsStore = useHabitsStore();
    const isOpen = ref(props.modelValue);
    const isEditing = ref(!!props.habit.id);

    const formData = ref({
      name: '',
      category: '',
      goal: '',
      frequency: '',
      consecutiveDays: 0,
      totalDaysCompleted: 0,
      lastCompletedDate: null,
      completed: false
    });

    onMounted(() => {
      if (isEditing.value) {
        formData.value = { ...props.habit };
      }
    });

    watch(() => props.modelValue, (newValue) => {
      isOpen.value = newValue;
    });

    watch(isOpen, (newValue) => {
      emit('update:modelValue', newValue);
    });

    const handleSubmit = async () => {
      try {
        if (isEditing.value) {
          await habitsStore.updateHabit(props.habit.id, {
            ...formData.value,
            lastUpdated: new Date().toISOString()
          });
        } else {
          await habitsStore.addHabit(formData.value);
        }
        handleClose();
      } catch (error) {
        console.error('Erro ao salvar hábito:', error);
      }
    };

    const handleClose = () => {
      isOpen.value = false;
      emit('close');
    };

    return {
      isOpen,
      formData,
      isEditing,
      handleSubmit,
      handleClose
    };
  },
  watch: {
    modelValue(newValue) {
      this.isOpen = newValue;
    }
  }
};
</script>

<style scoped>
.habit-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.form-title {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.progress-input {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-slider {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  background: #e2e8f0;
  border-radius: 3px;
  outline: none;
}

.progress-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #3b82f6;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.progress-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
}

.progress-value {
  min-width: 48px;
  text-align: right;
  font-weight: 600;
  color: #2c3e50;
}

.checkbox-group {
  margin-top: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
}

.checkbox-text {
  color: #4b5563;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.cancel-button,
.submit-button {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.cancel-button {
  background: none;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.cancel-button:hover {
  background-color: #f8fafc;
  color: #1e293b;
}

.submit-button {
  background-color: #3b82f6;
  border: none;
  color: white;
}

.submit-button:hover {
  background-color: #2563eb;
}

@media (max-width: 640px) {
  .habit-form {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .submit-button {
    width: 100%;
  }
}
</style>
