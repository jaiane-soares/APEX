document.addEventListener('DOMContentLoaded', () => {
    const carImage = document.getElementById('car-image-360');
    
    if (!carImage) {
        console.error("Elemento 'car-image-360' não encontrado no HTML!");
        return;
    }

    const totalImages = 36;
    let currentRotation = 1; // Começa na 0001.png

    // Função para formatar o número (ex: 1 vira "0001")
    function formatNumber(num) {
        return num.toString().padStart(4, '0');
    }

    function updateCarView(index) {
        // Lógica circular (1 a 36)
        let newIndex = ((index - 1 + totalImages) % totalImages) + 1;
        
        carImage.src = `../assets/models/render_360/${formatNumber(newIndex)}.png`;
        currentRotation = newIndex;
    }

    let isDragging = false;
    let startX;

    carImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        
        // Sensibilidade: muda a imagem a cada 20px de movimento
        if (Math.abs(deltaX) > 20) {
            const direction = deltaX > 0 ? -1 : 1;
            updateCarView(currentRotation + direction);
            startX = e.clientX;
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });
});