import type { RouteMeta } from 'vue-router'
// 分页相关类型
export const PAGE_SIZE_OPTIONS = ['10', '20', '50', '100'];

export const PAGE_NUMBER_SIZE_OPTIONS = [10, 20, 50, 100];

export const DEFAULT_PAGE_SIZE = +PAGE_SIZE_OPTIONS[3];

export const PAGINATION_CONFIG = {
  size: 'small',
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: PAGE_SIZE_OPTIONS,
  showTotal: (total: number): string => `共 ${total} 条`
};

export interface UserSimpleInfoType {

}

export interface MenuType {
  name: string;
  icon?: string;
  path: string;
  paramPath?: string;
  disabled?: boolean;
  children?: MenuType[];
  orderNo?: number;
  meta?: Partial<RouteMeta>;
  hideMenu?: boolean;
  key: string
}
