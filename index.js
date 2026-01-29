// Sample client data - keeping for potential future use
// (Currently not displayed in the simplified pipeline view)


// Track current filter
let currentFilter = null;

// Update all steps based on filter
function updateStepDisplay(activeStatus = null) {
    const steps = document.querySelectorAll('.step');

    steps.forEach(step => {
        const stepStatus = step.getAttribute('data-status');

        if (activeStatus === null) {
            // Show all steps normally
            step.classList.remove('dimmed');
            step.classList.remove('active');
        } else if (stepStatus === activeStatus) {
            // Active step
            step.classList.add('active');
            step.classList.remove('dimmed');
        } else {
            // Dimmed steps
            step.classList.remove('active');
            step.classList.add('dimmed');
        }
    });
}


// Initialize charts
function initCharts() {
    // Customer Habits Chart (Bar Chart) - Re-purposed for Activity/Visits
    const habitsCtx = document.getElementById('customerHabitsChart').getContext('2d');

    // Gradient for bars
    const gradientPrimary = habitsCtx.createLinearGradient(0, 0, 0, 300);
    gradientPrimary.addColorStop(0, '#667eea');
    gradientPrimary.addColorStop(1, '#764ba2');

    new Chart(habitsCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
            datasets: [
                {
                    label: 'Prospects',
                    data: [18, 25, 15, 30, 22, 35, 28],
                    backgroundColor: '#e2e8f0', // Default light grey
                    hoverBackgroundColor: '#667eea', // Hover color
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                },
                {
                    // Overlay for significant interactions (e.g. Sales/Contracts)
                    label: 'Clients Confirmés',
                    data: [12, 18, 10, 45, 15, 25, 20],
                    backgroundColor: '#667eea', // Primary color
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7,
                    hidden: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 20,
                        color: '#a0aec0',
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    backgroundColor: '#1a1a2e',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    titleColor: '#fff',
                    bodyColor: '#a0aec0'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f7fafc',
                        drawBorder: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        color: '#a0aec0',
                        font: { size: 10 }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#a0aec0',
                        font: { size: 10 }
                    }
                }
            }
        }
    });

    // Product Stats Chart (Doughnut) - Re-purposed for Status Distribution
    const productCtx = document.getElementById('productStatsChart').getContext('2d');

    new Chart(productCtx, {
        type: 'doughnut',
        data: {
            labels: ['Prospects', 'Contact', 'Approuvés', 'Divers'],
            datasets: [{
                data: [42, 13, 31, 14], // Matches the visual approximation of the CRM data percentages
                backgroundColor: [
                    '#667eea', // Prospects - Blue like Electronic
                    '#f5576c', // Contact - Pink like Games
                    '#30cfd0', // Approuvés - Teal/Green
                    '#e2e8f0'  // Others - Grey
                ],
                borderWidth: 0,
                spacing: 5,
                borderRadius: 20,
                cutout: '85%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Using custom legend in HTML
                },
                tooltip: {
                    enabled: false
                }
            },
            rotation: -90,
            circumference: 270, // Full circle with a gap at the bottom
        }
    });
}


// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts
    initCharts();


    // Step click handlers
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('click', () => {
            const status = step.getAttribute('data-status');

            if (currentFilter === status) {
                // Clicking the same step again - reset filter
                currentFilter = null;
                updateStepDisplay(null);
            } else {
                // Set new filter
                currentFilter = status;
                updateStepDisplay(status);
            }
        });
    });




    // Navigation items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Quick action buttons
    const quickActions = document.querySelectorAll('.quick-action-btn');
    quickActions.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.querySelector('span').textContent;
            alert(`Action: ${action}`);
        });
    });

    // Export button
    const exportBtn = document.getElementById('export-report');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            alert('Export du rapport en cours...');
        });
    }

    // Notifications button
    const notifBtn = document.getElementById('notifications');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            alert('3 nouvelles notifications');
        });
    }

    // Year selector
    const yearSelect = document.getElementById('year-select');
    if (yearSelect) {
        yearSelect.addEventListener('change', (e) => {
            console.log('Année sélectionnée:', e.target.value);
            // Here you would reload chart data for the selected year
        });
    }
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

