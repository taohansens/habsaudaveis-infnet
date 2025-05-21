<template>
  <div class="settings-view">
    <h1>Configurações</h1>

    <div class="settings-section">
      <h2>Gerenciamento de Dados</h2>

      <div class="settings-card">
        <div class="settings-info">
          <h3>Exportar Dados</h3>
          <p>Exporte seus hábitos e progresso em formato JSON.</p>
        </div>
        <button @click="exportData" class="settings-button">
          <span class="material-icons">download</span>
          Exportar
        </button>
      </div>

      <div class="settings-card">
        <div class="settings-info">
          <h3>Importar Dados</h3>
          <p>Importe dados de um arquivo JSON.</p>
        </div>
        <div class="import-section">
          <input
            type="file"
            ref="fileInput"
            accept=".json"
            @change="handleFileSelect"
            style="display: none"
          />
          <button @click="triggerFileInput" class="settings-button">
            <span class="material-icons">upload</span>
            Escolher Arquivo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useHabitsStore } from '@/stores/habits';

export default {
  name: 'SettingsView',
  setup() {
    const habitsStore = useHabitsStore();
    const fileInput = ref(null);

    const exportData = () => {
      const data = {
        habits: habitsStore.habits,
        exportDate: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `habitos-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileSelect = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.habits || !Array.isArray(data.habits)) {
          throw new Error('Formato de arquivo inválido');
        }

        // Limpa os hábitos existentes e importa os novos
        await habitsStore.clearHabits();
        for (const habit of data.habits) {
          await habitsStore.addHabit(habit);
        }

        alert('Dados importados com sucesso!');
      } catch (error) {
        console.error('Erro ao importar dados:', error);
        alert('Erro ao importar dados. Verifique se o arquivo está no formato correto.');
      }

      // Limpa o input para permitir selecionar o mesmo arquivo novamente
      event.target.value = '';
    };

    return {
      fileInput,
      exportData,
      triggerFileInput,
      handleFileSelect
    };
  }
};
</script>

<style scoped>
.settings-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.settings-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.settings-section h2 {
  color: #2c3e50;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.settings-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #f8fafc;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.settings-info h3 {
  color: #2c3e50;
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
}

.settings-info p {
  color: #64748b;
  margin: 0;
  font-size: 0.95rem;
}

.settings-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.settings-button:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

.settings-button .material-icons {
  font-size: 1.25rem;
}

@media (max-width: 640px) {
  .settings-view {
    padding: 1rem;
  }

  .settings-card {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .settings-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
