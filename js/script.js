let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let autoSlide;

function showSlide(index) {
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Move the slider
  const slider = document.querySelector('.slider');
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentSlide].classList.add('active');
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

function setSlide(index) {
  showSlide(index);
}

// Auto slide every 3 seconds
function startAutoSlide() {
  autoSlide = setInterval(() => moveSlide(1), 3000);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Event listeners
document.querySelector('.slider-container').addEventListener('mouseenter', stopAutoSlide);
document.querySelector('.slider-container').addEventListener('mouseleave', startAutoSlide);

// Touch swipe functionality
let startX;
document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
document.querySelector('.slider-container').addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) {
    moveSlide(1);
  } else if (startX < endX - 50) {
    moveSlide(-1);
  }
});

// Start slider
showSlide(0);
startAutoSlide();
