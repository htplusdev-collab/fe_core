import { HttpClient } from '@infrastructure/http';
import { env } from './env';

export const httpClient = new HttpClient({
    baseURL: env.apiBaseUrl,
    timeout: 30_000,
});
