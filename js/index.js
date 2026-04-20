const track = document.getElementById('track');
let index = 0;

function moveCarousel(direction) {
  const cardWidth = document.querySelector('.car-card').offsetWidth + 20; // Largura + gap
  const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
  
  index += direction;

  // Limites para não rolar infinitamente no vazio
  if (index < 0) index = 0;
  if (index * cardWidth > maxScroll) index = Math.floor(maxScroll / cardWidth);

  track.style.transform = `translateX(${-index * cardWidth}px)`;
  
  // Lógica simples para atualizar os "dots" (opcional)
  updateDots(index);
}

function updateDots(currentIdx) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIdx);
  });
}