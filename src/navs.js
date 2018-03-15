// <!-- auto generated navs start -->
const autoGenHeaderNavs = [];

const autoGenAsideNavs = [];

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '反馈',
    to: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    text: '帮助',
    to: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const customAsideNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home',
  },
  {
    text: '数据维护',
    to: '/curd',
    icon: 'repair',
    children: [
      {
        text: '用户管理',
        to: '/curd/1',
      },
      {
        text: '工时管理',
        to: '/curd/2',
      },
    ],
  },
  {
    text: '库表配置',
    to: '/private',
    icon: 'code',
    children: [
      {
        text: '菜单配置',
        to: '/private/config/navconfig',
      },
      {
        text: '库配置',
        to: '/private/config/dbconfig',
      },
      {
        text: '表配置',
        to: '/private/config/tableconfig',
      },
      {
        text: '字段配置',
        to: '/private/config/tablefieldconfig',
      },
    ],
  },
  {
    text: '系统设置',
    to: '/setting',
    icon: 'shezhi',
    children: [
      {
        text: '基本设置',
        to: '/base',
      },
      {
        text: '评论设置',
        to: '/comment',
      },
    ],
  },
];

function transform(navs) {
  // custom logical
  return [...navs];
}

export const headerNavs = transform([
  ...autoGenHeaderNavs,
  ...customHeaderNavs,
]);

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs]);
