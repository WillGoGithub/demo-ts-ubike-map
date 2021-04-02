import './scss/index.scss';

import Leaflet, { LayerGroup } from 'leaflet';
import mapConfig from './map.config';
import fetchData from './fetchData';
import { districtLatLngMap, districts } from './districtData';
import { District } from './data';

// 建立行政區下拉選項
const $selectDistrict = <HTMLSelectElement | null>(
  document.getElementById('select-district')
);

districts.forEach((dst) => {
  const $option = document.createElement('option');

  $option.setAttribute('value', dst);
  $option.innerText = dst;

  $selectDistrict?.appendChild($option);
});

// 產生地圖
const { latLng, zoomLevel, tileLayerURL, containerId } = mapConfig;
const map = Leaflet.map(containerId);

map.setView(latLng, zoomLevel);
Leaflet.tileLayer(tileLayerURL).addTo(map);

// 取得目前行政區
let currentDistrict = $selectDistrict?.value as District;

// 建立標示
let markerLayer: LayerGroup;

// 取得開放資料
updateUBikeMap(currentDistrict);

function updateUBikeMap(district: District) {
  fetchData().then((data) => {
    // 1. 過濾行政區
    const filteredData = data.filter((info) => info.regionName === district);

    // 2. 轉換 Leaflet Marker
    const markers = filteredData.map((info) => {
      const marker = new Leaflet.Marker(info.latLng);
      const { regionName, stopName, totalBikes, availableBikes } = info;

      marker.bindTooltip(`
      <p>${regionName} - ${stopName}</p>
      <p>總車數：${totalBikes}</p>
      <p>可用車數：${availableBikes}</p>
    `);

      marker
        .on('mouseover', () => {
          marker.openTooltip();
        })
        .on('mouseleave', () => {
          marker.closeTooltip();
        });

      return marker;
    });

    // 3. Marker 加入 LayerGroup & Map
    markerLayer = Leaflet.layerGroup(markers);
    markerLayer.addTo(map);

    // 4. Fly
    const currentDistrictCoordinate = districtLatLngMap.get(currentDistrict);

    if (currentDistrictCoordinate) {
      map.flyTo(currentDistrictCoordinate);
    }
  });
}

// 行政區下拉改變動作
$selectDistrict?.addEventListener('change', (event) => {
  const { value } = event.target as HTMLSelectElement;
  currentDistrict = value as District;

  markerLayer.remove();

  updateUBikeMap(currentDistrict);
});
