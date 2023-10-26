import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { message as Message, Modal } from 'ant-design-vue';

let instance: AxiosInstance;
let responseErrorToggle = false;

enum CodeMessage {
  '服务器成功返回请求的数据' = 200,
  '新增和修改数据成功' = 201,
  '一个请求已经进入后台排队' = 202,
  '删除数据成功' = 204,
  '发出的请求有错误，服务器没有进行新增和修改数据的操作' = 400,
  '用户没有权限（令牌，用户名，密码错误）' = 401,
  '用户得到授权，但是访问是禁止的' = 403,
  '发出的请求针对的是不存在的记录，服务器没有进行操作' = 404,
  '请求的格式不可得' = 406,
  '请求的资源被永久删除，且不会再得到' = 410,
  '当创建一个对象时，发生一个验证错误' = 422,
  '服务器发生错误，请检查服务器' = 500,
  '服务不可用，服务器暂时过载或维护' = 503,
  '网关超时' = 504
}

const onError = (error: AxiosError) => {
  const { response, message } = error;

  if (message.indexOf('canceled') > -1 || message === 'Request aborted') {
    console.log('Canceled or Request aborted');
    return;
  }

  if (response && (response.status === 401 || response.status === 403)) {
    Modal.warning({
      title: '提示',
      content: '当前用户登录凭证已失效，请重新登录',
      okText: '确定',
      centered: true,
      onOk() {
        setTimeout(() => {
          window.location.href = '/login';
          window.localStorage.clear();
        }, 1000);
      }
    });
  } else {
    Message.error((response && CodeMessage[response.status]) || '网络波动，请稍后再试');
  }
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 1000 * 30, //30s
  headers: { 'Cache-Control': 'no-cache' }
};

export interface IRequestConfig extends AxiosRequestConfig {
  withToken?: boolean;
}

export interface IFetchConfig extends AxiosRequestConfig {
  onError?: (error: AxiosError, redirect?: string) => void;
  onGetTokens?: () => [string, string?];
}

export interface Response {
  code: number;
  message: string;
}

export interface ResponseData<T> extends Response {
  data: T;
}

export interface Page<T> {
  total: number;
  records: T[];
}

export interface ResponsePageData<T> extends Response {
  data: Page<T>;
}

const onHandleRequest = (conf: IRequestConfig, cusConf: IFetchConfig) => {
  const { withToken = true } = conf;
  const { onGetTokens} = cusConf;

  if (onGetTokens && withToken) {
    conf.headers!.Authorization = `Bearer ${onGetTokens()[0]}`;
  }

  return conf;
};

export const fetch = (customConfig: IFetchConfig): AxiosInstance => {
  const options = Object.assign({}, defaultConfig, customConfig);
  instance = axios.create(options);

  instance.interceptors.request.use(
    //@ts-ignore
    (config) => {
      return onHandleRequest(config, customConfig);
    },
    (error) => {
      customConfig.onError && customConfig.onError(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    (error) => {
      if (responseErrorToggle) {
        return;
      }

      if (customConfig.onError) {
        customConfig.onError(error);
      } else {
        onError(error);
      }

      responseErrorToggle = true;
      return Promise.reject(error);
    }
  );

  return instance;
};

/**
 * 封装get请求
 * @param url 请求地址
 * @param config 请求配置
 */
export const get = <T>(url: string, config: IRequestConfig = {}): Promise<T> => {
  return instance.get(url, config);
};

/**
 * 封装post请求
 * @param url 请求地址
 * @param data 请求参数
 * @param config 请求配置
 */
export const post = <T>(url: string, data?: unknown, config: IRequestConfig = {}): Promise<T> => {
  return instance.post(url, data, config);
};

/**
 * 封装put请求
 * @param url 请求地址
 * @param data 请求参数
 * @param config 请求配置
 */
export const put = <T>(url: string, data?: unknown, config: IRequestConfig = {}): Promise<T> => {
  return instance.put(url, data, config);
};

/**
 * 封装delete请求
 * @param url 请求地址
 * @param config 请求配置
 */
export const del = <T>(url: string, config: IRequestConfig = {}): Promise<T> => {
  return instance.delete(url, config);
};
