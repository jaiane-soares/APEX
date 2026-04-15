async function incluirComponentes() {
    const componentes = [
        { id: "header-placeholder", arquivo: "components/header.html" },
        { id: "footer-placeholder", arquivo: "components/footer.html" }
    ];

    // Determina o caminho base: 
    // Se a URL contém "/pages/", precisamos voltar um nível ("../")
    const caminhoBase = window.location.pathname.includes("/pages/") ? "../" : "";

    for (const comp of componentes) {
        const elemento = document.getElementById(comp.id);
        
        if (elemento) { 
            try {
                const url = caminhoBase + comp.arquivo;
                const resposta = await fetch(url);
                
                if (resposta.ok) {
                    elemento.innerHTML = await resposta.text();
                } else {
                    console.error(`Não encontrado em: ${url}`);
                }
            } catch (erro) {
                console.error(`Erro ao carregar ${comp.arquivo}:`, erro);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", incluirComponentes);