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
📁 Projeto-APEX/
│
├── 📁 public/                  # Assets estáticos e modelos 3D (GLTF/OBJ)
├── 📁 src/
│   ├── 📁 assets/              # Estilização global e imagens
│   ├── 📁 components/          # UI Kit (Botões, Cards de Peças, Modais)
│   ├── 📁 engine/              # Lógica de Tunagem (Cálculos de Performance)
│   │   ├── 📄 PhysicsCore.js   # Algoritmos de aceleração e tração
│   │   └── 📄 Compatibility.js # Validação de peças incompatíveis
│   ├── 📁 pages/               # Views (Garagem, Loja, Dashboard)
│   ├── 📁 services/            # Integração com API e LocalStorage
│   └── 📄 App.js               # Entry Point
│
├── 📁 server/                  # Backend API
│   ├── 📁 controllers/         # Lógica de negócio (Preços, Usuários)
│   └── 📁 routes/              # Endpoints da aplicação
│
└── 📄 apex-config.json         # Definições globais de raridade e specs
