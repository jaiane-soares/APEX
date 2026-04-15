#  Projeto APEX

O **Projeto APEX** é uma plataforma de tunagem e personalização automotiva. Focada em modularidade e fidelidade técnica, a aplicação permite que usuários configurem desde a estética aerodinâmica até o mapeamento de performance do motor, garantindo uma experiência imersiva de workshop digital.

---

## O projeto
O APEX resolve a fragmentação de ferramentas de personalização, unindo um **Configurador 3D/Visual** com um **Simulador de Performance realista**.

---

## Funcionalidades principais
* **Oficina Modular:** Sistema de troca de peças (Motor, Suspensão, Transmissão) com dependências lógicas.
* **Apex Tuner Logic:** Algoritmo que calcula o ganho de cavalaria ($HP$) e torque ($Nm$) baseado na compatibilidade das peças.
* **Visual Customizer:** Alteração de cores, kits aerodinâmicos e rodas com persistência de estado.
* **Marketplace Dinâmico:** Sistema de preços que oscila conforme a raridade e demanda das peças de performance.
* **Relatório de Performance:** Gráficos comparativos de aceleração ($0-100 km/h$) e velocidade final.

---

## Stack técnica
Para suportar o processamento de física e renderização sem gargalos, utilizamos uma arquitetura escalável:
* **Frontend:** React.js com Three.js (para visualização 3D) e Tailwind CSS.
* **Backend:** Node.js com Express (API RESTful segura).
* **Cálculo de Física:** Engine customizada em JavaScript (ES6+) para simulação de torque.
* **Banco de Dados:** PostgreSQL para catálogo de peças e configurações de usuários.
* **Segurança:** Sanitização de inputs e JWT para sessões de usuário.

---

## Arquitetura do projeto
Estrutura pensada para expansão de novos modelos de veículos e fabricantes:

```text
/ (raiz do projeto)
├── 📁 .vscode/              # Configurações do editor
├── 📁 api/                 # Funções Serverless (Vercel) para a IA (ex: reconhecimento.js)
├── 📁 assets/              # Arquivos estáticos
│   ├── 📁 images/          # Logos e ícones do sistema
│   └── 📁 models/          # Onde você vai salvar o 'kadett_rebaixado.glb'
├── 📁 css/                 # Estilização (Flexbox/Grid para o layout da câmera e 3D)
├── 📁 data/                # JSONs com dados dos carros (ex: specs técnica do Kadett)
├── 📁 js/                  # Toda a inteligência do site
│   ├── 📄 camera.js        # Lógica de acesso à webcam/celular
│   ├── 📄 vision-engine.js # Lógica da Visão Computacional (Reconhecer o modelo)
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
