import type { UserConfig, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'path';
import { loadEnv } from "vite";
const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 环境变量
  return {
    base: '/',
    resolve: {
      alias: {
        '@': pathResolve('./src')
      },
      extensions: ['.ts', '.js', '.tsx'],
    },
    plugins: [
      vue(),
      vueJsx()
    ],
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
  };
};
