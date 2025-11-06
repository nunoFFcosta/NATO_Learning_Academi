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

document.addEventListener('DOMContentLoaded', function() {
    renderCards();
    initFilters();
});

function renderCards() {
    const container = document.getElementById('cards-container');
    const template = document.getElementById('card-template');
    
    if (!container || !template) return;
    
    container.innerHTML = '';
    
    cardData.forEach(card => {
        const clone = template.content.cloneNode(true);
        
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
            avatar.onerror = function() {
                const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(card.name)}&size=112&background=random`;
                if (this.src !== fallback) {
                    this.src = fallback;
                }
            };
        }
        
        if (teamBadge) {
            teamBadge.style.display = card.teamLeader ? 'flex' : 'none';
        }
        
        if (name) name.textContent = card.name;
        if (email) email.textContent = card.email;
        
        container.appendChild(clone);
    });
}

function initFilters() {
    const segments = document.querySelectorAll('.filter-segment');
    segments.forEach(seg => {
        seg.addEventListener('click', function() {
            segments.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });
}
