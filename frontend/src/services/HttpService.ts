import axios, { Axios, AxiosRequestConfig } from 'axios';
import { CACHING_CONST } from '../common';
import { ICachedItem } from '../interfaces/Cache';

interface BaseRequestConfig extends AxiosRequestConfig {
	url: string;
}

interface GetRequestConfig extends Omit<BaseRequestConfig, "data"> {}
interface PostRequestConfig extends Omit<BaseRequestConfig, "params"> {}

export default class HttpService {
	fetchingService: Axios;
	cachedData: Record<string, ICachedItem>;
	requestsThatSending: Record<string, boolean>;
	sessionCachedDataKey: string = "CACHED_ITEMS";

	constructor(baseURL: string) {
		this.fetchingService = axios.create({
			baseURL: baseURL
		});
 
		this.cachedData = {};
		this.requestsThatSending = {};
		const sessionCachedData: Record<string, ICachedItem> = JSON.parse(sessionStorage.getItem(this.sessionCachedDataKey) ?? "{}");

		// convert date from string to Date
		Object.entries(sessionCachedData).forEach((value) => {
			const key = value[0];
			const newCachedData = {
				data: value[1].data,
				cachedDataActualTo: new Date(value[1].cachedDataActualTo)
			};
			return this.cachedData[key] = newCachedData;
		});
	}

	async get<T>(config: GetRequestConfig) {
		const response = await this.fetchingService
			.get<T>(config.url, config);
		return response.data;
	}

	async post<T>(config: PostRequestConfig) {
		const response = await this.fetchingService
			.post<T>(config.url, config.data, config);
		return response.data;
	}

	async getWithCaching<T>(config: GetRequestConfig): Promise<T> {
		while (this.identicalRequestIsSending(config)) { await delay(100) }

		if (this.hasCachedResponse(config)) {
			return this.getCachedResponse(config)?.data;
		}

		this.markThatRequestSending(config);
		const response = await this.get<T>(config);
		this.markThatRequestReturnedResponse(config);

		this.cachingResponse(config, response);
		return response;
	}

	identicalRequestIsSending(config: BaseRequestConfig): boolean {
		return this.requestsThatSending[this.buildKey(config)] ?? false;
	}

	markThatRequestSending(config: BaseRequestConfig) {
		// so that other don't send identical request during current request that not end
		this.requestsThatSending[this.buildKey(config)] = true;
	}
	
	markThatRequestReturnedResponse(config: BaseRequestConfig) {
		this.requestsThatSending[this.buildKey(config)] = false;
	}

	cachingResponse(config: BaseRequestConfig, response: any) {
		const cachedDataActualTo = new Date();
		cachedDataActualTo.setSeconds(cachedDataActualTo.getSeconds() + CACHING_CONST.CACHING_PERIOD_IN_SECONDS);

		const cachingItem: ICachedItem = {
			data: response,
			cachedDataActualTo: cachedDataActualTo
		};

		this.cachedData[this.buildKey(config)] = cachingItem;
		sessionStorage.setItem(this.sessionCachedDataKey, JSON.stringify(this.cachedData));
	}

	getCachedResponse(config: BaseRequestConfig): ICachedItem | undefined {
		return this.cachedData[this.buildKey(config)];
	}

	hasCachedResponse(key: BaseRequestConfig): any {
		const item = this.getCachedResponse(key);
		const now = new Date();
		return item != null && item.cachedDataActualTo > now;
	}

	removeCachedResponse(config: BaseRequestConfig) {
		delete this.cachedData[this.buildKey(config)];
		sessionStorage.setItem(this.sessionCachedDataKey, JSON.stringify(this.cachedData));
	}

	buildKey(key: BaseRequestConfig): string {
		return key.url + JSON.stringify(key.params ?? {});
	}
}


// utils

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}