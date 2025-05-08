<template>
    <div v-if="habit">
      <h2>Detalhes do Hábito</h2>
      <p>Nome: {{ habit.name }}</p>
      <p>Categoria: {{ habit.category }}</p>
      <p>Meta: {{ habit.goal }}</p>
      <p>Frequência: {{ habit.frequency }}</p>
    </div>
    <div v-else>
      <p>Hábito não encontrado.</p>
    </div>
  </template>
  
  <script>
  import { useHabitsStore } from "@/stores/habits";
  import { storeToRefs } from "pinia";
  import { onMounted, computed } from "vue";
  import { useRoute } from "vue-router";
  
  export default {
    setup() {
      const habitsStore = useHabitsStore();
      const route = useRoute();
  
      const habit = computed(() => habitsStore.habitById(route.params.id));
  
      onMounted(() => {
        habitsStore.fetchHabits();
      });
  
      return {
        habit,
      };
    },
  };
  </script>
  