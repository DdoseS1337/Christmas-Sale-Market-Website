import axios, { Axios, AxiosRequestConfig } from 'axios';
import { CACHING_CONST } from '../common';
import { ICachedItem } from '../interfaces/Cache';

interface BaseRequestConfig extends AxiosRequestConfig {
	url: string;
}

interface GetRequestConfig extends Omit<BaseRequestConfig, "data"> {}
interface PostRequestConfig extends Omit<BaseRequestConfig, "params"> {}

interface ICachingArray {
	[key: string]: ICachedItem;
}

export default class HttpService {
	fetchingService: Axios;
	cachedData: ICachingArray = {};

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

	async post<T>(config: PostRequestConfig) {
		const response = await this.fetchingService
			.post<T>(config.url, config);
		return response.data;
	}

	async getWithCaching<T>(config: GetRequestConfig): Promise<T> {
		if (this.hasCachedResponse(config))
			return this.getCachedResponse(config).data;

		const response = await this.get<T>(config);
		this.cachingResponse(config, response);
		return response;
	}

	cachingResponse(key: BaseRequestConfig, response: any) {
		const cachedDataActualTo = new Date();
		cachedDataActualTo.setSeconds(cachedDataActualTo.getSeconds() + CACHING_CONST.CACHING_PERIOD_IN_SECONDS);

		const cachingItem: ICachedItem = {
			data: response,
			cachedDataActualTo: cachedDataActualTo
		};

		this.cachedData[this.buildKey(key)] = cachingItem;
	}

	getCachedResponse(key: BaseRequestConfig): ICachedItem {
		return this.cachedData[this.buildKey(key)];
	}

	hasCachedResponse(key: BaseRequestConfig): any {
		const item = this.getCachedResponse(key);
		const now = new Date();
		return item != null && item.cachedDataActualTo > now;
	}

	removeCachedResponse(key: BaseRequestConfig) {
		delete this.cachedData[this.buildKey(key)];
	}

	buildKey(key: BaseRequestConfig): string {
		return key.baseURL + key.url + JSON.stringify(key.data ?? {}) + JSON.stringify(key.params ?? {});
	}
}