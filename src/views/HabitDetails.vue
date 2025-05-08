<template>
    <div>
      <h1>Detalhes do Hábito</h1>
      <p>Nome: {{ habit.name }}</p>
      <p>Categoria: {{ habit.category }}</p>
      <p>Meta: {{ habit.goal }}</p>
      <p>Frequência: {{ habit.frequency }}</p>
    </div>
  </template>
  
  <script>
  import { getHabits } from "@/services/api";
  
  export default {
    data() {
      return {
        habit: null,
      };
    },
    async created() {
      const id = this.$route.params.id;
      const response = await getHabits();
      this.habit = response.data.find((h) => h.id == id);
    },
  };
  </script>
  