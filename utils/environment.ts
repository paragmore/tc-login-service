export const isProd = true
console.log(process.env.IS_PROD,isProd)
export const environment = {
  apiUrl: isProd
    ? "https://login-api.taxpayercorner.com"
    : "http://localhost:8000",
};
