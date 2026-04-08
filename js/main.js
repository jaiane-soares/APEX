async function incluirComponentes() {
    
    const componentes = [
        { id: "header-placeholder", arquivo: "components/header.html" },
        { id: "footer-placeholder", arquivo: "components/footer.html" }
    ];

    
    const caminhoBase = window.location.pathname.includes("/pages/") ? "../" : "";

    for (const comp of componentes) {
        const elemento = document.getElementById(comp.id);
        
        if (elemento) { 
            try {
               
                const url = caminhoBase + comp.arquivo;
                const resposta = await fetch(url);
                
                if (resposta.ok) {
                    const html = await resposta.text();
                    elemento.innerHTML = html;
                } else {
                    console.error(`Erro ao carregar: ${url} (Status: ${resposta.status})`);
                }
            } catch (erro) {
                console.error(`Falha na conexão ao carregar ${comp.arquivo}:`, erro);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", incluirComponentes);