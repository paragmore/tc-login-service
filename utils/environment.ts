export const isProd = true
export const environment = {
  apiUrl: isProd
    ? "https://login-api.taxpayercorner.com"
    : "http://localhost:8000",
    dbName: 'tpc-stg',
    version: '0.0.1',
};
