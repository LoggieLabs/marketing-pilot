/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OMNITUUM_X25519_PUB_HEX: string;
  readonly VITE_OMNITUUM_KYBER_PUB_B64: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
