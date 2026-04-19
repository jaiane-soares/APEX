const modelViewer = document.querySelector('#car-viewer');

// Função de troca de roda - Corrigida
window.changeWheel = (fileName) => {
    const wheelPath = `../assets/models/${fileName}`;
    console.log("🛠️ Trocando roda para:", wheelPath);
    
    // Oculta a roda original do modelo KadettGSI.glb
    if (modelViewer.model) {
        modelViewer.model.materials.forEach((material) => {
            if (material.name.toLowerCase().includes('roda')) {
                material.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0]);
            }
        });
    }
    
    // Carrega a nova roda em cada slot
    const slots = ['slot-roda-fl', 'slot-roda-fr', 'slot-roda-bl', 'slot-roda-br'];
    slots.forEach(slotId => {
        const slotEl = document.getElementById(slotId);
        if (slotEl) {
            // Cria um novo viewer de roda dentro do slot
            slotEl.innerHTML = `<model-viewer src="${wheelPath}" style="width:100%; height:100%;" autoplay></model-viewer>`;
        }
    });
};

// --- PINTURA ---
window.changeColor = (colorHex) => {
    if (!modelViewer.model) return;
    const r = parseInt(colorHex.slice(1, 3), 16) / 255;
    const g = parseInt(colorHex.slice(3, 5), 16) / 255;
    const b = parseInt(colorHex.slice(5, 7), 16) / 255;
    modelViewer.model.materials.forEach((material) => {
        if (material.name.toLowerCase().includes('carro_')) {
            material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
        }
    });
};

// LIGAÇÃO DE EVENTOS (Removemos o onclick do HTML, usamos isto aqui)
document.addEventListener('DOMContentLoaded', () => {
    // Escuta cliques nos botões de roda
    document.querySelectorAll('.btn-item[data-model]').forEach(btn => {
        btn.addEventListener('click', () => {
            changeWheel(btn.getAttribute('data-model'));
        });
    });
    
    // Escuta cor
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => changeColor(e.target.value));
    }
});