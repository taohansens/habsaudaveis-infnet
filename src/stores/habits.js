import { defineStore } from "pinia";
import { getHabits, addHabit as apiAddHabit, deleteHabit as apiDeleteHabit, updateHabit as apiUpdateHabit } from "@/services/api";

export const useHabitsStore = defineStore("habits", {
  state: () => ({
    habits: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchHabits() {
      this.loading = true;
      try {
        const response = await getHabits();
        this.habits = response.data;
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
        const response = await apiAddHabit(habit);
        this.habits.push(response.data);
        this.error = null;
        return response.data;
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
        await apiDeleteHabit(id);
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
        if (habit) {
          const updatedHabit = {
            ...habit,
            completed: !habit.completed,
            totalDaysCompleted: habit.completed ? habit.totalDaysCompleted - 1 : habit.totalDaysCompleted + 1,
            lastUpdated: new Date().toISOString()
          };
          return await this.updateHabit(id, updatedHabit);
        }
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
        const response = await apiUpdateHabit(id, habit);
        const index = this.habits.findIndex(h => h.id === id);
        if (index !== -1) {
          this.habits[index] = response.data;
          this.error = null;
          return response.data;
        }
      } catch (error) {
        this.error = "Erro ao atualizar hábito";
        console.error("Erro ao atualizar hábito:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async clearHabits() {
      this.habits = [];
      localStorage.removeItem('habits');
    }
  },
  getters: {
    habitById: (state) => (id) => state.habits.find((h) => h.id === id),
  },
});
