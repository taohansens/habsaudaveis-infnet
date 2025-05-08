<template>
    <form @submit.prevent="addHabit">
      <label>
        Nome:
        <input v-model="newHabit.name" type="text" required />
      </label>
      <label>
        Categoria:
        <select v-model="newHabit.category">
          <option>Exercício</option>
          <option>Alimentação</option>
          <option>Hidratação</option>
          <option>Sono</option>
        </select>
      </label>
      <label>
        Meta:
        <input v-model="newHabit.goal" type="text" />
      </label>
      <label>
        Frequência:
        <select v-model="newHabit.frequency">
          <option>Diário</option>
          <option>Semanal</option>
          <option>Personalizado</option>
        </select>
      </label>
      <button type="submit">Adicionar Hábito</button>
    </form>
  </template>
  
  <script>
  import { useHabitsStore } from "@/store/habits";
  
  export default {
    setup() {
      const habitsStore = useHabitsStore();
      const newHabit = {
        name: "",
        category: "",
        goal: "",
        frequency: "",
      };
  
      const addHabit = async () => {
        try {
          await habitsStore.createHabit(newHabit);
          Object.keys(newHabit).forEach((key) => (newHabit[key] = ""));
        } catch (error) {
          console.error("Erro ao adicionar hábito:", error);
        }
      };
  
      return {
        newHabit,
        addHabit,
      };
    },
  };
  </script>
  