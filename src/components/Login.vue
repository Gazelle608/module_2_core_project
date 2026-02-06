<template>
  <div class="login-page" :class="{ 'dark-mode': store.state.theme.isDark }">
    <div class="login-panel">
      <div class="login-left">
        <div class="welcome">
          <h1>Welcome!</h1>
          <p class="lead">Sign in to continue to the ModernTech HR management portal</p>
          <p class="muted">Enter your credentials to access the dashboard and manage employees, attendance and payroll.</p>
        </div>
      </div>

      <div class="login-right">
        <div class="signin-box">
          <h4 class="mb-3">Sign in</h4>
          <p class="small login-hint mb-3">Use the credentials provided by the instructor</p>

          <div v-if="error" class="alert alert-danger small">{{ error }}</div>

          <form @submit.prevent="onSubmit" class="d-grid gap-3">
            <input v-model="username" placeholder="Username" class="form-control input-ghost" autocomplete="username" required />
            <input type="password" v-model="password" placeholder="Password" class="form-control input-ghost" autocomplete="current-password" required />

            <button class="btn btn-primary btn-signin" type="submit">Sign in</button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../stores'

export default {
  name: 'Login',
  setup() {
    const username = ref('')
    const password = ref('')
    const router = useRouter()
    const store = useStore()
    const { state, login } = store
    const error = ref(null)

    const onSubmit = () => {
      const ok = login(username.value, password.value)
      if (ok) {
        router.push('/')
      } else {
        error.value = state.auth.error
      }
    }

    return { username, password, onSubmit, error, store }
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: background 0.3s ease;
}

.login-page.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.login-panel {
  width: 100%;
  max-width: 1100px;
  display: flex;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.25);
  transition: all 0.3s ease;
}

.login-page.dark-mode .login-panel {
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

.login-left {
  flex: 1 1 60%;
  padding: 3.5rem 2.5rem;
  color: white;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 100%);
  transition: all 0.3s ease;
}

.login-page.dark-mode .login-left {
  background: linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 100%);
}

.welcome h1 {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.welcome .lead {
  color: rgba(255,255,255,0.95);
  margin-bottom: 0.5rem;
}

.welcome .muted {
  color: rgba(255,255,255,0.75);
}

.login-right {
  width: 420px;
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(6px);
  padding: 2.25rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.login-page.dark-mode .login-right {
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(6px);
}

.signin-box h4 {
  color: #fff;
  margin-bottom: 0.25rem;
}

.login-hint {
  color: rgba(255,255,255,0.7);
}

.input-ghost {
  background: rgba(255,255,255,0.08);
  border: none;
  color: #fff;
  border-radius: 8px;
  padding: 0.75rem 0.9rem;
  transition: all 0.3s ease;
}

.login-page.dark-mode .input-ghost {
  background: rgba(255,255,255,0.1);
}

.input-ghost::placeholder {
  color: rgba(255,255,255,0.6);
}

.input-ghost:focus {
  background: rgba(255,255,255,0.15);
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

.btn-signin {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 0.625rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-signin:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.alert {
  padding: 0.45rem 0.75rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .login-panel { 
    flex-direction: column; 
  }
  .login-right { 
    width: 100%; 
  }
  .login-left { 
    padding: 2rem; 
    text-align: center; 
  }
  .welcome h1 { 
    font-size: 2.25rem; 
  }
}
</style>