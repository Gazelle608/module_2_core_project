<template>
  <div :class="{ 'dark-mode': store.state.theme.isDark }">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h2 fw-bold mb-2 page-title">Employee Directory</h1>
        <p class="text-muted mb-0">Manage and view all employee information</p>
      </div>
      <div>
        <button class="btn btn-primary d-flex align-items-center" @click="showAddForm = !showAddForm">
          <i class="bi bi-plus-circle me-2"></i>
          Add Employee
        </button>
      </div>

      <div v-if="showAddForm" class="card border-0 mt-3">
        <div class="card-body">
          <h5 class="mb-3">Add Employee</h5>
          <div class="row g-2">
            <div class="col-12 col-md-4">
              <input v-model="newEmployee.name" class="form-control" placeholder="Name" />
            </div>
            <div class="col-12 col-md-3">
              <input v-model="newEmployee.position" class="form-control" placeholder="Position" />
            </div>
            <div class="col-12 col-md-2">
              <input v-model="newEmployee.department" class="form-control" placeholder="Department" />
            </div>
            <div class="col-12 col-md-2">
              <input v-model.number="newEmployee.salary" class="form-control" placeholder="Salary" />
            </div>
            <div class="col-12 col-md-1 d-flex">
              <button class="btn btn-success w-100" @click="addEmployee">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-4">
      <div class="col-md-3 col-6">
        <div class="card border-0 text-center py-3">
          <div class="card-body">
            <div class="text-primary mb-2">
              <i class="bi bi-people fs-1"></i>
            </div>
            <h3 class="fw-bold mb-1">{{ totalEmployees }}</h3>
            <p class="text-muted small mb-0">Total Employees</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="card border-0 text-center py-3">
          <div class="card-body">
            <div class="text-success mb-2">
              <i class="bi bi-building fs-1"></i>
            </div>
            <h3 class="fw-bold mb-1">{{ departments.length }}</h3>
            <p class="text-muted small mb-0">Departments</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="card border-0 text-center py-3">
          <div class="card-body">
            <div class="text-info mb-2">
              <i class="bi bi-cash-stack fs-1"></i>
            </div>
            <h3 class="fw-bold mb-1">R {{ avgSalary.toLocaleString() }}</h3>
            <p class="text-muted small mb-0">Avg. Salary</p>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-6">
        <div class="card border-0 text-center py-3">
          <div class="card-body">
            <div class="text-warning mb-2">
              <i class="bi bi-clock-history fs-1"></i>
            </div>
            <h3 class="fw-bold mb-1">{{ avgTenure }}</h3>
            <p class="text-muted small mb-0">Avg. Tenure (yrs)</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Employee Table -->
    <div class="card border-0">
      <div class="card-header bg-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold">
          <i class="bi bi-person-lines-fill me-2 text-primary"></i>
          Employee List
        </h5>
        <div class="d-flex gap-2">
          <select v-model="selectedDept" class="form-select form-select-sm w-auto">
            <option value="">All Departments</option>
            <option v-for="dept in departmentsComputed" :key="dept">{{ dept }}</option>
          </select>
          <input v-model="searchQuery" type="text" class="form-control form-control-sm" placeholder="Search employees..." style="width: 200px;">
        </div>
      </div>
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in paginatedEmployees" :key="employee.employeeId">
                <td class="fw-semibold text-muted">#{{ employee.employeeId }}</td>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="bg-primary bg-opacity-10 rounded-circle p-2 me-3">
                      <i class="bi bi-person-fill text-primary"></i>
                    </div>
                    <div>
                      <div class="fw-semibold">{{ employee.name }}</div>
                      <small class="text-muted">{{ extractYear(employee.employmentHistory) }}</small>
                    </div>
                  </div>
                </td>
                <td class="fw-semibold">{{ employee.position }}</td>
                <td>
                  <span class="badge" :style="{ backgroundColor: getDepartmentColor(employee.department), color: 'white' }">
                    {{ employee.department }}
                  </span>
                </td>
                <td class="fw-bold">R {{ employee.salary.toLocaleString() }}</td>
                <td>
                  <a :href="'mailto:' + employee.contact" class="text-decoration-none">
                    <i class="bi bi-envelope me-1"></i>
                    {{ employee.contact }}
                  </a>
                </td>
                <td>
                  <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" title="View Details" @click="viewDetails(employee)">
                      <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-outline-success" title="Edit" @click="editEmployee(employee)">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-outline-info" title="Profile" @click.prevent="() => $router.push({ path: '/employees', query: { id: employee.employeeId } })">
                      <i class="bi bi-person"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredEmployees.length === 0" class="text-center py-5">
          <i class="bi bi-people display-4 text-muted mb-3"></i>
          <h5>No employees found</h5>
          <p class="text-muted">Try adjusting your search or filter criteria</p>
        </div>
      </div>
      
      <!-- Pagination -->
      <div class="card-footer bg-white border-top">
        <div class="d-flex justify-content-between align-items-center">
          <div class="text-muted small">
            Showing {{ paginatedEmployees.length }} of {{ totalEmployees }} employees
          </div>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="previousPage"><i class="bi bi-chevron-left"></i></a>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="nextPage"><i class="bi bi-chevron-right"></i></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from '../stores'

