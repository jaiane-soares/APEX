const modelViewer = document.querySelector('#car-viewer');

// Função de conversão de cor
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b, 1];
}

// Pintura
window.changeColor = (colorHex) => {
    if (!modelViewer.model) return;
    const colorRgb = hexToRgb(colorHex);
    const lataria = ["carro_pintura", "carro_metal_vermelho", "carro_metal_laranja"];

    modelViewer.model.materials.forEach((material) => {
        if (lataria.some(parte => material.name.toLowerCase().includes(parte))) {
            material.pbrMetallicRoughness.setBaseColorFactor(colorRgb);
            material.pbrMetallicRoughness.setMetallicFactor(0.9);
            material.pbrMetallicRoughness.setRoughnessFactor(0.15);
        }
    });
};

// Troca de Rodas
window.changeWheel = (fileName) => {
    const wheelPath = `../assets/models/${fileName}`;
    console.log("🛠️ Trocando roda para:", wheelPath);
    
    // Procura slots de roda dentro do modelo
    const slots = ['roda-fl', 'roda-fr', 'roda-bl', 'roda-br'];
    slots.forEach(slotName => {
        const slotEl = modelViewer.querySelector(`[slot="${slotName}"]`);
        if (slotEl) {
            slotEl.innerHTML = `<model-viewer src="${wheelPath}" style="width:100%; height:100%;"></model-viewer>`;
        }
    });
};

// Inicialização
modelViewer.addEventListener('load', () => {
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => window.changeColor(e.target.value));
    }
});