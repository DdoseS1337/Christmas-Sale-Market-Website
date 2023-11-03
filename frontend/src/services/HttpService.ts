import axios, { Axios, AxiosRequestConfig } from 'axios';

interface BaseRequestConfig extends AxiosRequestConfig {
	url: string;
}

interface GetRequestConfig extends Omit<BaseRequestConfig, "data"> {}

export default class HttpService {
	fetchingService: Axios;

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
}