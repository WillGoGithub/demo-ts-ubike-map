import './scss/index.scss';

import mapConfig from './map.config';
import fetchData from './data/fetchData';
import { districtLatLngMap, districts } from './data/districtData';
import { District, UBikeInfo } from './data/data';
import UBikeMapFacade from './MapFacade';

// 建立行政區下拉選項
const $selectDistrict = <HTMLSelectElement | null>(
  document.getElementById('select-district')
);

if ($selectDistrict === null) {
  throw new Error(`No select-district field provided.`);
}

districts.forEach((dst) => {
  const $option = document.createElement('option');

  $option.setAttribute('value', dst);
  $option.innerText = dst;

  $selectDistrict?.appendChild($option);
});

// 產生地圖
const mapFacade = new UBikeMapFacade(
  mapConfig,
  function ({ regionName, stopName, totalBikes, availableBikes }: UBikeInfo) {
    return `
      <p>${regionName} - ${stopName}</p>
      <p>總車數：${totalBikes}</p>
      <p>可用車數：${availableBikes}</p>
    `;
  }
);

// 取得目前行政區
let currentDistrict = $selectDistrict?.value as District;

function updateUBikeMap(district: District) {
  fetchData().then((data) => {
    // 1. 過濾行政區
    const filteredData = data.filter((info) => info.regionName === district);

    // 2. 產生站點
    mapFacade.pinStops(filteredData);

    // 3. Fly
    const currentDistrictCoordinate = districtLatLngMap.get(currentDistrict);
    mapFacade.flyTo(currentDistrictCoordinate);
  });
}

updateUBikeMap(currentDistrict);

// 行政區下拉改變動作
$selectDistrict?.addEventListener('change', (event) => {
  const { value } = event.target as HTMLSelectElement;
  currentDistrict = value as District;

  mapFacade.clearStop();

  updateUBikeMap(currentDistrict);
});
