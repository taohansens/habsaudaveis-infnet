import { defineStore } from "pinia";
import { getHabits, addHabit, updateHabit, deleteHabit } from "@/services/api";

export const useHabitsStore = defineStore("habits", {
  state: () => ({
    habits: [],
  }),
  actions: {
    async fetchHabits() {
      const response = await getHabits();
      this.habits = response.data;
    },
    async createHabit(habit) {
      const response = await addHabit(habit);
      this.habits.push(response.data);
    },
    async editHabit(id, updatedHabit) {
      await updateHabit(id, updatedHabit);
      const index = this.habits.findIndex((h) => h.id === id);
      if (index !== -1) this.habits[index] = { ...this.habits[index], ...updatedHabit };
    },
    async removeHabit(id) {
      await deleteHabit(id);
      this.habits = this.habits.filter((h) => h.id !== id);
    },
  },
  getters: {
    habitById: (state) => (id) => state.habits.find((h) => h.id === id),
  },
});
