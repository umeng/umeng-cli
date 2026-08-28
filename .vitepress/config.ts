import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Umeng CLI',
  description: '友盟命令行工具 - 让人类和 AI Agent 都能在终端中操作友盟平台',
  lang: 'zh-CN',

  base: '/umeng-cli/',

  head: [
    ['meta', { name: 'theme-color', content: '#5c73e7' }],
    ['link', { rel: 'icon', href: '/umeng-cli/logo.svg', type: 'image/svg+xml' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Umeng CLI',

    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: 'API 参考', link: '/reference/openapi/uapp' },
      { text: 'GitHub', link: 'https://github.com/umeng/umeng-cli' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
            { text: '登录认证', link: '/guide/login' },
          ],
        },
        {
          text: '核心功能',
          items: [
            { text: 'API 调用', link: '/guide/api-call' },
            { text: '账号管理', link: '/guide/account' },
            { text: 'Skills 管理', link: '/guide/skills' },
            { text: 'OpenAPI 开通', link: '/guide/openapi' },
            { text: '自身管理', link: '/guide/self-management' },
            { text: '调用统计', link: '/guide/trace' },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'OpenAPI 接口',
          items: [
            { text: 'U-App 移动统计', link: '/reference/openapi/uapp' },
            { text: 'U-APM 性能监控', link: '/reference/openapi/uapm' },
            { text: 'U-Push 消息推送', link: '/reference/openapi/upush' },
            { text: 'U-DOP 数据返还', link: '/reference/openapi/udop' },
            { text: 'AppTrack 广告监测', link: '/reference/openapi/apptrack' },
            { text: 'U-Mini 小程序', link: '/reference/openapi/umini' },
            { text: '反作弊 SDK', link: '/reference/openapi/antirisk' },
          ],
        },
        {
          text: '官网接口',
          items: [
            { text: 'AppWin 投放管理', link: '/reference/website/appwin' },
            { text: 'U-Push 推送助手', link: '/reference/website/upush' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/umeng/umeng-cli' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2011-present Umeng.com',
    },

    search: {
      provider: 'local',
    },
  },
})
