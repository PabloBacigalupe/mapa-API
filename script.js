
console.log('Hola mapa');



var map = L.map('map').setView([40.423012949461395, -3.6926326802928138], 3);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([40.423012949461395, -3.6926326802928138]).addTo(map);


// if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(position => {
//          console.log(`Latitud: ${position.coords.latitude}\nLongitud: ${position.coords.longitude}`);
//         let datos = `<h1>Aquí estás!</h1>
//         <p>Lat: ${position.coords.latitude.toFixed(4)}</p>
//         <p>Long: ${position.coords.longitude.toFixed(4)}</p>`
//         document.body.innerHTML = datos;
//     });
// } else {
//   console.warn("Tu navegador no soporta Geolocalización!! ");
// }

//Conseguir el seguimiento de tu ubi
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
  
      console.log(`Latitud: ${lat} - Longitud: ${lon}`);

    })
};

async function datosTerremotos() {
    try {
      const respuesta = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
      const datos = await respuesta.json();
      console.log(datos); // uso de datos datos

      // let coords = datos.features[0].geometry.coordinates;
      // let latlng = [coords[1], coords[0]];
      // let firstPoint = L.marker(latlng).addTo(map);

      datos.features.forEach((feature) => {
        let coords = feature.geometry.coordinates; 
        let latlng = [coords[1], coords[0]];       // lat, long cambiado
      
        let properties = feature.properties;
        let titulo = properties.title;
        let fecha = Date(properties.time);
        let ubicacion = properties.place;
        let codigo = properties.code;
        let magnitud = `${properties.mag} ${properties.magType}`;

        let contenidoPopup = `
            <strong>${titulo}</strong><br>
            <b>Fecha:</b> ${fecha}<br>
            <b>Ubicación:</b> ${ubicacion}<br>
            <b>Código:</b> ${codigo}<br>
            <b>Magnitud:</b> ${magnitud}
        `;

        L.marker(latlng)
            .addTo(map)
            .bindPopup(contenidoPopup);

      
      });



    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
    
  }
  
  datosTerremotos();

  





  //POLIGONO 
  var polygon = L.polygon([
    [34.853813, -4.767064],
    [9.728105, 60.551868],
    [-36.146432, 82.688923]
],
    {
      color: 'blue',        // color del borde
      weight: 0.5,            // grosor del borde 
      opacity: 0.8,         // opacidad del borde
      fillColor: 'red', // color del relleno
      fillOpacity: 0.1      // opacidad del relleno
    }
).addTo(map);

polygon.bindPopup("Zona crítica");

//POP-UPS Info
// contenido del popup
  const popupContent = `
    <strong>${lugar}</strong><br>
    Magnitud: ${magnitud}<br>
    Fecha y hora: ${fecha}
  `;
  
marker.bindPopup("<b>Hello world!</b><br>I am a popup.")





