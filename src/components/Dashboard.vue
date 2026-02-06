<template>
  <div :class="{ 'dark-mode': store.state.theme.isDark }">
    <!-- Header with Greeting and Theme Toggle -->
    <div class="mb-5 d-flex justify-content-between align-items-start">
      <div>
        <h1 class="h1 fw-bold mb-2 dashboard-title">Hello Admin!</h1>
        <p class="dashboard-subtitle fs-5">Measure How Fast You're Growing Monthly Recurring performance management.</p>
      </div>
    </div>

    <!-- Overview Stats Cards -->
    <div class="row g-3 mb-5">
      <div class="col-lg-2.4 col-md-6 col-sm-6">
        <div class="card border-0 stat-card h-100" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); opacity: 0.9;">
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h3 class="fw-bold mb-1">{{ totalEmployees }}</h3>
                <p class="small mb-0">Users</p>
              </div>
              <div class="stat-icon">
                <i class="bi bi-people fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-2.4 col-md-6 col-sm-6">
        <div class="card border-0 stat-card h-100" style="background: #5DADE2; opacity: 0.9;">
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h3 class="fw-bold mb-1">{{ totalEvents }}</h3>
                <p class="small mb-0">Events</p>
              </div>
              <div class="stat-icon">
                <i class="bi bi-calendar2-event fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-2.4 col-md-6 col-sm-6">
        <div class="card border-0 stat-card h-100" style="background: #F39C12; opacity: 0.9;">
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h3 class="fw-bold mb-1">{{ totalHolidays }}</h3>
                <p class="small mb-0">Holidays</p>
              </div>
              <div class="stat-icon">
                <i class="bi bi-calendar-heart fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-2.4 col-md-6 col-sm-6">
        <div class="card border-0 stat-card h-100" style="background: #27AE60; opacity: 0.9;">
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h3 class="fw-bold mb-1">{{ totalPayrollRecords }}</h3>
                <p class="small mb-0">Payrolls</p>
              </div>
              <div class="stat-icon">
                <i class="bi bi-cash-stack fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-2.4 col-md-6 col-sm-6">
        <div class="card border-0 stat-card h-100" style="background: #8E44AD; opacity: 0.9;">
          <div class="card-body text-white">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h3 class="fw-bold mb-1">{{ recentLeaves.length }}</h3>
                <p class="small mb-0">Reports</p>
              </div>
              <div class="stat-icon">
                <i class="bi bi-file-earmark-text fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="row g-4 mb-4">
      <!-- Salary Statistics Chart -->
      <div class="col-lg-6">
        <div class="card stat-chart-card border-0 h-100">
          <div class="card-header chart-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0 fw-bold chart-title">Salary Statistics</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-light" data-bs-toggle="dropdown">
                <i class="bi bi-sort-down"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div style="height: 250px; position: relative;">
              <svg viewBox="0 0 500 180" style="width: 100%; height: 100%;">
                <polyline points="10,150 50,120 90,130 130,90 170,110 210,80 250,100 290,70 330,85 370,60 410,75 450,50" 
                  fill="none" stroke="#667eea" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="10,160 50,140 90,150 130,120 170,140 210,110 250,130 290,100 330,115 370,90 410,105 450,80" 
                  fill="none" stroke="#764ba2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.6"/>
              </svg>
            </div>
            <div class="d-flex justify-content-between mt-3 text-muted small">
              <span>2014: Marketing 2437 | Design 7689 | Others 7689</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Employee Satisfaction -->
      <div class="col-lg-6">
        <div class="card stat-chart-card border-0 h-100">
          <div class="card-header chart-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0 fw-bold chart-title">Employee Satisfaction</h5>
          </div>
          <div class="card-body d-flex align-items-center justify-content-center">
            <div style="text-align: center;">
              <svg viewBox="0 0 120 120" style="width: 150px; height: 150px;">
                <!-- Background circle -->
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e0e0e0" stroke-width="15"/>
                <!-- Progress arc (74%) -->
                <path d="M 60 10 A 50 50 0 0 1 109.3 35.36" 
                  fill="none" stroke="#f39c12" stroke-width="15" stroke-linecap="round"/>
              </svg>
              <h2 class="fw-bold mt-2">{{ satisfactionRate }}%</h2>
              <p class="text-muted small">0% - - - - - 100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row 2 -->
    <div class="row g-4">
      <!-- Performance Statistics -->
      <div class="col-lg-6">
        <div class="card stat-chart-card border-0 h-100">
          <div class="card-header chart-header">
            <h5 class="mb-0 fw-bold chart-title">Performance Statistics</h5>
          </div>
          <div class="card-body">
            <div v-for="perf in topPerformers" :key="perf.employeeId" class="mb-3">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="fw-semibold">{{ perf.name }}</span>
                <span class="text-muted small">{{ perf.performanceScore }}%</span>
              </div>
              <div class="progress" style="height: 8px;">
                <div class="progress-bar" :style="{ 
                  width: perf.performanceScore + '%',
                  backgroundColor: getPerformanceColor(perf.performanceScore)
                }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- New Employees Chart -->
      <div class="col-lg-6">
        <div class="card stat-chart-card border-0 h-100">
          <div class="card-header chart-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0 fw-bold chart-title">New Employees</h5>
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-danger">28%</span>
            </div>
          </div>
          <div class="card-body">
            <div style="height: 200px; display: flex; align-items: flex-end; justify-content: space-around; gap: 5px;">
              <div v-for="n in 12" :key="n" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;">
                <div :style="{ 
                  height: (Math.random() * 80 + 20) + '%',
                  backgroundColor: n % 3 === 0 ? '#f39c12' : '#bdc3c7',
                  borderRadius: '4px',
                  width: '100%'
                }"></div>
              </div>
            </div>
            <div class="d-flex justify-content-between mt-3 text-muted small">
              <span v-for="year in ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017']" 
                :key="year" style="flex: 1; text-align: center;">{{ year }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '../stores'

export default {
  name: 'Dashboard',
  setup() {
    const store = useStore()
    return { store }
  },
  data() {
    return {
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
    totalEmployees() {
      return this.store.state.employees.length
    },
    totalEvents() {
      return this.store.state.leaveRequests.length
    },
    totalHolidays() {
      return 10
    },
    totalPayroll() {
      return this.store.state.payrollData.reduce((sum, p) => sum + (p.finalSalary || 0), 0)
    },
    totalPayrollRecords() {
      return this.store.state.payrollData.length
    },
    pendingLeaves() {
      return this.store.state.leaveRequests.filter(req => req.status === 'Pending').length
    },
    attendanceRate() {
      const allAttendance = this.store.state.attendanceData
      const totalDays = allAttendance.reduce((sum, emp) => sum + (emp.attendance?.length || 0), 0)
      const presentDays = allAttendance.reduce((sum, emp) => {
        const present = emp.attendance?.filter(a => a.status === 'Present').length || 0
        return sum + present
      }, 0)
      return totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0
    },
    presentCount() {
      const allAttendance = this.store.state.attendanceData
      return allAttendance.reduce((sum, emp) => {
        const today = emp.attendance?.[emp.attendance.length - 1]
        return sum + (today?.status === 'Present' ? 1 : 0)
      }, 0)
    },
    recentLeaves() {
      return this.store.state.leaveRequests
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    },
    topPerformers() {
      return this.store.state.employees.map(e => ({
        employeeId: e.employeeId,
        name: e.name,
        department: e.department,
        performanceScore: Math.floor(Math.random() * 41) + 60,
        rating: 'Average'
      })).sort((a, b) => b.performanceScore - a.performanceScore).slice(0, 5)
    },
    satisfactionRate() {
      return 74
    }
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-ZA')
    },
    getReasonClass(reason) {
      if (reason.includes('Sick') || reason.includes('Medical')) return 'bg-danger bg-opacity-10 text-danger'
      if (reason.includes('Vacation')) return 'bg-success bg-opacity-10 text-success'
      if (reason.includes('Personal') || reason.includes('Family') || reason.includes('Childcare')) return 'bg-warning bg-opacity-10 text-warning'
      if (reason.includes('Bereavement')) return 'bg-dark bg-opacity-10 text-dark'
      return 'bg-secondary bg-opacity-10 text-secondary'
    },
    getStatusClass(status) {
      if (status === 'Approved') return 'bg-success bg-opacity-10 text-success'
      if (status === 'Pending') return 'bg-warning bg-opacity-10 text-warning'
      return 'bg-danger bg-opacity-10 text-danger'
    },
    getDepartmentColor(dept) {
      return this.departmentColors[dept] || '#7f8c8d'
    },
    getScoreClass(score) {
      if (score >= 90) return 'bg-success'
      if (score >= 80) return 'bg-primary'
      if (score >= 70) return 'bg-warning'
      return 'bg-danger'
    },
    getRatingClass(rating) {
      if (rating === 'Excellent') return 'bg-success bg-opacity-10 text-success'
      if (rating === 'Good') return 'bg-primary bg-opacity-10 text-primary'
      if (rating === 'Average') return 'bg-warning bg-opacity-10 text-warning'
      return 'bg-danger bg-opacity-10 text-danger'
    },
    getPerformanceColor(score) {
      if (score >= 90) return '#27ae60'
      if (score >= 80) return '#3498db'
      if (score >= 70) return '#f39c12'
      return '#e74c3c'
    }
  }
}
</script>

<style scoped>
/* Light Mode (Default) */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #2d3748;
  --text-secondary: #718096;
  --border-color: #e2e8f0;
  --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  --hover-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

/* Dark Mode */
div.dark-mode {
  --bg-primary: #1a1a2e;
  --bg-secondary: #16213e;
  --text-primary: #ecf0f1;
  --text-secondary: #bdc3c7;
  --border-color: #0f3460;
  --card-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  --hover-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}

.dashboard-title {
  color: var(--text-primary);
  transition: color 0.3s ease;
}

.dashboard-subtitle {
  color: var(--text-secondary);
  transition: color 0.3s ease;
}

.theme-toggle {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-color);
  border-radius: 50%;
  width: 44px;
  height: 44px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1.2rem;
}

