/* --- 1. LÓGICA DO MODAL (GALERIA) --- */
const modal = document.getElementById("modal");
const modalImg = document.getElementById("img-ampliada");
const imagens = document.querySelectorAll(".galeria_efeito");
const fechar = document.querySelector(".fechar");

if (modal) {
    imagens.forEach(img => {
        img.addEventListener("click", () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
    });
    fechar.onclick = () => modal.style.display = "none";
    modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };
}

/* --- 2. LÓGICA DA TRANSIÇÃO (ENTRADA E SAÍDA) --- */

// A. ENTRADA: Quando a página abre, as faixas saem para a esquerda
window.addEventListener("DOMContentLoaded", () => {
    const layer = document.getElementById('transition-layer');
    if (layer) {
        // Pequeno delay para o usuário ver a logo antes de abrir
        setTimeout(() => {
            layer.classList.add('exit');
            // Libera cliques após as faixas sumirem
            setTimeout(() => {
                layer.style.display = 'none';
                layer.style.pointerEvents = 'none';
            }, 800);
        }, 500);
    }
});

// B. SAÍDA: Quando clica num link, as faixas fecham vindo da direita
document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    
    if (!link || !link.href || link.href.includes("#") || link.target === "_blank") return;
    if (link.classList.contains('galeria_efeito')) return;

    e.preventDefault();
    const destination = link.href;
    const layer = document.getElementById('transition-layer');
    const strips = layer.querySelectorAll('.strip');
    const content = layer.querySelector('.transition-content');
    const text = document.getElementById('trans-page-name');

    // 1. Reset instantâneo para a direita (sem animação)
    layer.classList.remove('exit');
    content.classList.remove('visible'); // Esconde a logo/nome
    strips.forEach(s => {
        s.style.transition = 'none';
        s.style.transform = 'translateX(100%)';
    });

    // 2. Prepara informações
    text.innerText = link.innerText.trim().toUpperCase() || "APEX";
    layer.style.display = 'flex';
    layer.style.pointerEvents = 'all';

    // 3. O SEGREDO para não ficar "reto": 
    // Usamos dois frames para garantir que o 'translateX(100%)' aconteça antes de animar
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            strips.forEach(s => {
                s.style.transition = ''; // Devolve o controle ao CSS (delays voltam a funcionar)
                s.style.transform = 'translateX(0)';
            });
        });
    });

    // 4. Revelar a logo apenas quando a tela estiver cheia
    // 600ms é o tempo da transição + o maior delay das faixas
    setTimeout(() => {
        content.classList.add('visible');
    }, 600);

    // 5. Redireciona após a logo ser vista
    setTimeout(() => {
        window.location.href = destination;
    }, 1200);
});