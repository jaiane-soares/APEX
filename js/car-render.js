document.addEventListener('DOMContentLoaded', () => {
    const carImage = document.getElementById('car-image-360');
    
    
    let currentRotation = 1;
    let pastaCor = "prata"; 

    function formatNumber(num) {
        return num.toString().padStart(4, '0');
    }

    function updateCarView(index) {
        let newIndex = ((index - 1 + 36) % 36) + 1;
      
        carImage.src = `../assets/models/${pastaCor}/${formatNumber(newIndex)}.png`;
        currentRotation = newIndex;
    }

    // Lógica para trocar a cor ao clicar
    document.querySelectorAll('.cor-item').forEach(item => {
        item.addEventListener('click', () => {
            
            pastaCor = item.getAttribute('data-cor');
            updateCarView(currentRotation); 
        });
    });

    // Lógica de arrasto (mantida)
    let isDragging = false;
    let startX;
    document.getElementById('car-viewer-container').addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        if (Math.abs(deltaX) > 20) {
            updateCarView(currentRotation + (deltaX > 0 ? -1 : 1));
            startX = e.clientX;
        }
    });

    window.addEventListener('mouseup', () => isDragging = false);
});