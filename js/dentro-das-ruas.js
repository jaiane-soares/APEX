window.addEventListener("DOMContentLoaded", () => {
    /* --- 1. LÓGICA DO MODAL (GALERIA) --- */
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("img-ampliada");
    const imagens = document.querySelectorAll(".galeria_efeito");
    const fechar = document.querySelector(".fechar");

    if (modal) {
        imagens.forEach(img => {
            img.addEventListener("click", () => {
                modal.style.display = "flex"; // Usamos flex para centralizar
                modalImg.src = img.src;
            });
        });

        // Fechar no X
        if (fechar) {
            fechar.onclick = () => modal.style.display = "none";
        }

        // Fechar ao clicar no fundo escuro
        modal.onclick = (e) => { 
            if (e.target === modal) modal.style.display = "none"; 
        };
    }

    /* --- 2. LÓGICA DA TRANSIÇÃO DE ENTRADA --- */
    const layer = document.getElementById('transition-layer');
    if (layer) {
        // Mostra a logo/texto da transição de entrada
        const content = layer.querySelector('.transition-content');
        if (content) content.classList.add('visible');

        setTimeout(() => {
            layer.classList.add('exit');
            setTimeout(() => {
                layer.style.display = 'none';
                layer.style.pointerEvents = 'none';
            }, 800);
        }, 500);
    }
});

/* --- 3. LÓGICA DA TRANSIÇÃO DE SAÍDA (CLIQUES EM LINKS) --- */
document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    
    // Se não for um link válido ou se for o botão de fechar do modal, ignora
    if (!link || !link.href || link.href.includes("#") || link.target === "_blank") return;
    
    // Evita que a transição amarela rode ao clicar em imagens (que não são links)
    if (e.target.classList.contains('galeria_efeito')) return;

    e.preventDefault();
    const destination = link.href;
    const layer = document.getElementById('transition-layer');
    const strips = layer.querySelectorAll('.strip');
    const content = layer.querySelector('.transition-content');
    const text = document.getElementById('trans-page-name');

    layer.classList.remove('exit');
    if (content) content.classList.remove('visible');
    
    strips.forEach(s => {
        s.style.transition = 'none';
        s.style.transform = 'translateX(100%)';
    });

    if (text) text.innerText = link.innerText.trim().toUpperCase() || "APEX";
    layer.style.display = 'flex';
    layer.style.pointerEvents = 'all';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            strips.forEach(s => {
                s.style.transition = ''; 
                s.style.transform = 'translateX(0)';
            });
        });
    });

    setTimeout(() => {
        if (content) content.classList.add('visible');
    }, 600);

    setTimeout(() => {
        window.location.href = destination;
    }, 1200);
});

