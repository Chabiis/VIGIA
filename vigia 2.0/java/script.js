document.addEventListener("DOMContentLoaded", function () {
    // Inicializar o mapa
    const map = L.map('map').setView([-22.2171, -49.9501], 13); // Coordenadas iniciais de Marília

    // Adicionar a skin CartoDB DarkMatter
    const CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    CartoDB_DarkMatter.addTo(map);

    // Criar uma janela usando o plugin
    const windowControl = L.control.window(map, {
        title: 'Informações Importantes', // Título da janela
        content: 'Este é um texto de exemplo para o plugin!', // Conteúdo da janela
        closeButton: true, // Exibe o botão de fechar
        modal: false // Define se a janela será modal ou não
    });

    // Mostrando a janela
    windowControl.show();

    // Camada de edição
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Configurações do Leaflet.draw
    const drawControl = new L.Control.Draw({
        position: 'topright',
        draw: {
            polygon: {
                allowIntersection: false,
                shapeOptions: {
                    color: '#bada55'
                }
            },
            polyline: {
                shapeOptions: {
                    color: '#f357a1',
                    weight: 5
                }
            },
            circle: {
                shapeOptions: {
                    color: '#bada55'
                }
            },
            rectangle: {
                shapeOptions: {
                    color: '#0066cc'
                }
            },
            marker: true
        },
        edit: {
            featureGroup: drawnItems,
            remove: true
        }
    });
    map.addControl(drawControl);

    // Evento para lidar com a criação de formas
    map.on(L.Draw.Event.CREATED, function (e) {
        const layer = e.layer;

        // Exemplo: Adicionar um popup ao criar formas
        if (e.layerType === 'marker') {
            layer.bindPopup('Marcador adicionado!');
        }

        drawnItems.addLayer(layer);
    });

    // Botão para centralizar na localização atual
    document.getElementById('locate').addEventListener('click', () => {
        map.locate({ setView: true, maxZoom: 16 });
    });

    // Adicionar funcionalidade de criar rota (ainda a ser implementada)
    document.getElementById('route').addEventListener('click', () => {
        alert('A funcionalidade de rota será implementada em breve.');
    });
});
// Inicializar a Sidebar
const sidebar = L.control.sidebar({
    autopan: true, // Move o mapa automaticamente ao abrir a barra
    container: 'sidebar', // ID do elemento HTML
}).addTo(map);

// Abrir a aba "Home" automaticamente ao carregar o mapa
sidebar.open('home');
