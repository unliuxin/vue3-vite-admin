import type { PropType as VuePropType } from 'vue';

declare global {
  declare type Recordable<T = unknown> = Record<string, T>;

  // vue
  type PropType<T> = VuePropType<T>;

  type Nullable<T> = T | null;
  // type NonNullable<T> = T extends null | undefined ? never : T;
  type TimeoutHandle = ReturnType<typeof setTimeout>;

  interface ViteEnv {
    VITE_ENV_CONFIG_KEY: string;
    VITE_PUBLIC_PATH: string;
    VITE_DROP_CONSOLE: boolean;
    VITE_BASE_API: string;
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_WEBSOCKET_URL: string;
  }

  interface Window {
    ENV_CONFIG: {
      VITE_BASE_API: string;
      VITE_GLOB_APP_TITLE: string;
      VITE_GLOB_CLIENT_ID: string;
      VITE_GLOB_CLIENT_SECRET: string;
      VITE_GLOB_WEBSOCKET_URL: string;
      VITE_GLOB_FILE_URL: string;
      VITE_GLOB_SYSTEM_URL: string;
      VITE_GLOB_PLANTFORM_URL: string;
      VITE_GLOB_WEBSITE_URL: string;
    };
    qiankunStarted?: boolean;
  }
}
