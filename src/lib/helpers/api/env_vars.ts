const api_auth = btoa(
  `${import.meta.env.VITE_API_LOGIN}:${import.meta.env.VITE_API_PASSWORD}`
);
const api_url = import.meta.env.VITE_API_URL;

export { api_auth, api_url };
