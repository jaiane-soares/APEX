// 1. Inicializa o mapa
var map = L.map('map', {
    scrollWheelZoom: true,
    dragging: true
}).setView([-23.5505, -46.6333], 12);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
}).addTo(map);

//  Define o ícone verde
const iconeVerde = L.divIcon({
    className: 'marker-verde',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

//  Lista ÚNICA de eventos
const eventos = [
    { id: 1, nome: "Encontro de Opala", local: "Autódromo de Interlagos", lat: -23.7037, lng: -46.6997, data: "25/04/2026" },
    { id: 2, nome: "Track Day APEX", local: "Kartódromo Granja Viana", lat: -23.5930, lng: -46.8280, data: "02/05/2026" },
    { id: 3, nome: "Clube do Fusca SP", local: "Parque Ibirapuera", lat: -23.5874, lng: -46.6576, data: "10/05/2026" },
    { id: 4, nome: "Exposição Carros Antigos", local: "Sambódromo do Anhembi", lat: -23.5152, lng: -46.6262, data: "15/05/2026" },
    { id: 5, nome: "Arrancada SP - Etapa 1", local: "Autódromo de Interlagos", lat: -23.7000, lng: -46.6900, data: "20/05/2026" },
    { id: 6, nome: "Encontro Jetta & Golf", local: "Shopping Aricanduva", lat: -23.5732, lng: -46.5160, data: "22/05/2026" },
    { id: 7, nome: "Daytona Car Meet", local: "Expo Center Norte", lat: -23.5165, lng: -46.6245, data: "01/06/2026" },
    { id: 8, nome: "Encontro de Porsches", local: "Jockey Club de SP", lat: -23.5860, lng: -46.7020, data: "05/06/2026" }
];

//  Renderiza pontos e lista
const lista = document.getElementById('lista-eventos');

eventos.forEach(evento => {
    
    const marker = L.marker([evento.lat, evento.lng], { icon: iconeVerde }).addTo(map);
    marker.bindPopup(`<b>${evento.nome}</b><br>${evento.local}`);

   
    const card = document.createElement('div');
    card.className = 'card-evento';
    card.innerHTML = `<h3>${evento.nome}</h3><p>${evento.data}</p>`;
    
    
    card.onclick = () => {
        map.setView([evento.lat, evento.lng], 15);
        marker.openPopup();
    };
    
    lista.appendChild(card);
});