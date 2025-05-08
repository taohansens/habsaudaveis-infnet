<template>
    <div>
      <h2>Lista de Hábitos</h2>
      <ul>
        <li v-for="habit in habits" :key="habit.id">
          {{ habit.name }} - {{ habit.category }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      habits: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  