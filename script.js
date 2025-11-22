/* ==========================================
   1. 怪獸資料與邏輯
   ========================================== */
const pokedexGrid = document.getElementById('pokedex-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

// Modal 元素
const modal = document.getElementById('monster-modal');
const modalImg = document.getElementById('modal-img');
const modalName = document.getElementById('modal-name');
const modalId = document.getElementById('modal-id');
const modalTypes = document.getElementById('modal-types');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentMonsterIndex = 0; 
let currentDisplayList = []; 

const typeColors = {
    fire: { color: '#FF421C', name: '火' },
    grass: { color: '#78C850', name: '草' },
    water: { color: '#6390F0', name: '水' },
    electric: { color: '#F7D02C', name: '電' },
    ground: { color: '#E2BF65', name: '地面' },
    rock: { color: '#B6A136', name: '岩石' },
    poison: { color: '#A33EA1', name: '毒' },
    bug: { color: '#A6B91A', name: '蟲' },
    dragon: { color: '#6F35FC', name: '龍' },
    psychic: { color: '#F95587', name: '超能' },
    flying: { color: '#A98FF3', name: '飛行' },
    ice: { color: '#96D9D6', name: '冰' },
    ghost: { color: '#735797', name: '幽靈' },
    steel: { color: '#B7B7CE', name: '鋼' },
    dark: { color: '#705746', name: '惡' },
    fairy: { color: '#D685AD', name: '妖精' }
};

// 20隻怪獸資料庫
const myMonsters = [
    { id: 1, name: "砂暴神蠍獸", filename: "砂暴神蠍獸.png", types: ['ground', 'rock'] },
    { id: 2, name: "時序輪盤獸", filename: "時序輪盤獸.png", types: ['steel', 'psychic'] },
    { id: 3, name: "疾翼羽蜂獸", filename: "疾翼羽蜂獸.png", types: ['bug', 'flying'] },
    { id: 4, name: "神聖輝羽獸", filename: "神聖輝羽獸.png", types: ['flying', 'fairy'] },
    { id: 5, name: "荊刺藤甲獸", filename: "荊刺藤甲獸.png", types: ['grass', 'poison'] },
    { id: 6, name: "終端核心裝甲獸", filename: "終端核心裝甲獸.png", types: ['steel', 'electric'] },
    { id: 7, name: "晶系斬翼獸", filename: "晶系斬翼獸.png", types: ['ice', 'steel'] },
    { id: 8, name: "渦能鯨艦獸", filename: "渦能鯨艦獸.png", types: ['water', 'steel'] },
    { id: 9, name: "裂石泰坦獸", filename: "裂石泰坦獸.png", types: ['rock', 'ground'] },
    { id: 10, name: "量子蛇電獸", filename: "量子蛇電獸.png", types: ['electric'] },
    { id: 11, name: "雷刃迅龍獸", filename: "雷刃迅龍獸.png", types: ['electric', 'dragon'] },
    { id: 12, name: "熔焰鋼牙獸", filename: "熔焰鋼牙獸.png", types: ['fire', 'steel'] },
    { id: 13, name: "腐息蛛影獸", filename: "腐息蛛影獸.png", types: ['poison', 'bug'] },
    { id: 14, name: "魂螢墓狼獸", filename: "魂螢墓狼獸.png", types: ['ghost', 'fire'] },
    { id: 15, name: "影墟死咒獸", filename: "影墟死咒獸.png", types: ['dark', 'ghost'] },
    { id: 16, name: "齒輪小丑偶獸", filename: "齒輪小丑偶獸.png", types: ['steel', 'dark'] },
    { id: 17, name: "鋼脈戰皇龍獸", filename: "鋼脈戰皇龍獸.png", types: ['dragon', 'steel'] },
    { id: 18, name: "螳刃磁擊獸", filename: "螳刃磁擊獸.png", types: ['bug', 'steel'] },
    { id: 19, name: "霜晶狼皇獸", filename: "霜晶狼皇獸.png", types: ['ice'] },
    { id: 20, name: "霧羽幻靈獸", filename: "霧羽幻靈獸.png", types: ['fairy', 'flying'] }
];

currentDisplayList = [...myMonsters];

const loadMonsters = (data) => {
    pokedexGrid.innerHTML = '';
    currentDisplayList = data;
    data.forEach((monster, index) => {
        createMonsterCard(monster, index);
    });
};

const createMonsterCard = (monster, index) => {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');
    card.addEventListener('click', () => openModal(index));

    const typesHtml = monster.types.map(type => {
        const typeInfo = typeColors[type] || { color: '#666', name: type };
        return `<span class="type-badge" style="background-color: ${typeInfo.color};">${typeInfo.name}</span>`;
    }).join('');

    const displayId = monster.id.toString().padStart(3, '0');
    const imagePath = `images/${monster.filename}`;

    card.innerHTML = `
        <div class="img-container">
            <img src="${imagePath}" alt="${monster.name}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
        </div>
        <span class="number">NO.${displayId}</span>
        <h3 class="name">${monster.name}</h3>
        <div class="types">${typesHtml}</div>
    `;
    pokedexGrid.appendChild(card);
};

// --- Modal 邏輯 ---
const openModal = (index) => {
    currentMonsterIndex = index;
    updateModalContent();
    modal.style.display = 'flex';
};

const updateModalContent = () => {
    const monster = currentDisplayList[currentMonsterIndex];
    if (!monster) return;

    modalName.textContent = monster.name;
    modalId.textContent = `NO.${monster.id.toString().padStart(3, '0')}`;
    modalImg.src = `images/${monster.filename}`;

    modalTypes.innerHTML = monster.types.map(type => {
        const typeInfo = typeColors[type];
        return `<span class="type-badge" style="background-color: ${typeInfo.color}; padding: 5px 15px; font-size: 1rem;">${typeInfo.name}</span>`;
    }).join('');
};

const closeModalLogic = () => modal.style.display = 'none';

prevBtn.addEventListener('click', () => {
    currentMonsterIndex = (currentMonsterIndex > 0) ? currentMonsterIndex - 1 : currentDisplayList.length - 1;
    updateModalContent();
});

nextBtn.addEventListener('click', () => {
    currentMonsterIndex = (currentMonsterIndex < currentDisplayList.length - 1) ? currentMonsterIndex + 1 : 0;
    updateModalContent();
});

closeBtn.addEventListener('click', closeModalLogic);
window.addEventListener('click', (e) => { if (e.target == modal) closeModalLogic(); });
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') closeModalLogic();
    }
});

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = myMonsters.filter(m => m.name.includes(term) || m.id.toString().includes(term));
    loadMonsters(filtered);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.getAttribute('data-type');
        const filtered = (type === 'all') ? myMonsters : myMonsters.filter(m => m.types.includes(type));
        loadMonsters(filtered);
    });
});

loadMonsters(myMonsters);


/* ==========================================
   2. ★ 動態背景特效：粒子網絡
   ========================================== */
const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.directionX = (Math.random() * 1) - 0.5; 
        this.directionY = (Math.random() * 1) - 0.5; 
        this.size = Math.random() * 2 + 0.5; 
        this.color = '#00f2ff'; 
    }
    update() {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.6; 
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 5000; 
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + 
                           ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(0, 242, 255,' + opacityValue * 0.15 + ')'; 
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connect();
}

init();
animate();