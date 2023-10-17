import axios from 'axios';
import { BACKEND_KEYS , STORAGE_KEYS } from '../common/consts';

interface ConfigData {
  url: string;
  headers?: any;
}

type ConfigWithoutDataAndUrl = Omit<any, keyof ConfigData>;

class HttpService {
  baseUrl: string;

  fetchingService: any;

  constructor(
    baseUrl = BACKEND_KEYS.PRODUCTS_SERVER_URL || '',
    fetchingService = axios,
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
  }

  getFullApiUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  populateTokenToHeaderConfig() {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESSTOKEN);
    if (token) {
      return {
        Authorization: `Bearer ${token}`
      };
    }
    return {};
  }

  extractUrlAndDataFromConfig({
    data,
    url,
    ...configWithoutDataAndUrl
  }: ConfigData & ConfigWithoutDataAndUrl) {
    return configWithoutDataAndUrl;
  }

  get(config: { [x: string]: any; headers?: any; url: any; data?: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .get(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config))
      .then((res: any) => res.data);
  }

  post(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  patch(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.patch(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  delete(config: { [x: string]: any; headers?: any; url: any; data: any }, withAuth = true) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }
}

export default HttpService;