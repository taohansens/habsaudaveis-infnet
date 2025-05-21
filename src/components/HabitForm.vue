<template>
  <Modal
    v-model="isOpen"
    title="Adicionar Novo Hábito"
    @update:modelValue="handleClose"
  >
    <form @submit.prevent="handleSubmit" class="habit-form">
      <div class="form-content">
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
  name: 'HabitForm',
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
  emits: ['close', 'update:modelValue'],
  setup(props, { emit }) {
    const habitsStore = useHabitsStore();
    const isOpen = ref(props.modelValue);
    const isEditing = ref(props.habit && props.habit.id ? true : false);

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
      if (isEditing.value && props.habit) {
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
        if (isEditing.value && props.habit) {
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
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.form-content {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4b5563;
  font-weight: 500;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #94a3b8;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f8fafc;
  border-top: 1px solid #e2e8f0;
  border-radius: 0 0 12px 12px;
}

.cancel-button,
.submit-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  cursor: pointer;
  min-width: 100px;
}

.cancel-button {
  background: white;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.cancel-button:hover {
  background-color: #f1f5f9;
  color: #1e293b;
  border-color: #cbd5e1;
}

.submit-button {
  background-color: #3b82f6;
  border: none;
  color: white;
}

.submit-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

@media (max-width: 640px) {
  .habit-form {
    max-width: 100%;
  }

  .form-content {
    padding: 1rem;
  }

  .form-actions {
    padding: 1rem;
    flex-direction: column;
  }

  .cancel-button,
  .submit-button {
    width: 100%;
  }
}
</style>
