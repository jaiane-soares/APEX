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


    const eventos = [
    { id: 1, nome: "Encontro de Opala", local: "Autódromo de Interlagos, SP", lat: -23.7037, lng: -46.6997, data: "25/04/2026" },
    { id: 2, nome: "Track Day APEX", local: "Kartódromo Granja Viana, SP", lat: -23.5930, lng: -46.8280, data: "02/05/2026" },
    { id: 3, nome: "Clube do Fusca SP", local: "Parque Ibirapuera, SP", lat: -23.5874, lng: -46.6576, data: "10/05/2026" },
    { id: 4, nome: "Exposição Carros Antigos", local: "Sambódromo, SP", lat: -23.5152, lng: -46.6262, data: "15/05/2026" },
    { id: 5, nome: "Arrancada SP - Etapa 1", local: "Autódromo de Interlagos, SP", lat: -23.7000, lng: -46.6900, data: "20/05/2026" },
    { id: 6, nome: "Encontro Jetta & Golf", local: "Shopping Aricanduva, SP", lat: -23.5732, lng: -46.5160, data: "22/05/2026" },
    { id: 7, nome: "Daytona Car Meet", local: "Expo Center Norte, SP", lat: -23.5165, lng: -46.6245, data: "01/06/2026" },
    { id: 8, nome: "Encontro de Porsches", local: "Jockey Club, SP", lat: -23.5860, lng: -46.7020, data: "05/06/2026" },
    { id: 9, nome: "Festival Automotivo RJ", local: "Autódromo da Barra, RJ", lat: -22.9819, lng: -43.3859, data: "10/06/2026" },
    { id: 10, nome: "Clube do Chevette RJ", local: "Aterro do Flamengo, RJ", lat: -22.9168, lng: -43.1755, data: "12/06/2026" },
    { id: 11, nome: "Encontro MG Muscle Cars", local: "Expominas, MG", lat: -19.9328, lng: -43.9723, data: "15/06/2026" },
    { id: 12, nome: "Drift Brasil - Etapa BH", local: "Pampulha, MG", lat: -19.8510, lng: -43.9740, data: "18/06/2026" },
    { id: 13, nome: "Encontro Curitiba Classics", local: "Parque Barigui, PR", lat: -25.4300, lng: -49.2900, data: "20/06/2026" },
    { id: 14, nome: "Track Day Curitiba", local: "Autódromo de Pinhais, PR", lat: -25.4050, lng: -49.1760, data: "22/06/2026" },
    { id: 15, nome: "Expo Carros Antigos POA", local: "Parque da Redenção, RS", lat: -30.0380, lng: -51.2180, data: "25/06/2026" },
    { id: 16, nome: "Encontro de Gol Quadrado", local: "Orla do Guaíba, RS", lat: -30.0330, lng: -51.2380, data: "28/06/2026" },
    { id: 17, nome: "Meet Automotivo BSB", local: "Parque da Cidade, DF", lat: -15.7950, lng: -47.8900, data: "01/07/2026" },
    { id: 18, nome: "Carros de Luxo BSB", local: "Mané Garrincha, DF", lat: -15.7830, lng: -47.8990, data: "03/07/2026" },
    { id: 19, nome: "Encontro Salvador Customs", local: "Parque dos Ventos, BA", lat: -12.9800, lng: -38.4500, data: "05/07/2026" },
    { id: 20, nome: "Clube do Opala BA", local: "Farol da Barra, BA", lat: -13.0060, lng: -38.5300, data: "07/07/2026" },
    { id: 21, nome: "Recife Car Show", local: "Marco Zero, PE", lat: -8.0630, lng: -34.8710, data: "10/07/2026" },
    { id: 22, nome: "Encontro JDM Fortaleza", local: "Beira Mar, CE", lat: -3.7220, lng: -38.5080, data: "12/07/2026" },
    { id: 23, nome: "Motorsport Manaus", local: "Arena da Amazônia, AM", lat: -3.0840, lng: -60.0270, data: "15/07/2026" },
    { id: 24, nome: "Encontro Belém Vintage", local: "Estação das Docas, PA", lat: -1.4500, lng: -48.5020, data: "18/07/2026" },
    { id: 25, nome: "Cultura VW Goiânia", local: "Parque Flamboyant, GO", lat: -16.7110, lng: -49.2550, data: "20/07/2026" },
    { id: 26, nome: "Track Day Goiânia", local: "Autódromo de Goiânia, GO", lat: -16.7300, lng: -49.2400, data: "22/07/2026" },
    { id: 27, nome: "Clube do Fusca Cuiabá", local: "Parque das Águas, MT", lat: -15.5800, lng: -56.0900, data: "25/07/2026" },
    { id: 28, nome: "Encontro de Pickups Campo Grande", local: "Parque das Nações, MS", lat: -20.4500, lng: -54.5800, data: "28/07/2026" },
    { id: 29, nome: "Floripa Tuning Day", local: "Beira Mar Norte, SC", lat: -27.5900, lng: -48.5400, data: "01/08/2026" },
    { id: 30, nome: "Encontro de Porsches SC", local: "Balneário Camboriú, SC", lat: -26.9900, lng: -48.6300, data: "03/08/2026" },
    { id: 31, nome: "Vitória Car Meet", local: "Praia de Camburi, ES", lat: -20.2600, lng: -40.2700, data: "05/08/2026" },
    { id: 32, nome: "Encontro Classics Vitória", local: "Shopping Vitória, ES", lat: -20.2900, lng: -40.2900, data: "07/08/2026" },
    { id: 33, nome: "Natal Car Show", local: "Via Costeira, RN", lat: -5.8300, lng: -35.1800, data: "10/08/2026" },
    { id: 34, nome: "Clube do Fusca João Pessoa", local: "Busto de Tamandaré, PB", lat: -7.1300, lng: -34.8200, data: "12/08/2026" },
    { id: 35, nome: "Encontro Maceió Customs", local: "Ponta Verde, AL", lat: -9.6600, lng: -35.7000, data: "15/08/2026" },
    { id: 36, nome: "Aracaju Racing Day", local: "Orla de Atalaia, SE", lat: -10.9700, lng: -37.0500, data: "18/08/2026" },
    { id: 37, nome: "São Luís Car Meet", local: "Avenida Litorânea, MA", lat: -2.4800, lng: -44.2500, data: "20/08/2026" },
    { id: 38, nome: "Teresina Motors", local: "Ponte Estaiada, PI", lat: -5.0700, lng: -42.7900, data: "22/08/2026" },
    { id: 39, nome: "Palmas Car Culture", local: "Praça dos Girassóis, TO", lat: -10.1800, lng: -48.3300, data: "25/08/2026" },
    { id: 40, nome: "Porto Velho Classics", local: "Espaço Alternativo, RO", lat: -8.7600, lng: -63.8500, data: "28/08/2026" },
    { id: 41, nome: "Rio Branco Tuning", local: "Parque da Maternidade, AC", lat: -9.9700, lng: -67.8100, data: "01/09/2026" },
    { id: 42, nome: "Boa Vista Car Meet", local: "Parque Anauá, RR", lat: 2.8200, lng: -60.6700, data: "03/09/2026" },
    { id: 43, nome: "Macapá Car Club", local: "Fortaleza de São José, AP", lat: 0.0300, lng: -51.0600, data: "05/09/2026" },
    { id: 44, nome: "Campinas Tuning Day", local: "Parque Taquaral, SP", lat: -22.8800, lng: -47.0500, data: "07/09/2026" },
    { id: 45, nome: "Encontro Ribeirão Preto", local: "Parque Luís Carlos Raya, SP", lat: -21.2200, lng: -47.8000, data: "10/09/2026" },
    { id: 46, nome: "Santos Car Show", local: "Orla da Praia, SP", lat: -23.9700, lng: -46.3300, data: "12/09/2026" },
    { id: 47, nome: "São José dos Campos Meet", local: "Parque Vicentina Aranha, SP", lat: -23.2100, lng: -45.8900, data: "15/09/2026" },
    { id: 48, nome: "Sorocaba Classics", local: "Parque das Águas, SP", lat: -23.4900, lng: -47.4500, data: "18/09/2026" },
    { id: 49, nome: "Uberlândia Motors", local: "Parque do Sabiá, MG", lat: -18.9100, lng: -48.2700, data: "20/09/2026" },
    { id: 50, nome: "Juiz de Fora Auto Club", local: "Parque Halfeld, MG", lat: -21.7600, lng: -43.3400, data: "22/09/2026" },
    
];



eventos.forEach(evento => {
    
    const marker = L.marker([evento.lat, evento.lng], { icon: iconeVerde }).addTo(map);

    L
    const conteudoPopup = `
        <div style="text-align: center; color: #00020b;">
            <h3 style="margin: 5px 0;">${evento.nome}</h3>
            <p style="margin: 2px 0; font-size: 0.9em;">📅 ${evento.data}</p>
            <p style="margin: 2px 0; font-weight: bold;">📍 ${evento.local}</p>
        </div>
    `;

    marker.bindPopup(conteudoPopup, {
        closeButton: true,
        className: 'custom-popup' 
    });

   
});


let marcadores = [];


function filtrarEventos(categoria) {
    
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Filtra e adiciona apenas os necessários
    eventos.forEach(evento => {
        if (categoria === 'todos' || evento.nome.includes(categoria)) {
            const marker = L.marker([evento.lat, evento.lng], { icon: iconeVerde }).addTo(map);
            marker.bindPopup(`<b>${evento.nome}</b>`);
        }
    });
}