export default {
  name: 'EmployeeList',
  setup() {
    const store = useStore()
    const searchQuery = ref('')
    const selectedDept = ref('')
    const showAddForm = ref(false)
    const currentPage = ref(1)
    const newEmployee = ref({ name: '', position: '', department: '', salary: 0, contact: '' })

    const departments = () => [...new Set(store.state.employees.map(e => e.department))]

    const resetNew = () => {
      newEmployee.value = { name: '', position: '', department: '', salary: 0, contact: '' }
    }

    const addEmployee = () => {
      // Simple id generation
      const nextId = Math.max(...store.state.employees.map(e => e.employeeId), 0) + 1
      const emp = { employeeId: nextId, ...newEmployee.value }
      // use store method
      store.addEmployee(emp)
      resetNew()
      showAddForm.value = false
    }

    const viewDetails = (employee) => {
      alert(`Name: ${employee.name}\nPosition: ${employee.position}\nDept: ${employee.department}\nContact: ${employee.contact}`)
    }

    const editEmployee = (employee) => {
      const newName = prompt('Name', employee.name)
      const newPosition = prompt('Position', employee.position)
      if (newName !== null && newPosition !== null) {
        store.updateEmployee(employee.employeeId, { name: newName, position: newPosition })
      }
    }

    return {
      store,
      searchQuery,
      selectedDept,
      showAddForm,
      newEmployee,
      currentPage,
      departments,
      addEmployee,
      viewDetails,
      editEmployee,
    }
  },
  data() {
    return {
      itemsPerPage: 3,
      departmentColors: {
        'Development': '#3498db',
        'HR': '#9b59b6',
        'QA': '#2ecc71',
        'Sales': '#e74c3c',
        'Marketing': '#f39c12',
        'Design': '#1abc9c',
        'IT': '#34495e',
        'Finance': '#27ae60',
        'Support': '#95a5a6'
      }
    }
  },
  computed: {
    employees() {
      return this.store.state.employees
    },
    totalEmployees() {
      return this.employees.length
    },
    avgSalary() {
      const total = this.employees.reduce((sum, emp) => sum + emp.salary, 0)
      return Math.round(total / Math.max(1, this.employees.length))
    },
    avgTenure() {
      // Extract years from employment history (simplified)
      const totalYears = this.employees.reduce((sum, emp) => {
        const year = this.extractYear(emp.employmentHistory)
        return sum + (year || 3) // Default to 3 years if can't extract
      }, 0)
      return Math.round(totalYears / Math.max(1, this.employees.length))
    },
    departmentsComputed() {
      return this.departments()
    },
    filteredEmployees() {
      let filtered = this.employees
      
      if (this.selectedDept) {
        filtered = filtered.filter(emp => emp.department === this.selectedDept)
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(emp => 
          emp.name.toLowerCase().includes(query) ||
          (emp.position || '').toLowerCase().includes(query) ||
          (emp.department || '').toLowerCase().includes(query)
        )
      }
      
      return filtered
    },
    totalPages() {
      return Math.ceil(this.filteredEmployees.length / this.itemsPerPage)
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredEmployees.slice(start, end)
    }
  },
  methods: {
    getDepartmentColor(dept) {
      return this.departmentColors[dept] || '#7f8c8d'
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    goToPage(page) {
      this.currentPage = page
    },
    extractYear(history) {
      const match = history && history.match(/\d{4}/)
      if (match) {
        const year = parseInt(match[0])
        const currentYear = new Date().getFullYear()
        return currentYear - year
      }
      return 3 // Default
    }
  }
}
</script>

<style scoped>
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --border-color: #e2e8f0;
}

