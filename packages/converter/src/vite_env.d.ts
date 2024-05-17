/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_CONVERTER_API_KEY: string;
	readonly VITE_CONVERTER_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
