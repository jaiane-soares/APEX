let currentIndex = 0;

function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!track || items.length === 0) return;

    // Pega a largura exata de um item (incluindo o gap)
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap) || 20;
    const itemWidth = items[0].offsetWidth + gap;

    // Calcula quantos itens estão visíveis (deve resultar em 4 no desktop)
    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const visibleItems = Math.round(containerWidth / itemWidth);
    
    const maxIndex = items.length - visibleItems;

    currentIndex += direction;

    // Limites de navegação
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    const amountToMove = currentIndex * itemWidth;
    track.style.transform = `translateX(-${amountToMove}px)`;

    // Atualiza os pontos (dots)
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}