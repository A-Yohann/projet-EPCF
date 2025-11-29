const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

// Met à jour la position du carrousel
function updateCarousel() {
    const width = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
}

// Boutons
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

// Swipe mobile
let startX = 0;
track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
track.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) { // swipe gauche
        currentIndex = (currentIndex + 1) % slides.length;
    } else if (endX - startX > 50) { // swipe droite
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    updateCarousel();
});

// Recalcule la largeur au redimensionnement
window.addEventListener('resize', updateCarousel);
updateCarousel();
