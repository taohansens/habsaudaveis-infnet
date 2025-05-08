<template>
    <div>
      <h3>Progresso</h3>
      <p>{{ progress }}%</p>
      <div style="width: 100%; height: 20px; background-color: #ddd;">
        <div :style="{ width: progress + '%', backgroundColor: 'green', height: '100%' }"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      progress: {
        type: Number,
        required: true,
      },
    },
  };
  </script>
  