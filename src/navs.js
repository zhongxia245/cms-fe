// <!-- auto generated navs start -->
const autoGenHeaderNavs = []
const autoGenAsideNavs = []

// <!-- auto generated navs end -->

const customHeaderNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home'
  },
  {
    text: '帮助',
    to: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu'
  }
]

const customAsideNavs = [
  {
    text: '首页',
    to: '/',
    icon: 'home'
  },
  {
    text: '库表配置',
    to: '/private',
    icon: 'code',
    children: [
      {
        text: '菜单配置',
        to: '/private/config/navconfig'
      },
      {
        text: '库配置',
        to: '/private/config/dbconfig'
      },
      {
        text: '表配置',
        to: '/private/config/tableconfig'
      },
      {
        text: '字段配置',
        to: '/private/config/tablefieldconfig'
      }
    ]
  }
]

function transform(navs) {
  // custom logical
  return [...navs]
}

export const headerNavs = transform([...autoGenHeaderNavs, ...customHeaderNavs])

export const asideNavs = transform([...autoGenAsideNavs, ...customAsideNavs])
