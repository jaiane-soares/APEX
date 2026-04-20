// Inicializa o mapa centralizado em São Paulo
var map = L.map('map').setView([-23.5505, -46.6333], 12);

// Adiciona o mapa com estilo escuro (combina com o seu site)
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Exemplo de como adicionar um ponto de evento
var iconeEvento = L.icon({
    iconUrl: '/assets/icons/car-marker.png', // Opcional: seu ícone de carro
    iconSize: [32, 32]
});

// Adicionando um evento de exemplo
L.marker([-23.5505, -46.6333], {icon: iconeEvento}).addTo(map)
    .bindPopup('<b>Encontro de Opaleiros</b><br>Data: 25/04/2026')
    .openPopup();