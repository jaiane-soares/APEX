let currentIndex = 0;

function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!track || items.length === 0) return;

    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap) || 20;
    const itemWidth = items[0].offsetWidth + gap;

    const containerWidth = document.querySelector('.carousel-container').offsetWidth;
    const visibleItems = Math.round(containerWidth / itemWidth);
    
    const maxIndex = items.length - visibleItems;

    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    const amountToMove = currentIndex * itemWidth;
    track.style.transform = `translateX(-${amountToMove}px)`;

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// --- SUBSTITUA DAQUI PARA BAIXO ---

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("imgFull");
    const closeModal = document.querySelector(".close-modal");

    // Seleciona todas as imagens do carrossel (exceto o card de "Ver Galeria")
    const images = document.querySelectorAll('.carousel-item:not(.gallery-link-card) img');

    images.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex";
            modalImg.src = this.src;
        });
    });

    // Fechar o modal ao clicar no X
    if (closeModal) {
        closeModal.onclick = () => {
            modal.style.display = "none";
        };
    }

    // Fechar o modal ao clicar no fundo escuro
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});
async function loadHeader() {
    try {
        const response = await fetch('components/header.html'); // Adicione a barra se estiver na raiz
        const data = await response.text();
        document.getElementById('header-placeholder').innerHTML = data;
    } catch (error) {
        console.error('Erro ao carregar o header:', error);
    }
}
loadHeader();
// js/index.js

// js/index.js

// js/index.js

async function carregarComponentes() {
    // AJUSTE AQUI: Se os arquivos estão na pasta 'components', mude para 'components/'
    // Se estiverem em outra pasta, coloque o nome dela aqui.
    const path = 'components/'; 

    try {
        // Carregar Header
        const headerRes = await fetch(`${path}header.html`);
        if (headerRes.ok) {
            const headerHtml = await headerRes.text();
            document.getElementById('header-placeholder').innerHTML = headerHtml;
            console.log("Header carregado com sucesso!");
        } else {
            console.error("Não achei o Header em:", `${path}header.html`);
        }

        // Carregar Footer
        const footerRes = await fetch(`${path}footer.html`);
        if (footerRes.ok) {
            const footerHtml = await footerRes.text();
            document.getElementById('footer-placeholder').innerHTML = footerHtml;
            console.log("Footer carregado com sucesso!");
        } else {
            console.error("Não achei o Footer em:", `${path}footer.html`);
        }

    } catch (error) {
        console.error("Erro na requisição:", error);
    }
}

carregarComponentes();