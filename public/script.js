const starsCanvas = document.getElementById('stars-bg');
const starsCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStarsCanvas() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    stars = [];
    initStars();
}

class Star {
    constructor(x, y, radius, alpha) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.alpha = alpha;
        this.initialAlpha = alpha;
        this.twinkleSpeed = Math.random() * 0.015 + 0.005;
    }

    draw() {
        starsCtx.beginPath();
        starsCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        starsCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        starsCtx.fill();
    }

    update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha > this.initialAlpha || this.alpha < 0.1) {
            this.twinkleSpeed = -this.twinkleSpeed;
        }
        this.draw();
    }
}

function initStars() {
    const numberOfStars = (starsCanvas.width * starsCanvas.height) / 8000;
    for (let i = 0; i < numberOfStars; i++) {
        let x = Math.random() * starsCanvas.width;
        let y = Math.random() * starsCanvas.height;
        let radius = Math.random() * 1.2;
        let alpha = Math.random() * 0.5 + 0.2;
        stars.push(new Star(x, y, radius, alpha));
    }
}

function animateStars() {
    requestAnimationFrame(animateStars);
    starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
    stars.forEach(star => star.update());
}

//Plexus Background

const plexusCanvas = document.getElementById('plexus-bg');
const plexusCtx = plexusCanvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null, radius: 150 };

function resizePlexusCanvas() {
    plexusCanvas.width = window.innerWidth;
    plexusCanvas.height = window.innerHeight;
    particles = [];
    initPlexus();
}

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        plexusCtx.beginPath();
        plexusCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        plexusCtx.fillStyle = this.color;
        plexusCtx.fill();
    }

    update() {
        if (this.x > plexusCanvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > plexusCanvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function initPlexus() {
    const numberOfParticles = (plexusCanvas.width * plexusCanvas.height) / 12000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 1.5 + 0.5;
        let x = Math.random() * (innerWidth - size * 2) + size * 2;
        let y = Math.random() * (innerHeight - size * 2) + size * 2;
        let directionX = Math.random() * 0.3 - 0.15;
        let directionY = Math.random() * 0.3 - 0.15;
        particles.push(new Particle(x, y, directionX, directionY, size, 'rgba(200,220,255,0.6)'));
    }
}

function connectPlexus() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) ** 2) + ((particles[a].y - particles[b].y) ** 2);
            if (distance < (plexusCanvas.width / 8) * (plexusCanvas.height / 8)) {
                let opacityValue = 1 - (distance / 25000);

                let dx = mouse.x - particles[a].x;
                let dy = mouse.y - particles[a].y;
                let mouseDistance = Math.sqrt(dx * dx + dy * dy);

                if (mouseDistance < mouse.radius) {
                    plexusCtx.strokeStyle = `rgba(220,230,255,${opacityValue * 0.5})`;
                } else {
                    plexusCtx.strokeStyle = `rgba(200,220,255,${opacityValue * 0.25})`;
                }

                plexusCtx.lineWidth = 0.8;
                plexusCtx.beginPath();
                plexusCtx.moveTo(particles[a].x, particles[a].y);
                plexusCtx.lineTo(particles[b].x, particles[b].y);
                plexusCtx.stroke();
            }
        }
    }
}

function animatePlexus() {
    requestAnimationFrame(animatePlexus);
    plexusCtx.clearRect(0, 0, plexusCanvas.width, plexusCanvas.height);
    particles.forEach(p => p.update());
    connectPlexus();
}


//Scrollbar Width

function updateScrollbarWidth() {
    const wrapper = document.querySelector('.content-wrapper');
    if (!wrapper) return;
    const scrollbarWidth = wrapper.offsetWidth - wrapper.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', scrollbarWidth + 'px');
}
window.addEventListener('DOMContentLoaded', () => {
    updateScrollbarWidth();
    setTimeout(updateScrollbarWidth, 200);
});
window.addEventListener('resize', () => {
    resizeStarsCanvas();
    resizePlexusCanvas();
    updateScrollbarWidth();
});

// Page Interactivity
// Smooth scrolling


// Header background on scroll
const header = document.querySelector('header');
const contentWrapper = document.querySelector('.content-wrapper');
contentWrapper.addEventListener('scroll', () => {
    if (contentWrapper.scrollTop > 50) {
        header.classList.add('bg-black/50');
    } else {
        header.classList.remove('bg-black/50');
    }
});

// Toggle menu
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("mobile-menu");
btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

//footer

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll effect for back to top button
window.addEventListener('scroll', function () {
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0.7';
        backToTopBtn.style.visibility = 'visible';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Search
"use strict";

document.addEventListener('DOMContentLoaded', () => {

    const filter = document.getElementById('searchbox');
    const list = document.getElementById('list');
    const searchContainer = filter.closest('.box');
    let dataItems = [];

    // جلب البيانات من data.json
    async function loadData() {
        try {
            const response = await fetch('search/data.json');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            dataItems = await response.json();
        } catch (error) {
            console.error('Failed to load data.json:', error);
        }
    }

    function updateSearchView() {
        const searchTerm = filter.value.toLowerCase().trim();
        list.innerHTML = '';

        if (!searchTerm) {
            list.style.display = 'none';
            searchContainer.classList.remove('is-expanded');
            return;
        }

        let hasVisibleItems = false;

        const maxResults = 3;
        let count = 0;

        dataItems.forEach(item => {
            if (count >= maxResults) return;

            const itemName = item.name;
            if (itemName.toLowerCase().includes(searchTerm)) {
                hasVisibleItems = true;
                const li = document.createElement('li');
                const regex = new RegExp(`(${searchTerm})`, 'ig');
                li.innerHTML = itemName.replace(regex, `<span class="highlight">$1</span>`);
                li.dataset.link = item.link;
                list.appendChild(li);
                count++;
            }
        });


        list.style.display = hasVisibleItems ? 'block' : 'none';
        searchContainer.classList.toggle('is-expanded', hasVisibleItems);
    }

    list.addEventListener('click', (event) => {
        const item = event.target.closest('li');
        if (!item) return;

        filter.value = item.textContent;
        const link = item.dataset.link;
        if (link) window.location.href = link;

        list.style.display = 'none';
        searchContainer.classList.remove('is-expanded');
    });

    filter.addEventListener('keyup', updateSearchView);
    filter.addEventListener('focus', updateSearchView);

    filter.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const firstItem = list.querySelector('li');
            if (firstItem) {
                const link = firstItem.dataset.link;
                if (link) window.location.href = link;
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target)) {
            list.style.display = 'none';
            searchContainer.classList.remove('is-expanded');
        }
    });

    loadData();
});

// Init animations
resizeStarsCanvas();
resizePlexusCanvas();
animateStars();
animatePlexus();
