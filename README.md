# Projeto APEX 🏎️
**Plataforma de Tunagem e Personalização Automotiva**

O **Projeto APEX** é uma solução avançada para personalização automotiva, focada em modularidade técnica e fidelidade de performance. A aplicação permite que utilizadores configurem desde a estética aerodinâmica até ao mapeamento de motor, proporcionando uma experiência de oficina digital imersiva.

---

## O Projeto
O APEX elimina a fragmentação de ferramentas de customização, integrando dois pilares fundamentais:
* **Configurador Visual:** Interface de modificação estética em alta fidelidade.
* **Simulador de Performance:** Sistema de cálculo de desempenho baseado em componentes mecânicos.

##  Funcionalidades Principais
* **Oficina Modular:** Sistema inteligente de troca de peças (Motor, Suspensão, Transmissão) com verificação de dependências lógicas.
* **Visual Customizer:** Alteração de cores, kits aerodinâmicos e rodas com sistema de persistência de estado.

---

> [!IMPORTANT] 
>
>
>O desenvolvimento do APEX exigiu adaptações estratégicas para superar limites técnicos de performance e renderização:
>
> **Limitações do 3D em JS Puro:** A implementação inicial buscava renderização 3D nativa. Contudo, a manipulação dinâmica de elementos como rodas e acessórios em JavaScript puro apresentou gargalos críticos de performance e instabilidade na renderização.
>
> **Transição para Model Review:** Durante a fase de *model review*, constatamos que a complexidade de manipular peças específicas no DOM/Canvas com JS puro continuava a escalar de forma ineficiente, comprometendo a experiência do utilizador.
>
> **Solução via 360°:** Para assegurar uma experiência fluida e visualmente rica, migramos a estratégia: utilizamos renderizações em 360° geradas diretamente no **Blender**. Isso eliminou os erros de renderização e elevou o nível do acabamento visual.
>
> **Estado da IA:** A funcionalidade de inteligência artificial para identificação e adaptação automática de novos veículos ainda está em *roadmap*. Atualmente, o sistema suporta exclusivamente o modelo **Chevrolet Kadett**.

---

##  Stack Técnica
Para garantir escalabilidade e suporte ao processamento, utilizamos:
* **Frontend:** JavaScript (Vanilla), CSS3 e HTML5.

##  Arquitetura do Projeto
Estrutura modular desenhada para a futura expansão de novos modelos de veículos, fabricantes e integração de sistemas de performance, focada na facilidade de implementação de novos *assets* visuais renderizados.
```text
/ (raiz do projeto)
├── 📁 .vscode/              # Configurações do editor
├── 📁 api/                 # Funções Serverless (Vercel) para a IA (ex: reconhecimento.js)
├── 📁 assets/              # Arquivos estáticos
│   ├── 📁 images/          # Logos e ícones do sistema
│   └── 📁 models/          # Onde você vai salvar o 'kadett_rebaixado.glb'
├── 📁 css/                 # Estilização (Flexbox/Grid para o layout da câmera e 3D)
├── 📁 js/                  # Toda a inteligência do site
│   ├── 📄 car-render.js    # Script do Three.js para carregar e girar o Kadett
│   └── 📄 main.js          # Orquestrador (une a IA com o visualizador 3D)
├── 📁 pages/               # Telas do sistema
│   ├── 📄 personalizar.html # A TELA PRINCIPAL (IA + 3D)
│   ├── 📄 sobre.html        # História e equipe
│   └── 📄 galeria.html      # "Dentro das Ruas" (Projetos da comunidade)
├── 📄 .editorconfig         # Padronização de código
├── 📄 index.html           # Landing Page (Página de entrada)
├── 📄 package.json          # Dependências (TensorFlow.js, Three.js)
└── 📄 README.md             # Documentação do projeto
````
---

## 📸 Galeria do Projeto

Confira abaixo as interfaces desenvolvidas para a plataforma:

### Interface de Personalização (APEX Configurator)
![Tela de Personalização](assets/tela-personalizacao.png)
*Interface intuitiva para tunagem estética e mecânica do seu veículo.*

### Mapa de Eventos
![Mapa de Eventos](assets/mapa-eventos.png)
*Mapa interativo para localização de encontros e track days em tempo real.*

---
