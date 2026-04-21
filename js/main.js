// ============================================================
//  COMPONENTES (Header e Footer)
// ============================================================

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


// ============================================================
//  NOTIFICACAO
// ============================================================

function mostrarNotificacao(mensagem, tipo = "sucesso") {
    const existente = document.getElementById('notificacao');
    if (existente) existente.remove();

    const estilos = {
        sucesso: { cor: "#8cff00", icone: "✓", textoCor: "#0b0e11" },
        erro:    { cor: "#ff4444", icone: "✕", textoCor: "#ffffff" },
        aviso:   { cor: "#ffcc00", icone: "!", textoCor: "#0b0e11" }
    };

    const { cor, icone, textoCor } = estilos[tipo] || estilos.sucesso;

    const card = document.createElement('div');
    card.id = 'notificacao';
    card.innerHTML = `
        <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:36px;height:36px;border-radius:50%;background-color:${cor};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:${textoCor};flex-shrink:0;">${icone}</div>
            <span style="font-family:Roboto;font-size:16px;font-weight:500;color:#f2f2f2;line-height:1.4;">${mensagem}</span>
        </div>
        <div style="margin-top:12px;height:3px;background-color:${cor};border-radius:2px;animation:progresso 3s linear forwards;"></div>
    `;

    card.style.cssText = `
        position:fixed;bottom:32px;right:32px;background-color:#191b23;
        border:1px solid ${cor}44;border-radius:16px;padding:18px 22px;
        width:340px;box-shadow:0 8px 32px rgba(0,0,0,0.4);z-index:9999;
        animation:entrar 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
    `;

    if (!document.getElementById('notificacao-style')) {
        const style = document.createElement('style');
        style.id = 'notificacao-style';
        style.textContent = `
            @keyframes entrar { from{opacity:0;transform:translateY(20px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
            @keyframes sair   { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(20px) scale(0.95)} }
            @keyframes progresso { from{width:100%} to{width:0%} }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(card);

    setTimeout(() => {
        card.style.animation = 'sair 0.3s ease forwards';
        setTimeout(() => card.remove(), 300);
    }, 3000);
}


// ============================================================
//  TERMOS DE USO — MODAL
// ============================================================

function abrirTermos() {
    document.getElementById('modal-termos').classList.add('aberto');
}

// Clique fora da caixa fecha o modal
function fecharTermos(event) {
    if (event.target === document.getElementById('modal-termos')) {
        document.getElementById('modal-termos').classList.remove('aberto');
    }
}

// Botão X fecha sem marcar
function fecharTermosBtn() {
    document.getElementById('modal-termos').classList.remove('aberto');
}

// Botão "Aceitar e Fechar" — marca o checkbox automaticamente
function aceitarTermosModal() {
    document.getElementById('check-termos').checked = true;
    document.getElementById('modal-termos').classList.remove('aberto');
    mostrarNotificacao("Termos aceitos com sucesso!", "sucesso");
}


// ============================================================
//  CONTROLE DE MODO
// ============================================================

let isLoginMode = false;

function handleSubmit() {
    if (isLoginMode) {
        entrar();
    } else {
        cadastrar();
    }
}


// ============================================================
//  MODO CADASTRO
// ============================================================

function showCadastro() {
    isLoginMode = false;

    document.getElementById('field-name').style.display        = 'block';
    document.getElementById('field-carro').style.display       = 'block';
    document.getElementById('field-localizacao').style.display = 'block';
    document.getElementById('field-bio').style.display         = 'block';
    document.getElementById('field-termos').style.display      = 'flex'; // ✅ mostra os termos

    document.getElementById('main-title').innerHTML    = 'Bem vindo';
    document.getElementById('sub-title').style.display = 'block';
    document.getElementById('sub-title').innerText     = 'Acesse sua conta agora mesmo.';
    document.getElementById('form-title').innerText    = 'CADASTRO';
    document.getElementById('btn-main').innerText      = 'Criar conta';
    document.getElementById('btn-side').innerText      = 'Login';

    const btnSide = document.querySelector('.comear3');
    if (btnSide) btnSide.setAttribute('onclick', 'showLogin()');
}


function cadastrar() {
    const nome        = document.getElementById('reg-name').value.trim();
    const email       = document.getElementById('reg-email').value.trim();
    const senha       = document.getElementById('reg-password').value;
    const carro       = document.getElementById('reg-carro').value.trim();
    const localizacao = document.getElementById('reg-localizacao').value.trim();
    const bio         = document.getElementById('reg-bio').value.trim();
    const termosAceitos = document.getElementById('check-termos').checked; // ✅ verifica o checkbox

    if (!nome || !email || !senha) {
        mostrarNotificacao("Preencha pelo menos nome, e-mail e senha.", "aviso");
        return;
    }

    // ✅ Bloqueia o cadastro se os termos não foram aceitos
    if (!termosAceitos) {
        mostrarNotificacao("Você precisa aceitar os Termos de Uso para continuar.", "aviso");
        // Destaca visualmente o checkbox para chamar atenção
        const wrapper = document.getElementById('field-termos');
        wrapper.style.animation = 'none';
        wrapper.offsetHeight; // força reflow para reiniciar animação
        wrapper.style.animation = 'sacudir 0.4s ease';
        return;
    }

    if (localStorage.getItem(email)) {
        mostrarNotificacao("Este e-mail já está cadastrado. Faça login!", "aviso");
        showLogin();
        return;
    }

    const usuario = { nome, email, senha, carro, localizacao, bio };
    localStorage.setItem(email, JSON.stringify(usuario));

    mostrarNotificacao(`Conta criada com sucesso! Bem vindo, ${nome} 👋`, "sucesso");
    setTimeout(() => showLogin(), 1500);
}


// ============================================================
//  MODO LOGIN
// ============================================================

function showLogin() {
    isLoginMode = true;

    document.getElementById('field-name').style.display        = 'none';
    document.getElementById('field-carro').style.display       = 'none';
    document.getElementById('field-localizacao').style.display = 'none';
    document.getElementById('field-bio').style.display         = 'none';
    document.getElementById('field-termos').style.display      = 'none'; // ✅ esconde os termos

    // Reseta o checkbox ao voltar para login
    document.getElementById('check-termos').checked = false;

    document.getElementById('reg-email').value    = '';
    document.getElementById('reg-password').value = '';

    document.getElementById('main-title').innerHTML    = 'Bem vindo<br>de volta!';
    document.getElementById('sub-title').style.display = 'none';
    document.getElementById('form-title').innerText    = 'LOGIN';
    document.getElementById('btn-main').innerText      = 'Entrar';
    document.getElementById('btn-side').innerText      = 'Cadastro';

    const btnSide = document.querySelector('.comear3');
    if (btnSide) btnSide.setAttribute('onclick', 'showCadastro()');
}


function entrar() {
    const email = document.getElementById('reg-email').value.trim();
    const senha = document.getElementById('reg-password').value;

    if (!email || !senha) {
        mostrarNotificacao("Preencha o e-mail e a senha para entrar.", "aviso");
        return;
    }

    const salvo = localStorage.getItem(email);

    if (salvo) {
        const usuario = JSON.parse(salvo);

        if (usuario.senha === senha) {
            sessionStorage.setItem("usuarioLogado", usuario.nome);
            mostrarNotificacao(`Bem vindo de volta, ${usuario.nome}!`, "sucesso");
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1500);
        } else {
            mostrarNotificacao("Senha incorreta. Tente novamente.", "erro");
        }
    } else {
        mostrarNotificacao("E-mail não encontrado. Cadastre-se primeiro!", "erro");
        setTimeout(() => showCadastro(), 1500);
    }
}


// ============================================================
//  ANIMACAO de sacudir para o checkbox dos termos
// ============================================================
(function injetarAnimacaoSacudir() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sacudir {
            0%, 100% { transform: translateX(0); }
            20%       { transform: translateX(-6px); }
            40%       { transform: translateX(6px); }
            60%       { transform: translateX(-4px); }
            80%       { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(style);
})();