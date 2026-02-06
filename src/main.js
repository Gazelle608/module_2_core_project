import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import DataService from './services/DataService'
import { useStore } from './stores'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'

const app = createApp(App)

// Restore auth state from localStorage before routing
const { initializeAuth } = useStore()
initializeAuth()

// Provide data service to all components
app.provide('dataService', DataService)

app.use(router)
app.mount('#app')

axios.get("http://localhost:3000/api/employees")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });