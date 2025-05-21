<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <h1>Hábitos Saudáveis</h1>
        </div>
        <nav class="main-nav">
          <router-link to="/" class="nav-link" active-class="active">
            <span class="material-icons">dashboard</span>
            Dashboard
          </router-link>
          <router-link to="/settings" class="nav-link" active-class="active">
            <span class="material-icons">settings</span>
            Configurações
          </router-link>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2025 Hábitos Saudáveis - Infnet</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* Estilos globais */
:root {
  --primary-color: #4299e1;
  --primary-dark: #3182ce;
  --text-color: #2c3e50;
  --background-color: #f7fafc;
  --header-bg: #ffffff;
  --footer-bg: #2d3748;
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: var(--text-color);
  background-color: var(--background-color);
  line-height: 1.5;
}

/* Estilos do componente */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: var(--header-bg);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: var(--background-color);
  color: var(--primary-color);
}

.nav-link.active {
  background-color: var(--primary-color);
  color: white;
}

.nav-link .material-icons {
  font-size: 1.25rem;
}

.app-main {
  flex: 1;
  padding: 2rem 1rem;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.app-footer {
  background-color: var(--footer-bg);
  color: white;
  padding: 1.5rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.footer-content .material-icons {
  font-size: 1rem;
  color: #ef4444;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .main-nav {
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }

  .nav-link {
    padding: 0.5rem;
  }

  .app-main {
    padding: 1rem;
  }

  .footer-content {
    padding: 0 1rem;
  }
}
</style>
