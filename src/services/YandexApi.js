import axios from 'axios';

const BASE_URL = 'https://geocode-maps.yandex.ru/1.x/';
export default class YandexApi {
    apiKey = null;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async geocode(address) {
        const {data} = await axios.get(this._getUrl(address));
        return data.response;
    }

    _getUrl(address) {
        const url = new URL(BASE_URL);
        const params = new URLSearchParams();
        params.append('apikey', this.apiKey);
        params.append('geocode', address);
        params.append('format', 'json');
        params.append('results', '1');
        url.search = params.toString();
        return url.toString();
    }
}
