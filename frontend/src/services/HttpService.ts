import axios, { Axios, AxiosRequestConfig } from 'axios';
import { CACHING_CONST } from '../common';

interface BaseRequestConfig extends AxiosRequestConfig {
	url: string;
}

interface GetRequestConfig extends Omit<BaseRequestConfig, "data"> {}

interface CachingArray {
	[key: string]: any;
}

export default class HttpService {
	fetchingService: Axios;
	cachedDataActualTo: Date | undefined = undefined;
	cachedData: CachingArray = [];

	constructor(baseURL: string) {
		this.fetchingService = axios.create({
			baseURL: baseURL
		});
	}

	async get<T>(config: GetRequestConfig) {
		const response = await this.fetchingService
			.get<T>(config.url, config);
		return response.data;
	}

	async getWithCaching<T>(config: GetRequestConfig): Promise<T> {
		if (this.cachedDataIsActual() == false)
			this.clearCachedData();

		if (this.cachedDataIsActual() && this.hasCachedResponse(config))
			return this.getCachedResponse(config);

		const response = await this.get<T>(config);
		this.cachingResponse(config, response);
		return response;
	}

	clearCachedData() {
        this.cachedDataActualTo = undefined;
		this.cachedData = [];
    }

    cachedDataIsActual() {
        const now = new Date();
        return this.cachedDataActualTo != null 
            && this.cachedDataActualTo > now;
    }

	cachingResponse(key: BaseRequestConfig, response: any) {
		this.cachedData[this.buildKey(key)] = response;
		const cachedDataActualTo = new Date();
		cachedDataActualTo.setSeconds(cachedDataActualTo.getSeconds() + CACHING_CONST.CACHING_PERIOD_IN_SECONDS);
		this.cachedDataActualTo = cachedDataActualTo;
	}

	getCachedResponse(key: BaseRequestConfig): any {
		return this.cachedData[this.buildKey(key)];
	}

	hasCachedResponse(key: BaseRequestConfig): any {
		return this.cachedData[this.buildKey(key)] != null;
	}

	buildKey(key: BaseRequestConfig): string {
		return key.baseURL + key.url + JSON.stringify(key.data ?? {}) + JSON.stringify(key.params ?? {});
	}
}