.theme-toggle:hover {
  background-color: var(--text-primary);
  color: var(--bg-primary);
  transform: rotate(20deg);
}

.card {
  background-color: var(--bg-primary);
  border-color: var(--border-color) !important;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: var(--card-shadow);
}

.card-header {
  background-color: var(--bg-secondary);
  border-color: var(--border-color) !important;
}

.chart-header {
  background-color: var(--bg-secondary);
  border-color: var(--border-color) !important;
}

.chart-title {
  color: var(--text-primary);
}

.stat-card {
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--hover-shadow) !important;
}

.stat-card .card-body {
  color: white;
}

.stat-icon {
  opacity: 0.8;
}

.stat-chart-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

div.dark-mode .stat-chart-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.table {
  color: var(--text-primary);
  border-color: var(--border-color);
}

.table thead {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

.table thead th {
  color: var(--text-primary);
  border-color: var(--border-color);
}

.table tbody tr {
  border-color: var(--border-color);
}

.table tbody tr:hover {
  background-color: var(--bg-secondary);
}

.badge {
  transition: all 0.3s ease;
}

.progress {
  background-color: var(--bg-secondary);
  border-color: var(--border-color);
}

.text-muted {
  color: var(--text-secondary) !important;
}

div.dark-mode .text-muted {
  color: var(--text-secondary) !important;
}

div.dark-mode svg {
  filter: brightness(0.9);
}

@media (max-width: 1200px) {
  [class*="col-lg-"] {
    flex: 0 0 calc(50% - 12px) !important;
  }
}

@media (max-width: 768px) {
  [class*="col-lg-"] {
    flex: 0 0 calc(50% - 12px) !important;
  }
}
</style>