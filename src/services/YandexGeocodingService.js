import YandexApi from "@/services/YandexApi.js";
import ExcelService from "@/services/ExcelService.js";
import LocalStorageService from "@/services/LocalStorageService.js";

export default class YandexGeocodingService {
    _yandexApi = null;
    _results = [];
    _loading = false;
    _progress = 0;

    constructor(apiKey) {
        this._yandexApi = new YandexApi(apiKey);
    }

    get loading() {
        return this._loading;
    }

    get progress() {
        return this._progress;
    }

    async geocode(addresses) {
        this._progress = 0;
        this._loading = true;
        const parsedAddresses = this._parseAddresses(addresses);
        const processedAddressesMap = this._getResultsFromStorage();

        for (const address of parsedAddresses) {
            try {
                if (processedAddressesMap[address]) {
                    this._results.push([address, processedAddressesMap[address]]);
                    continue;
                }

                const response = await this._yandexApi.geocode(address);

                const coordinatesObject = {
                    lon: null,
                    lat: null,
                };
                const coordsFromApi = this._getCoordinatesFromApiResponse(response);
                coordinatesObject.lon = coordsFromApi[0];
                coordinatesObject.lat = coordsFromApi[1];

                this._results.push([address, coordinatesObject]);
                processedAddressesMap[address] = coordinatesObject
                this._saveResultsToStorage(processedAddressesMap);
                this._progress = Math.round((this._results.length / parsedAddresses.length) * 100);
            } catch (error) {
                if (error.response?.status === 429) {
                    alert('Yandex API rate limit exceeded');
                    this._loading = false;
                    this._progress = 0;
                    return;
                }
                if (error.response?.status === 403) {
                    alert('Yandex API key is invalid');
                    this._loading = false;
                    this._progress = 0;
                    return;
                }
                console.error(`Address processing error -> ${address}: ${error}`);
                this._loading = false;
                this._progress = 0;
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 1005));
        }
        this._loading = false;
    }
    getFileWithCoordinates() {
        if (!this._results.length) {
            alert('No results to save');
            return;
        }

        const headers = ['Адрес', 'Долгота', 'Широта'];
        const data = this._results.map(([address, coordinates]) => [address, coordinates.lon, coordinates.lat]);
        ExcelService.makeExcelFile('geocoding_results', headers, data);
    }

    _getResultsFromStorage() {
        const data = LocalStorageService.get('geocoding_results');
        if (!data) {
            return {};
        }
        return JSON.parse(data);
    }

    _saveResultsToStorage(results) {
        LocalStorageService.set('geocoding_results', JSON.stringify(results));
    }

    _parseAddresses(addresses) {
        return addresses
            .split('\n')
            .map(address => address.replace('*', ''))
            .filter(Boolean);
    }

    _getCoordinatesFromApiResponse(response) {
        return response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos?.split(' ') || ['Not found', 'Not found'];
    }

}
