


const carViewer = document.querySelector('#car-viewer');

// 1. TROCA DE RODAS (Método seguro: altera apenas o atributo src)
window.changeWheel = (fileName) => {
    const wheelPath = `../assets/models/${fileName}`;
    console.log("🛠️ Trocando rodas para:", wheelPath);
    
    // Lista de IDs dos elementos de roda já existentes no HTML
    const slotIds = ['slot-roda-fl', 'slot-roda-fr', 'slot-roda-bl', 'slot-roda-br'];
    
    slotIds.forEach(id => {
        const wheelEl = document.getElementById(id);
        if (wheelEl) {
            // Apenas altera o caminho do arquivo, mantendo o objeto 3D vivo
            wheelEl.setAttribute('src', wheelPath);
        }
    });
};

// 2. PINTURA (Método seguro: verifica a existência do modelo antes de pintar)
window.changeColor = (colorHex) => {
    // Se o modelo principal ainda não carregou, sai da função
    if (!carViewer.model) {
        console.warn("Aguardando modelo carregar para aplicar a cor...");
        return;
    }
    
    // Converte HEX para RGB (0 a 1)
    const r = parseInt(colorHex.slice(1, 3), 16) / 255;
    const g = parseInt(colorHex.slice(3, 5), 16) / 255;
    const b = parseInt(colorHex.slice(5, 7), 16) / 255;
    
    // Aplica a cor apenas nos materiais que contêm "carro_" no nome
    carViewer.model.materials.forEach((material) => {
        if (material.name.toLowerCase().includes('carro_')) {
            material.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
        }
    });
};

// 3. INICIALIZAÇÃO E EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    
    // Listener para os botões de troca de roda
    document.querySelectorAll('.btn-item[data-model]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modelFile = btn.getAttribute('data-model');
            window.changeWheel(modelFile);
        });
    });
    
    // Listener para o seletor de cor
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => {
            window.changeColor(e.target.value);
        });
    }

    console.log("✅ APEX Render Engine carregada com sucesso.");
});