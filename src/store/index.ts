import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';

const pinia = createPinia();

export function setupStore(app: App<Element>): void {
  pinia.use(piniaPersist);
  app.use(pinia);
}

export { pinia };
