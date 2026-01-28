// Sample client data
const clientsData = [
    {
        id: 1,
        name: "Cabinet Dentaire Sourire",
        contact: "Dr. Sophie Martin",
        email: "s.martin@sourire.fr",
        commercial: "Jean Dupont",
        status: "prospect",
        lastVisit: "2026-01-25"
    },
    {
        id: 2,
        name: "Clinique Dent Blanche",
        contact: "Dr. Marc Bernard",
        email: "m.bernard@dentblanche.fr",
        commercial: "Marie Laurent",
        status: "negociation",
        lastVisit: "2026-01-24"
    },
    {
        id: 3,
        name: "Cabinet Santé Plus",
        contact: "Dr. Julie Rousseau",
        email: "j.rousseau@santeplus.fr",
        commercial: "Pierre Martin",
        status: "contact",
        lastVisit: "2026-01-26"
    },
    {
        id: 4,
        name: "Dentiste Moderne",
        contact: "Dr. Thomas Petit",
        email: "t.petit@modernd.fr",
        commercial: "Sophie Dubois",
        status: "approved",
        lastVisit: "2026-01-20"
    },
    {
        id: 5,
        name: "Clinique du Sourire",
        contact: "Dr. Anne Moreau",
        email: "a.moreau@sourire.fr",
        commercial: "Luc Simon",
        status: "prospect",
        lastVisit: "2026-01-27"
    },
    {
        id: 6,
        name: "Cabinet Dentaire Central",
        contact: "Dr. Paul Laurent",
        email: "p.laurent@central.fr",
        commercial: "Emma Leroy",
        status: "approved",
        lastVisit: "2026-01-18"
    },
    {
        id: 7,
        name: "Espace Dentaire Pro",
        contact: "Dr. Claire Dubois",
        email: "c.dubois@espacepro.fr",
        commercial: "Nicolas Roux",
        status: "contact",
        lastVisit: "2026-01-23"
    },
    {
        id: 8,
        name: "Cabinet Dentaire Excellence",
        contact: "Dr. Michel Fontaine",
        email: "m.fontaine@excellence.fr",
        commercial: "Julie Garcia",
        status: "negociation",
        lastVisit: "2026-01-22"
    },
    {
        id: 9,
        name: "Clinique Bleue",
        contact: "Dr. Laurent Blanc",
        email: "l.blanc@bleue.fr",
        commercial: "Jean Dupont",
        status: "prospect",
        lastVisit: "2026-01-21"
    },
    {
        id: 10,
        name: "Cabinet Moderne Plus",
        contact: "Dr. Sarah Lefevre",
        email: "s.lefevre@moderne.fr",
        commercial: "Marie Laurent",
        status: "contact",
        lastVisit: "2026-01-20"
    },
    {
        id: 11,
        name: "Dentiste Pro Elite",
        contact: "Dr. Antoine Roussel",
        email: "a.roussel@elite.fr",
        commercial: "Pierre Martin",
        status: "approved",
        lastVisit: "2026-01-19"
    },
    {
        id: 12,
        name: "Clinique Santé Dentaire",
        contact: "Dr. Marie Dupuis",
        email: "m.dupuis@sante.fr",
        commercial: "Sophie Dubois",
        status: "negociation",
        lastVisit: "2026-01-18"
    }
];

// Track current filter and visible count
let currentFilter = null;
let visibleCount = { prospect: 4, contact: 4, negociation: 4, approved: 4 };

// Render clients under each step
function renderStepClients(status, limit = 4) {
    const container = document.getElementById(`clients-${status}`);
    if (!container) return;

    const filteredClients = clientsData.filter(client => client.status === status);
    const displayClients = filteredClients.slice(0, limit);

    container.innerHTML = displayClients.map(client => `
        <div class="client-item">
            <span class="client-item-name">${client.name}</span>
            <span class="client-item-contact">${client.contact}</span>
        </div>
    `).join('');
}

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
    // Pie Chart - Status Distribution
    const statusCtx = document.getElementById('statusChart').getContext('2d');

    new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: ['Prospects', 'Premier Contact', 'Négociation', 'Clôture', 'Approuvés'],
            datasets: [{
                data: [1247, 385, 234, 156, 892],
                backgroundColor: [
                    '#667eea',
                    '#f093fb',
                    '#4facfe',
                    '#fa709a',
                    '#30cfd0'
                ],
                borderWidth: 0,
                spacing: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1a1a2e',
                    bodyColor: '#6b7280',
                    padding: 12,
                    borderColor: 'rgba(0, 0, 0, 0.06)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function (context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return ` ${context.label}: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });

    // Column Chart - Monthly Evolution
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');

    new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [
                {
                    label: 'Nouveaux Clients',
                    data: [65, 78, 90, 81, 95, 102, 87, 94, 110, 99, 88, 76],
                    backgroundColor: '#667eea',
                    borderRadius: 8,
                    borderSkipped: false
                },
                {
                    label: 'Prospects',
                    data: [120, 135, 142, 128, 156, 148, 139, 162, 175, 158, 144, 132],
                    backgroundColor: '#4facfe',
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#6b7280',
                        padding: 20,
                        font: {
                            size: 12,
                            weight: '600'
                        },
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    titleColor: '#1a1a2e',
                    bodyColor: '#6b7280',
                    padding: 12,
                    borderColor: 'rgba(0, 0, 0, 0.06)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            size: 11,
                            weight: '600'
                        }
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#9ca3af',
                        font: {
                            size: 11,
                            weight: '600'
                        }
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Render initial clients for all steps
    renderStepClients('prospect');
    renderStepClients('contact');
    renderStepClients('negociation');
    renderStepClients('approved');

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
                // Reset all to show 4 clients
                visibleCount = { prospect: 4, contact: 4, negociation: 4, approved: 4 };
                renderStepClients('prospect', 4);
                renderStepClients('contact', 4);
                renderStepClients('negociation', 4);
                renderStepClients('approved', 4);
            } else {
                // Set new filter
                currentFilter = status;
                updateStepDisplay(status);
            }
        });
    });

    // Show more button
    const showMoreBtn = document.getElementById('show-more');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            if (currentFilter) {
                // Load more for the active filter
                visibleCount[currentFilter] += 4;
                renderStepClients(currentFilter, visibleCount[currentFilter]);
            } else {
                // Load more for all
                Object.keys(visibleCount).forEach(status => {
                    visibleCount[status] += 4;
                    renderStepClients(status, visibleCount[status]);
                });
            }
        });
    }

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