div.dark-mode {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #ecf0f1;
  --text-secondary: #bdc3c7;
  --border-color: #0f3460;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.page-title {
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.card {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.card-header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  color: var(--text-primary);
}

.card-footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  color: var(--text-primary);
}

.table {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.table thead {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.table thead th {
  font-weight: 600;
  color: var(--text-primary);
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
  padding: 1rem;
  transition: all 0.3s ease;
}

.table tbody {
  background-color: var(--bg-primary);
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

div.dark-mode .table tbody tr:nth-child(even) {
  background-color: rgba(102, 126, 234, 0.08);
}

.table-hover tbody tr:hover {
  background-color: rgba(102, 126, 234, 0.05);
}

div.dark-mode .table-hover tbody tr:hover {
  background-color: rgba(102, 126, 234, 0.15);
}

.table td {
  color: var(--text-primary);
  border-color: var(--border-color);
  background-color: var(--bg-primary);
  padding: 0.875rem 1rem;
  transition: all 0.3s ease;
}

.table tbody tr:hover td {
  background-color: rgba(102, 126, 234, 0.05);
}

div.dark-mode .table tbody tr:hover td {
  background-color: rgba(102, 126, 234, 0.1);
}

.badge {
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
}

.btn-outline-primary {
  color: #667eea;
  border-color: #667eea;
  background-color: transparent;
}

.btn-outline-primary:hover {
  background-color: #667eea;
  color: white;
  border-color: #667eea;
}

.btn-outline-success {
  color: #10b981;
  border-color: #10b981;
  background-color: transparent;
}

.btn-outline-success:hover {
  background-color: #10b981;
  color: white;
  border-color: #10b981;
}

.btn-outline-info {
  color: #3b82f6;
  border-color: #3b82f6;
  background-color: transparent;
}

.btn-outline-info:hover {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.form-select, .form-control {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

.form-select:focus, .form-control:focus {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: #667eea;
}

.pagination {
  background-color: transparent;
}

.page-link {
  background-color: transparent;
  color: var(--text-primary);
  border-color: var(--border-color);
}

.page-link:hover {
  background-color: rgba(102, 126, 234, 0.1);
  color: var(--text-primary);
  border-color: #667eea;
}

.page-item.active .page-link {
  background-color: #667eea;
  border-color: #667eea;
  color: white;
}

.text-muted {
  color: var(--text-secondary) !important;
}

div.dark-mode .text-muted {
  color: #95a5a6 !important;
}

.text-primary {
  color: #667eea !important;
}

div.dark-mode .text-primary {
  color: #8b9ef6 !important;
}

.text-success {
  color: #10b981 !important;
}

div.dark-mode .text-success {
  color: #34d399 !important;
}

.text-info {
  color: #3b82f6 !important;
}

div.dark-mode .text-info {
  color: #60a5fa !important;
}

.text-warning {
  color: #f59e0b !important;
}

div.dark-mode .text-warning {
  color: #fbbf24 !important;
}

a {
  color: #667eea;
  transition: color 0.3s ease;
}

div.dark-mode a {
  color: #8b9ef6;
}

div.dark-mode a:hover {
  color: #a5b9ff;
}
</style>