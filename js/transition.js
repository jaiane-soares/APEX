
function pageTransition(url) {
    const overlay = document.getElementById('transition-overlay');
    if (!overlay) {
        window.location.href = url;
        return;
    }

    overlay.classList.add('active');

    // Espera a animação (0.7s) e muda de página
    setTimeout(() => {
        window.location.href = url;
    }, 700);
}

// Adiciona o overlay ao body 
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('transition-overlay')) {
        const div = document.createElement('div');
        div.id = 'transition-overlay';
        div.innerHTML = `
            <div class="stripe"></div>
            <div class="stripe"></div>
            <div class="stripe"></div>
            <div class="stripe"></div>
        `;
        document.body.appendChild(div);
    }
});