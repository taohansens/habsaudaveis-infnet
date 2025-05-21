import { defineStore } from "pinia";
import { getHabits, addHabit, deleteHabit, updateHabit } from "@/services/api";

export const useHabitsStore = defineStore("habits", {
  state: () => ({
    habits: [],
    loading: false,
    error: null
  }),

  getters: {
    habitById: (state) => (id) => state.habits.find((h) => h.id === id)
  },

  actions: {
    async fetchHabits() {
      this.loading = true;
      try {
        const { data } = await getHabits();
        this.habits = data;
        this.error = null;
      } catch (error) {
        this.error = "Erro ao buscar hábitos";
        console.error("Erro ao buscar hábitos:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addHabit(habit) {
      this.loading = true;
      try {
        const { data } = await addHabit(habit);
        this.habits.push(data);
        this.error = null;
        return data;
      } catch (error) {
        this.error = "Erro ao adicionar hábito";
        console.error("Erro ao adicionar hábito:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async removeHabit(id) {
      this.loading = true;
      try {
        await deleteHabit(id);
        this.habits = this.habits.filter(habit => habit.id !== id);
        this.error = null;
      } catch (error) {
        this.error = "Erro ao deletar hábito";
        console.error("Erro ao deletar hábito:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async markHabitAsCompleted(id) {
      this.loading = true;
      try {
        const habit = this.habits.find(h => h.id === id);
        if (!habit) return;

        const updatedHabit = {
          ...habit,
          completed: !habit.completed,
          totalDaysCompleted: habit.completed ? habit.totalDaysCompleted - 1 : habit.totalDaysCompleted + 1,
          lastUpdated: new Date().toISOString()
        };

        return await this.updateHabit(id, updatedHabit);
      } catch (error) {
        this.error = "Erro ao marcar hábito como concluído";
        console.error("Erro ao marcar hábito como concluído:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateHabit(id, habit) {
      this.loading = true;
      try {
        const { data } = await updateHabit(id, habit);
        const index = this.habits.findIndex(h => h.id === id);

        if (index !== -1) {
          this.habits[index] = data;
          this.error = null;
          return data;
        }
      } catch (error) {
        this.error = "Erro ao atualizar hábito";
        console.error("Erro ao atualizar hábito:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearHabits() {
      this.habits = [];
      localStorage.removeItem('habits');
    }
  }
});
