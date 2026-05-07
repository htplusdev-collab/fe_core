interface EnvConfig {
    apiBaseUrl: string;
    appName: string;
    isDevelopment: boolean;
    isProduction: boolean;
}

function getEnvConfig(): EnvConfig {
    return {
        apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '/api',
        appName: (import.meta.env.VITE_APP_NAME as string | undefined) ?? 'Enterprise App',
        isDevelopment: import.meta.env.DEV,
        isProduction: import.meta.env.PROD,
    };
}

export const env = getEnvConfig();
