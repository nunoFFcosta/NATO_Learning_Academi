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

const roleTeams = {
    'FE-Dev': 'Development',
    'BE-Dev': 'Development',
    'Dev Lead': 'Operations',
    'Dev Ops': 'Dev Ops',
    'Design Lead': 'Design',
    'UX Designer': 'Design',
    'Product Manager': 'Product Management',
    'Customer Success': 'Customer Success',
    'Data Analytics': 'Data Analytics'
};

const teamColors = {
    'Customer Success': '#E4E0FF',
    'Development': '#CFF7D3',
    'Design': '#FFD8E4',
    'Data Analytics': '#FAE1FA',
    'Dev Ops': '#FDD3D0',
    'Product Management': '#FFF1C2',
    'Operations': '#E6E6E6'
};

let currentView = 'grid';
let showTeamLeaders = false;
let activeRoleFilters = new Set(['all']);
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
    
    const query = searchTerm.trim();

    const filteredData = cardData.filter(card => {
        const team = roleTeams[card.role] || 'Operations';
        if (showTeamLeaders && !card.teamLeader) return false;
        if (!activeRoleFilters.has('all') && !activeRoleFilters.has(team)) return false;
        if (!query) return true;

        const haystack = [card.name, card.email, card.role, team]
            .join(' ') 
            .toLowerCase();
        return haystack.includes(query);
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
        
        const team = roleTeams[card.role] || 'Operations';
        if (roleBadge && roleText) {
            roleText.textContent = card.role;
            roleBadge.style.backgroundColor = teamColors[team] || '#E6E6E6';
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
            const header = clone.querySelector('.card-top');
            const actions = header.querySelector('.more-btn');
            const avatar = clone.querySelector('.card-avatar-wrapper');
            const info = clone.querySelector('.card-info');

            const listMain = document.createElement('div');
            listMain.className = 'list-main';
            listMain.append(avatar, info);

            const badgeWrapper = document.createElement('div');
            badgeWrapper.className = 'role-badge-container';
            badgeWrapper.append(roleBadge.cloneNode(true));

            cardItem.innerHTML = '';
            cardItem.append(listMain, badgeWrapper, actions);
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
            showTeamLeaders = this.dataset.filter === 'leaders';
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
            const team = this.dataset.team;
            
            if (team === 'all') {
                chips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                activeRoleFilters.clear();
                activeRoleFilters.add('all');
            } else {
                this.classList.toggle('active');
                const allChip = Array.from(chips).find(c => c.dataset.team === 'all');
                if (allChip) allChip.classList.remove('active');
                activeRoleFilters.delete('all');
                
                if (this.classList.contains('active')) {
                    activeRoleFilters.add(team);
                } else {
                    activeRoleFilters.delete(team);
                }
                
                if (activeRoleFilters.size === 0) {
                    if (allChip) {
                        allChip.classList.add('active');
                        activeRoleFilters.add('all');
                    }
                }
            }
            
            renderCards();
        });
    });
}

function initSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        searchTerm = searchInput.value.toLowerCase();
        renderCards();
    });
}
