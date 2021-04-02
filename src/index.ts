import Leaflet from 'leaflet';
import mapConfig from './map.config';

const { latLng, zoomLevel, tileLayerURL, containerId } = mapConfig;
const map = Leaflet.map(containerId);

map.setView(latLng, zoomLevel);
Leaflet.tileLayer(tileLayerURL).addTo(map);
