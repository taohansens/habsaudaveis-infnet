import { defineStore } from "pinia";
import axios from "axios";

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
        const response = await axios.get("http://localhost:3000/habits");
        this.habits = response.data;
        this.error = null;
      } catch (err) {
        this.error = "Erro ao carregar hábitos";
        console.error("Erro ao carregar hábitos:", err);
      } finally {
        this.loading = false;
      }
    },
    async addHabit(habit) {
      this.loading = true;
      try {
        const newHabit = {
          ...habit,
          totalDaysCompleted: 0,
          lastCompletedDate: null,
          completed: false,
          lastUpdated: new Date().toISOString()
        };
        const response = await axios.post("http://localhost:3000/habits", newHabit);
        this.habits.push(response.data);
        this.error = null;
      } catch (err) {
        this.error = "Erro ao adicionar hábito";
        console.error("Erro ao adicionar hábito:", err);
      } finally {
        this.loading = false;
      }
    },
    async removeHabit(id) {
      this.loading = true;
      try {
        await axios.delete(`http://localhost:3000/habits/${id}`);
        this.habits = this.habits.filter(habit => habit.id !== id);
        this.error = null;
      } catch (err) {
        this.error = "Erro ao remover hábito";
        console.error("Erro ao remover hábito:", err);
      } finally {
        this.loading = false;
      }
    },
    async markHabitAsCompleted(id) {
      this.loading = true;
      try {
        const habit = this.habits.find(h => h.id === id);
        if (!habit) return;

        const today = new Date().toISOString().split('T')[0];

        const updatedHabit = {
          ...habit,
          completed: true,
          totalDaysCompleted: habit.totalDaysCompleted + 1,
          lastCompletedDate: today,
          lastUpdated: new Date().toISOString()
        };

        await this.updateHabit(id, updatedHabit);
      } catch (err) {
        this.error = "Erro ao marcar hábito como concluído";
        console.error("Erro ao marcar hábito como concluído:", err);
      } finally {
        this.loading = false;
      }
    },
    async updateHabit(id, updatedHabit) {
      this.loading = true;
      try {
        const response = await axios.put(`http://localhost:3000/habits/${id}`, updatedHabit);
        const index = this.habits.findIndex(habit => habit.id === id);
        if (index !== -1) {
          this.habits[index] = response.data;
        }
        this.error = null;
      } catch (err) {
        this.error = "Erro ao atualizar hábito";
        console.error("Erro ao atualizar hábito:", err);
      } finally {
        this.loading = false;
      }
    }
  },
  getters: {
    habitById: (state) => (id) => state.habits.find((h) => h.id === id),
  },
});
