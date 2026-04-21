const carViewer = document.querySelector('#car-viewer');

// 1. TROCA DE RODAS
window.changeWheel = (fileName) => {
    const wheelPath = `../assets/models/${fileName}`;
    console.log("🛠️ Trocando rodas para:", wheelPath);
    
    const slotIds = ['slot-roda-fl', 'slot-roda-fr', 'slot-roda-bl', 'slot-roda-br'];
    
    slotIds.forEach(id => {
        const wheelEl = document.getElementById(id);
        if (wheelEl) {
            wheelEl.setAttribute('src', wheelPath);
            // Garante que o clique passe direto pela roda para o carro
            wheelEl.style.pointerEvents = 'none';
        }
    });
};

// 2. PINTURA
window.changeColor = (colorHex) => {
    if (!carViewer.model) return;
    
    const r = parseInt(colorHex.slice(1, 3), 16) / 255;
    const g = parseInt(colorHex.slice(3, 5), 16) / 255;
    const b = parseInt(colorHex.slice(5, 7), 16) / 255;
    
    carViewer.model.materials.forEach((material) => {
        if (material.name.toLowerCase().includes('carro_')) {
            material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
        }
    });
};

// 3. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    // Aplica o bloqueio de clique nas rodas assim que carregar
    const slotIds = ['slot-roda-fl', 'slot-roda-fr', 'slot-roda-bl', 'slot-roda-br'];
    slotIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.pointerEvents = 'none';
    });

    // Eventos para botões
    document.querySelectorAll('.btn-item[data-model]').forEach(btn => {
        btn.addEventListener('click', () => {
            window.changeWheel(btn.getAttribute('data-model'));
        });
    });
    
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            window.changeColor(e.target.value);
        });
    }
});