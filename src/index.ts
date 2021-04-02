import Leaflet from 'leaflet';
import mapConfig from './map.config';
import fetchData from './fetchData';

fetchData().then((data) => {
  console.log(data);
});

const { latLng, zoomLevel, tileLayerURL, containerId } = mapConfig;
const map = Leaflet.map(containerId);

map.setView(latLng, zoomLevel);
Leaflet.tileLayer(tileLayerURL).addTo(map);
