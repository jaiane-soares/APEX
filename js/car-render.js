// Acessa o componente
const modelViewer = document.querySelector('#car-viewer');

// Função simplificada para trocar a cor
window.changeColor = (colorHex, metal = 0.9, rough = 0.2) => {
    if (modelViewer) {
        // Aguarda o modelo carregar se ainda não estiver pronto
        modelViewer.addEventListener("load", () => {
            const material = modelViewer.model.materials[0]; 
            if (material) {
                material.pbrMetallicRoughness.setBaseColorFactor(colorHex);
                material.pbrMetallicRoughness.setMetallicFactor(metal);
                material.pbrMetallicRoughness.setRoughnessFactor(rough);
            }
        }, { once: true });
        
        // Se já estiver carregado, aplica direto
        if (modelViewer.model) {
            const material = modelViewer.model.materials[0];
            if (material) {
                material.pbrMetallicRoughness.setBaseColorFactor(colorHex);
                material.pbrMetallicRoughness.setMetallicFactor(metal);
                material.pbrMetallicRoughness.setRoughnessFactor(rough);
            }
        }
    }
};