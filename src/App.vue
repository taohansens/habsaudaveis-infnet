<template>
  <div class="app-container">
    <header>
      <nav>
        <ul>
          <li><router-link to="/">Dashboard</router-link></li>
          <li><router-link to="/settings">Configurações</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 Hábitos Saudáveis</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #333;
  padding: 1rem;
}

header nav ul {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
  padding: 0;
}

header nav ul li a {
  color: white;
  text-decoration: none;
}

main {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>
