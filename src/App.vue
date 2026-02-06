<template>
  <div id="app" :class="{ 'dark-mode': store.state.theme.isDark }"">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark shadow-lg py-2" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="container-fluid">
        <router-link class="navbar-brand d-flex align-items-center gap-3" to="/">
          <div class="bg-white bg-opacity-20 rounded-circle p-2">
            <i class="bi bi-building text-white"></i>
          </div>
          <div class="d-none d-md-block">
            <h1 class="fs-5 fw-bold text-white mb-0">ModernTech HR</h1>
            <div class="small text-white-50 opacity-75">Management Portal</div>
          </div>
        </router-link>
        
        <button class="navbar-toggler border-0 p-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="navbar-nav ms-auto gap-1">
            <router-link class="nav-link text-white px-3 py-2 d-flex align-items-center rounded-2" to="/" exact active-class="active bg-white bg-opacity-25">
              <i class="bi bi-speedometer2 me-2"></i>
              <span>Dashboard</span>
            </router-link>
            <router-link class="nav-link text-white px-3 py-2 d-flex align-items-center rounded-2" to="/employees" active-class="active bg-white bg-opacity-25">
              <i class="bi bi-people me-2"></i>
              <span>Employees</span>
            </router-link>
            <router-link class="nav-link text-white px-3 py-2 d-flex align-items-center rounded-2" to="/attendance" active-class="active bg-white bg-opacity-25">
              <i class="bi bi-calendar-check me-2"></i>
              <span>Attendance</span>
            </router-link>
            <router-link class="nav-link text-white px-3 py-2 d-flex align-items-center rounded-2" to="/leaves" active-class="active bg-white bg-opacity-25">
              <i class="bi bi-calendar-event me-2"></i>
              <span>Leave Requests</span>
            </router-link>
            <router-link class="nav-link text-white px-3 py-2 d-flex align-items-center rounded-2" to="/payroll" active-class="active bg-white bg-opacity-25">
              <i class="bi bi-cash-stack me-2"></i>
              <span>Payroll</span>
            </router-link>
            <router-link class="nav-link text-white px-3 py-2 d-flex align-items-center rounded-2" to="/performance" active-class="active bg-white bg-opacity-25">
              <i class="bi bi-graph-up me-2"></i>
              <span>Performance</span>
            </router-link>
          </div>

          <div class="d-flex align-items-center ms-3 gap-2">
            <button class="btn theme-toggle-btn" @click="toggleTheme" :title="store.state.theme.isDark ? 'Light Mode' : 'Dark Mode'">
              <i :class="store.state.theme.isDark ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
            </button>
            <router-link v-if="!store.state.auth.isAuthenticated" class="nav-link text-white px-3 py-2" to="/login">Login</router-link>
            <button v-else class="btn btn-outline-light btn-sm" @click="handleLogout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="container-fluid py-4" style="min-height: calc(100vh - 140px);">
      <router-view />
    </main>
    
    <!-- Footer -->
    <footer class="mt-5 py-4 border-top" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);">
      <div class="container-fluid">
        <div class="row align-items-center">
          <div class="col-lg-6 mb-3 mb-lg-0">
            <div class="d-flex align-items-center">
              <i class="bi bi-building fs-5 text-primary me-2"></i>
              <div>
                <p class="mb-0 text-muted small">
                  <i class="bi bi-c-circle me-1"></i>
                  ModernTech Solutions HR System - Final Update
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-end gap-2 gap-lg-3">
              <span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 small fw-normal border border-primary border-opacity-25">
                <i class="bi bi-code-slash me-1"></i>
                Module 1 Core Project
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { useStore } from './stores'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const { state, logout, toggleTheme } = store
    const router = useRouter()

    const handleLogout = () => {
      logout()
      router.push('/login')
    }

    return { store, state, handleLogout, toggleTheme }
  }
}
</script>

<style>
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --border-color: #e2e8f0;
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

#app.dark-mode {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #ecf0f1;
  --text-secondary: #bdc3c7;
  --border-color: #0f3460;
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  --hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  background-color: #f8fafc;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app.dark-mode body {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color) !important;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--hover-shadow);
}

.card-header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color) !important;
  border-radius: 12px 12px 0 0 !important;
  padding: 1.25rem 1.5rem;
  color: var(--text-primary);
}

.table {
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border-collapse: collapse;
}

.table thead {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
  position: sticky;
  top: 0;
  z-index: 10;
}

#app.dark-mode .table thead {
  background-color: #0f3460;
}

.table thead th {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  border: 1px solid var(--border-color);
}

#app.dark-mode .table thead th {
  background-color: #0f3460;
  color: #ecf0f1;
  border-color: #1a1a2e;
}

.table tbody tr {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease;
}

.table tbody tr:nth-child(even) {
  background-color: rgba(102, 126, 234, 0.02);
}

#app.dark-mode .table tbody tr:nth-child(even) {
  background-color: rgba(102, 126, 234, 0.08);
}

.table-hover tbody tr:hover {
  background-color: rgba(102, 126, 234, 0.05);
}

#app.dark-mode .table-hover tbody tr:hover {
  background-color: rgba(102, 126, 234, 0.15);
}

.table th, .table td {
  border-color: var(--border-color);
  padding: 0.875rem 1rem;
  color: var(--text-primary);
}

.table td {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
}

.table tbody tr:hover td {
  background-color: rgba(102, 126, 234, 0.05);
}

#app.dark-mode .table tbody tr:hover td {
  background-color: rgba(102, 126, 234, 0.1);
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 0.625rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.theme-toggle-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: rotate(15deg);
  color: white;
}

.text-muted {
  color: var(--text-secondary) !important;
}

#app.dark-mode .text-muted {
  color: #95a5a6 !important;
}

.text-primary {
  color: var(--text-primary) !important;
}

#app.dark-mode .text-primary {
  color: #8b9ef6 !important;
}

.text-secondary {
  color: var(--text-secondary) !important;
}

#app.dark-mode .text-secondary {
  color: #95a5a6 !important;
}

.bg-light {
  background-color: var(--bg-primary) !important;
}

#app.dark-mode .bg-light {
  background-color: var(--bg-secondary) !important;
}

.border {
  border-color: var(--border-color) !important;
}

.card-footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  border-radius: 0 0 12px 12px;
  padding: 1.25rem 1.5rem;
  color: var(--text-primary);
}

input, textarea, select {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color) !important;
  transition: all 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: #667eea !important;
}

.form-control {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.form-control:focus {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.badge {
  transition: all 0.3s ease;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.badge.bg-success {
  background-color: #10b981 !important;
  color: white;
}

.badge.bg-danger {
  background-color: #ef4444 !important;
  color: white;
}

.badge.bg-warning {
  background-color: #f59e0b !important;
  color: white;
}

.badge.bg-info {
  background-color: #3b82f6 !important;
  color: white;
}

.progress {
  background-color: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  height: 0.75rem;
}

.progress-bar {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.btn {
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
}

.btn-secondary {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background-color: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  color: var(--text-primary);
}

.btn-danger {
  background-color: #ef4444;
  color: white;
}

.btn-danger:hover {
  background-color: #dc2626;
  color: white;
}

.btn-info {
  background-color: #3b82f6;
  color: white;
}

.btn-info:hover {
  background-color: #2563eb;
  color: white;
}

.btn-success {
  background-color: #10b981;
  color: white;
}

.btn-success:hover {
  background-color: #059669;
  color: white;
}

.btn-warning {
  background-color: #f59e0b;
  color: white;
}

.btn-warning:hover {
  background-color: #d97706;
  color: white;
}
</style>