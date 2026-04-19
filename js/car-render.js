const modelViewer = document.querySelector('#car-viewer');

// Funções lógicas
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b, 1];
}

function changeColor(colorHex) {
    if (!modelViewer.model) return;
    const colorRgb = hexToRgb(colorHex);
    const lataria = ["carro_pintura", "carro_metal_vermelho", "carro_metal_laranja"];
    modelViewer.model.materials.forEach((material) => {
        if (lataria.some(parte => material.name.toLowerCase().includes(parte))) {
            material.pbrMetallicRoughness.setBaseColorFactor(colorRgb);
        }
    });
}

function changeWheel(fileName) {
    const wheelPath = `../assets/models/${fileName}`;
    const slots = ['roda-fl', 'roda-fr', 'roda-bl', 'roda-br'];
    slots.forEach(slotName => {
        const slotEl = modelViewer.querySelector(`[slot="${slotName}"]`);
        if (slotEl) {
            slotEl.innerHTML = `<model-viewer src="${wheelPath}" style="width:100%; height:100%;"></model-viewer>`;
        }
    });
}

// Inicialização de Eventos
modelViewer.addEventListener('load', () => {
    // 1. Controle de Abas
    const cards = document.querySelectorAll('.card-opcao');
    const abas = document.querySelectorAll('.aba-conteudo');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            abas.forEach(aba => aba.classList.remove('active'));
            const target = card.getAttribute('data-target');
            document.getElementById(`content-${target}`).classList.add('active');
        });
    });

    // 2. Controle de Cor
    const colorPicker = document.getElementById('colorPicker');
    if (colorPicker) {
        colorPicker.addEventListener('input', (e) => changeColor(e.target.value));
    }

    // 3. Controle de Rodas (Delegando clique)
    document.querySelectorAll('[data-wheel]').forEach(btn => {
        btn.addEventListener('click', () => changeWheel(btn.getAttribute('data-wheel')));
    });

    // 4. Controle de Peças (Ex: Aerofólio)
    document.querySelectorAll('[data-part]').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Toggle parte:", btn.getAttribute('data-part'));
            // Adicione aqui a lógica de toggle da sua peça
        });
    });
});
// Função CORRETA para trocar rodas
window.changeWheel = (fileName) => {
    const wheelPath = `../assets/models/${fileName}`;
    
    // Pegamos todos os slots
    const slots = ['roda-fl', 'roda-fr', 'roda-bl', 'roda-br'];
    
    slots.forEach(slotName => {
        const slotEl = modelViewer.querySelector(`[slot="${slotName}"]`);
        if (slotEl) {
            // A forma mais estável: definir o src diretamente se for um model-viewer
            // Mas se você quer apenas injetar o modelo, tente assim:
            slotEl.innerHTML = `<model-viewer src="${wheelPath}" ar ar-modes="webxr scene-viewer" shadow-intensity="1"></model-viewer>`;
        }
    });
};

// Adicione este listener para capturar cliques nos botões que não tinham onclick
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-item[data-wheel]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const file = e.target.getAttribute('data-wheel');
            window.changeWheel(file);
        });
    });
});