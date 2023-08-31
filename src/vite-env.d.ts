declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare interface ImportMeta {
  globEager<T = any>(pattern: string): Record<string, T>;
}