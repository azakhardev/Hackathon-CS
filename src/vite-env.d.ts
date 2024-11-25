/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_LOGIN: string;
  readonly VITE_API_PASSWORD: string;
  readonly VITE_API_URL: string;  
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
