/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SDK_MODE: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
