const cardData = [
    { role: 'FE-Dev', name: 'Glenda Zieme', email: 'glenda.zieme@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img.png', teamLeader: false },
    { role: 'BE-Dev', name: 'Ryan Calzoni', email: 'ryan.calzoni@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-1.png', teamLeader: false },
    { role: 'Design Lead', name: 'Carla Lipshutz', email: 'carla.lipshutz@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-2.png', teamLeader: true },
    { role: 'Dev Ops', name: 'Martin Donin', email: 'martin.donin@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-3.png', teamLeader: false },
    { role: 'Product Manager', name: 'Alena Bothman', email: 'alena.bothman@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-4.png', teamLeader: true },
    { role: 'Customer Success', name: 'Cristofer Geidt', email: 'cristofer.geidt@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-5.png', teamLeader: false },
    { role: 'FE-Dev', name: 'Marilyn Schleifer', email: 'marilyn.schleifer@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-6.png', teamLeader: false },
    { role: 'Dev Lead', name: 'Randy Aminoff', email: 'randy.aminoff@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-7.png', teamLeader: true },
    { role: 'FE-Dev', name: 'Glen Zieme', email: 'glen.zieme@gmail.com', image: 'assets/images/Profile_Imgs/Profile Img-8.png', teamLeader: false },
    { role: 'Data Analytics', name: 'Jaydon Madsen', email: 'jaydon.madsen@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-9.png', teamLeader: false },
    { role: 'UX Designer', name: 'Jakob Carder', email: 'jakob.carder@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-10.png', teamLeader: false },
    { role: 'BE-Dev', name: 'Tatiana Mango', email: 'tatiana.mango@nato-otan.com', image: 'assets/images/Profile_Imgs/Profile Img-11.png', teamLeader: false }
];

const roleColors = {
    'FE-Dev': '#CFF7D3',
    'BE-Dev': '#FFF1C2',
    'Dev Ops': '#FDD3D0',
    'Design Lead': '#FAE1FA',
    'Dev Lead': '#E6E6E6',
    'Product Manager': '#EADDFF',
    'UX Designer': '#FFD8E4',
    'Customer Success': '#EADDFF',
    'Data Analytics': '#EADDFF'
};

let currentView = 'grid';
let currentFilter = 'all';
let activeRoleFilters = new Set(['All']);
let searchTerm = '';

document.addEventListener('DOMContentLoaded', function() {
    renderCards();
    initFilters();
    initViewToggles();
    initRoleFilters();
    initSearch();
});

function renderCards() {
    const container = document.getElementById('cards-container');
    const template = document.getElementById('card-template');
    
    if (!container || !template) return;
    
    container.innerHTML = '';
    
    let filteredData = cardData.filter(card => {
        if (currentFilter === 'my' && !card.teamLeader) return false;
        if (!activeRoleFilters.has('All') && !activeRoleFilters.has(card.role)) return false;
        if (searchTerm && !card.name.toLowerCase().includes(searchTerm) && 
            !card.email.toLowerCase().includes(searchTerm) && 
            !card.role.toLowerCase().includes(searchTerm)) {
            return false;
        }
        return true;
    });
    
    filteredData.forEach(card => {
        const clone = template.content.cloneNode(true);
        const cardItem = clone.querySelector('.card-item');
        
        const roleBadge = clone.querySelector('[data-role]');
        const roleText = clone.querySelector('[data-role-text]');
        const avatar = clone.querySelector('[data-image]');
        const teamBadge = clone.querySelector('[data-team-badge]');
        const name = clone.querySelector('[data-name]');
        const email = clone.querySelector('[data-email]');
        
        if (roleBadge && roleText) {
            roleText.textContent = card.role;
            roleBadge.style.backgroundColor = roleColors[card.role] || '#E6E6E6';
        }
        
        if (avatar) {
            avatar.src = card.image;
            avatar.alt = card.name;
        }
        
        if (teamBadge) {
            teamBadge.style.display = card.teamLeader ? 'flex' : 'none';
        }
        
        if (name) name.textContent = card.name;
        if (email) email.textContent = card.email;
        
        if (currentView === 'list') {
            const cardTop = clone.querySelector('.card-top');
            const moreBtn = cardTop.querySelector('.more-btn');
            cardTop.innerHTML = '';
            cardTop.appendChild(moreBtn);
            
            const roleBadgeClone = roleBadge.cloneNode(true);
            cardItem.appendChild(roleBadgeClone);
        }
        
        container.appendChild(clone);
    });
    
    container.className = currentView === 'grid' ? 'cards-grid' : 'cards-list';
}

function initFilters() {
    const segments = document.querySelectorAll('.filter-segment');
    segments.forEach(seg => {
        seg.addEventListener('click', function() {
            segments.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            renderCards();
        });
    });
}

function initViewToggles() {
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentView = this.getAttribute('data-view');
            renderCards();
        });
    });
}

function initRoleFilters() {
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function() {
            const chipText = this.textContent.trim();
            
            if (chipText === 'All') {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    activeRoleFilters.clear();
                } else {
                    chips.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');
                    activeRoleFilters.clear();
                    activeRoleFilters.add('All');
                }
            } else {
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    activeRoleFilters.add(chipText);
                } else {
                    activeRoleFilters.delete(chipText);
                }
                
                const allChip = Array.from(chips).find(c => c.textContent.trim() === 'All');
                if (allChip) {
                    allChip.classList.remove('active');
                    activeRoleFilters.delete('All');
                }
                
                if (activeRoleFilters.size === 0) {
                    const allChip = Array.from(chips).find(c => c.textContent.trim() === 'All');
                    if (allChip) {
                        allChip.classList.add('active');
                        activeRoleFilters.add('All');
                    }
                }
            }
            
            renderCards();
        });
    });
}

function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                searchTerm = this.value.toLowerCase().trim();
                renderCards();
            }, 300);
        });
    }
}
